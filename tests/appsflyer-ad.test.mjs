import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../app/lib/appsflyer-ad.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { getAppsFlyerAdParameters, getAppsFlyerDeepLinkGroupParameter } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

// Exercise the real parameter resolution function in the repository's Smart Script.
// Parse the vendored script without executing its browser/storage/network setup.
const sdkSource = await readFile(new URL("../public/af_script.js", import.meta.url), "utf8");
const sdk = ts.createSourceFile("af_script.js", sdkSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const sdkDeclarations = {};
function findResolver(node) {
  if (ts.isVariableDeclaration(node) && ["getParameterValue", "extractCustomParams", "AF_CUSTOM_EXCLUDE_PARAMS_KEYS"].includes(node.name.getText(sdk))) {
    sdkDeclarations[node.name.getText(sdk)] = node.initializer.getText(sdk);
  }
  ts.forEachChild(node, findResolver);
}
findResolver(sdk);
assert.ok(sdkDeclarations.getParameterValue, "Smart Script must expose its parameter resolver");
assert.ok(sdkDeclarations.extractCustomParams, "Smart Script must expose its custom parameter mapper");
const sdkContext = vm.createContext({});
vm.runInContext(Object.entries(sdkDeclarations).map(([name, initializer]) => `var ${name} = ${initializer};`).join("\n"), sdkContext);
const resolveAd = sdkContext.getParameterValue;
const resolveCustomParams = sdkContext.extractCustomParams;

function withRenderedVariant(marker, run) {
  const previous = globalThis.document;
  globalThis.document = {
    // A stale B cookie must not override the actual rendered design.
    cookie: "pregnancy_landing_v1=redesign",
    querySelector: () => marker === null ? null : { getAttribute: () => marker },
  };
  try { run(); }
  finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
}

test("AppsFlyer defaults match the rendered A/B design independently of URL or stale cookie", () => {
  for (const [marker, suffix] of [["original", "a"], ["redesign", "b"], [null, "a"]]) {
    withRenderedVariant(marker, () => {
      assert.equal(resolveAd({}, getAppsFlyerAdParameters()), `bestpregnancyapp_web_ad_${suffix}`);
    });
  }
});

test("Smart Script keeps explicit utm_ad and cub_ad attribution ahead of the group default", () => {
  for (const marker of ["original", "redesign"]) {
    withRenderedVariant(marker, () => {
      const ad = getAppsFlyerAdParameters();
      assert.equal(resolveAd({ utm_ad: "campaign-ad", cub_ad: "cub-ad" }, ad), "campaign-ad");
      assert.equal(resolveAd({ cub_ad: "cub-ad" }, ad), "cub-ad");
      assert.equal(resolveAd({ utm_ad: "", cub_ad: "cub-ad" }, ad), "cub-ad");
    });
  }
});

test("AppsFlyer ad configuration can be imported and resolved without browser globals", () => {
  assert.equal(typeof document, "undefined");
  assert.equal(resolveAd({}, getAppsFlyerAdParameters()), "bestpregnancyapp_web_ad_a");
});

test("Smart Script generates deep_link_sub1 from the rendered group even with incoming overrides", () => {
  for (const [marker, group] of [["original", "a"], ["redesign", "b"], [null, "a"]]) {
    withRenderedVariant(marker, () => {
      const custom = resolveCustomParams({
        afCustom: [getAppsFlyerDeepLinkGroupParameter(), { paramKey: "af_ss_ui", defaultValue: "true" }],
        currentURLParams: { deep_link_sub1: "unrelated", utm_ad: "paid-ad", cub_ad: "other-ad" },
      });
      assert.equal(custom.deep_link_sub1, group);
      assert.equal(custom.af_ss_ui, "true");
      assert.equal(resolveAd({}, getAppsFlyerAdParameters()), `bestpregnancyapp_web_ad_${group}`);
    });
  }
});
