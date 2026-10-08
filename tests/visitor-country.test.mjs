import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

// Use the project's compiler so these tests also run on Node without native TS support.
const source = await readFile(new URL("../app/api/visitor-country/route.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { GET, dynamic } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("only a Vercel US country code enables the pump offer", async () => {
  for (const [country, expected] of [
    ["US", true],
    ["CA", false],
    ["TR", false],
    ["GB", false],
    ["ZZ", false],
    ["us", false],
    [null, false],
  ]) {
    const headers = country === null ? {} : { "x-vercel-ip-country": country };
    const response = GET(new Request("https://bestpregnancy.app/api/visitor-country", { headers }));
    assert.deepEqual(await response.json(), { showPumpOffer: expected }, `country: ${country}`);
  }
});

test("country decisions remain per request and cannot be publicly cached", async () => {
  assert.equal(dynamic, "force-dynamic");
  for (const country of ["US", "TR", "US"]) {
    const response = GET(new Request("https://bestpregnancy.app/api/visitor-country", {
      headers: { "x-vercel-ip-country": country },
    }));
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.deepEqual(await response.json(), { showPumpOffer: country === "US" });
  }
});

test("browser locale and user supplied country parameters do not enable the offer", async () => {
  const response = GET(new Request("https://bestpregnancy.app/api/visitor-country?country=US", {
    headers: { "accept-language": "en-US", cookie: "country=US" },
  }));
  assert.deepEqual(await response.json(), { showPumpOffer: false });
});
