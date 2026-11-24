import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const moduleUrl = (source) => {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
};
const helpersUrl = moduleUrl(await readFile(new URL("../app/lib/landing-experiment.ts", import.meta.url), "utf8"));
const reactUrl = moduleUrl("export function useEffect(effect) { globalThis.__analyticsEffect = effect; }");
const source = (await readFile(new URL("../app/components/LandingExperimentAnalytics.tsx", import.meta.url), "utf8"))
  .replace('"react"', JSON.stringify(reactUrl))
  .replace('"@/app/lib/landing-experiment"', JSON.stringify(helpersUrl));
const { LandingExperimentAnalytics } = await import(moduleUrl(source));

function browser({ path = "/", cookie = "original", marker = "original", gtag = true } = {}, run) {
  const previous = { window: globalThis.window, document: globalThis.document, Element: globalThis.Element, IntersectionObserver: globalThis.IntersectionObserver, MutationObserver: globalThis.MutationObserver };
  const events = [];
  const listeners = new Set();
  const links = [];
  const visibilityObservers = [];
  const mutationObservers = [];
  globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); visibilityObservers.push(this); }
    observe(link) { this.targets.add(link); }
    unobserve(link) { this.targets.delete(link); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
  };
  globalThis.MutationObserver = class {
    constructor(callback) { this.callback = callback; mutationObservers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  class FakeElement {
    constructor(link) { this.link = link; }
    closest() { return this.link; }
  }
  globalThis.Element = FakeElement;
  globalThis.window = {
    location: { pathname: path, origin: "https://bestpregnancy.app" },
    ...(gtag ? { gtag: (...args) => events.push(args) } : {}),
  };
  globalThis.document = {
    cookie: cookie === null ? "" : `unrelated=1; pregnancy_landing_v1=${cookie}`,
    querySelector: () => ({ getAttribute: () => marker }),
    querySelectorAll: () => links,
    body: {},
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  };
  const mount = (enabled = true) => {
    LandingExperimentAnalytics({ enabled });
    return globalThis.__analyticsEffect();
  };
  const click = (href, id = "", options = {}) => {
    const target = new FakeElement({ href, id });
    for (const listener of listeners) listener({ target, button: 0, defaultPrevented: false, ...options });
  };
  const addLink = (id, href = "https://app.cubtale.com/VTch?gclid=private") => {
    const link = { id, href };
    links.push(link);
    for (const observer of mutationObservers) if (!observer.disconnected) observer.callback([]);
    return link;
  };
  const show = (link, ratio = 1) => {
    for (const observer of visibilityObservers) {
      if (observer.targets.has(link)) observer.callback([{ target: link, isIntersecting: ratio > 0, intersectionRatio: ratio }]);
    }
  };
  try { run({ events, mount, click, listeners, addLink, show, visibilityObservers, mutationObservers }); }
  finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
    delete globalThis.__analyticsEffect;
  }
}

test("experiment analytics excludes disabled tests, direct previews, unassigned and stale cookie sessions", () => {
  for (const configuration of [
    { path: "/homepage", cookie: "redesign", marker: "redesign" },
    { cookie: null },
    { cookie: "redesign", marker: "original" },
    { cookie: "invalid" },
  ]) {
    browser(configuration, ({ events, mount, listeners }) => {
      mount();
      assert.equal(events.length, 0);
      assert.equal(listeners.size, 0);
    });
  }
  browser({}, ({ events, mount }) => {
    mount(false);
    assert.equal(events.length, 0);
  });
});

test("rendered assignment emits one exposure per page load despite effect remounts", () => {
  browser({ cookie: "redesign", marker: "redesign" }, ({ events, mount, listeners }) => {
    const cleanup = mount();
    cleanup();
    mount();
    assert.deepEqual(events, [["event", "landing_experiment_exposure", {
      experiment_id: "landing-design-v1", variant: "redesign",
    }]]);
    assert.equal(listeners.size, 1);
  });
});

test("delegated CTA events cover downloads and pump links without sending destinations or arbitrary IDs", () => {
  browser({}, ({ events, mount, click }) => {
    mount();
    click("https://app.cubtale.com/VTch/pregnancy?utm_source=private", "quick-answer-download-btn");
    click("https://a.cubtale.link/free_pump_bestpregnancy?email=private", "free-pump-btn");
    click("https://app.cubtale.com/VTch?gclid=private", "arbitrary-personal-data");
    click("https://apps.apple.com/app/id123", "app-install");
    click("https://www.babycenter.com/", "babycenter-btn");
    click("javascript:alert(1)", "cubtale-btn");
    click("https://app.cubtale.com/VTch", "cubtale-btn", { defaultPrevented: true });
    assert.deepEqual(events.slice(1).map((entry) => entry[2]), [
      { experiment_id: "landing-design-v1", variant: "original", link_id: "quick-answer-download-btn" },
      { experiment_id: "landing-design-v1", variant: "original", link_id: "free-pump-btn" },
      { experiment_id: "landing-design-v1", variant: "original", link_id: "cubtale-download" },
      { experiment_id: "landing-design-v1", variant: "original", link_id: "app-store-install" },
    ]);
    assert.ok(events.slice(1).every((entry) => entry[1] === "landing_experiment_cta_click"));
    assert.equal(JSON.stringify(events).includes("private"), false);
    // Stop tagging a page if assignment no longer matches the rendered design.
    globalThis.document.cookie = "pregnancy_landing_v1=redesign";
    click("https://app.cubtale.com/VTch", "cubtale-btn");
    assert.equal(events.length, 5);
  });
});

test("events queue in the existing Google dataLayer when gtag has not initialized", () => {
  browser({ gtag: false }, ({ mount, click }) => {
    mount();
    click("https://app.cubtale.com/VTch", "cubtale-btn");
    const queued = globalThis.window.dataLayer.map((entry) => Array.from(entry));
    assert.equal(queued[0][1], "landing_experiment_exposure");
    assert.equal(queued[1][1], "landing_experiment_cta_click");
    assert.equal(queued[1][2].link_id, "cubtale-btn");
  });
});


test("button impressions require half visibility and count once across scrolling and effect remounts", () => {
  browser({ cookie: "redesign", marker: "redesign" }, ({ events, mount, addLink, show }) => {
    const button = addLink("cubtale-btn");
    const cleanup = mount();
    show(button, 0);
    show(button, 0.49);
    assert.equal(events.length, 1);
    show(button, 0.5);
    show(button, 1);
    cleanup();
    mount();
    show(button, 1);
    assert.deepEqual(events.slice(1), [["event", "landing_experiment_cta_impression", {
      experiment_id: "landing-design-v1", variant: "redesign", link_id: "cubtale-btn",
    }]]);
    assert.equal(JSON.stringify(events).includes("private"), false);
  });
});

test("late sticky offers and store badges have distinct impression and click IDs", () => {
  browser({}, ({ events, mount, addLink, show, click, visibilityObservers, mutationObservers }) => {
    const cleanup = mount();
    for (const id of ["sticky-cubtale-download-btn", "cubtale-app-store-btn", "cubtale-google-play-btn", "free-pump-btn"]) {
      const href = id === "free-pump-btn" ? "https://a.cubtale.link/free_pump_bestpregnancy" : "https://app.cubtale.com/VTch";
      const link = addLink(id, href);
      show(link);
      click(href, id);
      assert.equal(events.at(-2)[1], "landing_experiment_cta_impression");
      assert.equal(events.at(-2)[2].link_id, id);
      assert.equal(events.at(-1)[2].link_id, id);
    }
    const untracked = addLink("other", "https://www.babycenter.com/");
    const count = events.length;
    show(untracked);
    assert.equal(events.length, count);
    cleanup();
    assert.ok(visibilityObservers.every(o => o.disconnected));
    assert.ok(mutationObservers.every(o => o.disconnected));
  });
});

test("button impressions stop when the assignment no longer matches the design", () => {
  browser({}, ({ events, mount, addLink, show }) => {
    mount();
    const button = addLink("cubtale-btn");
    globalThis.document.cookie = "pregnancy_landing_v1=redesign";
    show(button);
    assert.equal(events.length, 1);
  });
});
