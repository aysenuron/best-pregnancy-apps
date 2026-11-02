import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";
import { NextRequest } from "next/server.js";

const require = createRequire(import.meta.url);
const moduleUrl = (source) => {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
};
const helperUrl = moduleUrl(await readFile(new URL("../app/lib/landing-experiment.ts", import.meta.url), "utf8"));
const helpers = await import(helperUrl);
const proxySource = (await readFile(new URL("../proxy.ts", import.meta.url), "utf8"))
  .replace('"next/server"', JSON.stringify(pathToFileURL(require.resolve("next/server.js")).href))
  .replace('"./app/lib/landing-experiment"', JSON.stringify(helperUrl));
const { proxy, config } = await import(moduleUrl(proxySource));
const request = (path = "/", cookie, extra = {}) => new NextRequest(`https://bestpregnancy.app${path}`, {
  ...extra,
  headers: { ...(cookie ? { cookie: `pregnancy_landing_v1=${cookie}` } : {}), ...extra.headers },
});

function withEnvironment(enabled, percentage, run) {
  const previousEnabled = process.env.LANDING_AB_TEST_ENABLED;
  const previousPercentage = process.env.LANDING_AB_TEST_REDESIGN_PERCENTAGE;
  if (enabled === undefined) delete process.env.LANDING_AB_TEST_ENABLED;
  else process.env.LANDING_AB_TEST_ENABLED = enabled;
  if (percentage === undefined) delete process.env.LANDING_AB_TEST_REDESIGN_PERCENTAGE;
  else process.env.LANDING_AB_TEST_REDESIGN_PERCENTAGE = percentage;
  try { run(); }
  finally {
    if (previousEnabled === undefined) delete process.env.LANDING_AB_TEST_ENABLED;
    else process.env.LANDING_AB_TEST_ENABLED = previousEnabled;
    if (previousPercentage === undefined) delete process.env.LANDING_AB_TEST_REDESIGN_PERCENTAGE;
    else process.env.LANDING_AB_TEST_REDESIGN_PERCENTAGE = previousPercentage;
  }
}

test("experiment is opt-in and disabling it ignores previous redesign assignment", () => {
  for (const enabled of [undefined, "false", "TRUE", "1"]) {
    withEnvironment(enabled, "100", () => {
      const response = proxy(request("/", "redesign"));
      assert.equal(response.headers.get("x-middleware-rewrite"), null);
      assert.equal(response.headers.get("x-landing-variant"), null);
      assert.equal(response.headers.get("set-cookie"), null);
    });
  }
});

test("sticky redesign assignment rewrites before rendering and preserves attribution parameters", () => {
  withEnvironment("true", "0", () => {
    const response = proxy(request("/?utm_source=qa&lang=es&gclid=123", "redesign"));
    assert.equal(response.headers.get("x-middleware-rewrite"), "https://bestpregnancy.app/homepage?utm_source=qa&lang=es&gclid=123");
    assert.equal(response.headers.get("x-landing-variant"), "redesign");
    assert.equal(response.headers.get("x-landing-experiment"), "landing-design-v1");
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(response.headers.get("cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("vercel-cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("set-cookie"), null);
  });
});

test("original assignment remains original even when all new traffic gets redesign", () => {
  withEnvironment("true", "100", () => {
    const response = proxy(request("/", "original"));
    assert.equal(response.headers.get("x-middleware-rewrite"), null);
    assert.equal(response.headers.get("x-landing-variant"), "original");
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(response.headers.get("cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("vercel-cdn-cache-control"), "no-store");
  });
});

test("new allocations and invalid cookies receive a bounded persistent assignment", () => {
  for (const [percentage, expected] of [["0", "original"], ["100", "redesign"], ["invalid", "original"]]) {
    withEnvironment("true", percentage, () => {
      const response = proxy(request("/", "invalid"));
      assert.equal(response.headers.get("x-landing-variant"), expected);
      const cookie = response.cookies.get("pregnancy_landing_v1");
      assert.equal(cookie.value, expected);
      assert.equal(cookie.maxAge, 60 * 60 * 24 * 30);
      assert.equal(cookie.path, "/");
      assert.equal(cookie.sameSite, "lax");
      assert.equal(cookie.secure, true);
      assert.equal(cookie.httpOnly, false);
    });
  }
});

test("direct variant previews, bots, prefetches and non-GETs do not allocate", () => {
  assert.deepEqual(config.matcher, ["/"]);
  withEnvironment("true", "100", () => {
    for (const req of [
      request("/homepage"),
      request("/api/visitor-country"),
      request("/", undefined, { headers: { "user-agent": "Googlebot" } }),
      request("/", undefined, { headers: { "next-router-prefetch": "1" } }),
      request("/", undefined, { headers: { purpose: "prefetch" } }),
      request("/", undefined, { method: "POST" }),
    ]) {
      const response = proxy(req);
      assert.equal(response.headers.get("x-middleware-rewrite"), null);
      assert.equal(response.headers.get("x-landing-variant"), null);
      assert.equal(response.headers.get("set-cookie"), null);
    }
  });
});

test("allocation respects the 50/50 boundary and invalid percentages fail closed", () => {
  assert.equal(helpers.chooseLandingVariant(undefined, 50, 0.4999), "redesign");
  assert.equal(helpers.chooseLandingVariant(undefined, 50, 0.5), "original");
  assert.equal(helpers.getRedesignPercentage(undefined), 50);
  for (const value of ["-1", "101", "NaN", "Infinity", "invalid"]) {
    assert.equal(helpers.getRedesignPercentage(value), 0);
  }
});
