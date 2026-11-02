/** Read the rendered design: a rewrite keeps '/' and cookies can outlive a test. */
export function getAppsFlyerGroupName(): "a" | "b" {
  const variant = typeof document === "undefined"
    ? null
    : document.querySelector("main[data-landing-variant]")
      ?.getAttribute("data-landing-variant");

  return variant === "redesign" ? "b" : "a";
}

export function getAppsFlyerAdParameters() {
  return {
    keys: ["utm_ad", "cub_ad"],
    defaultValue: `bestpregnancyapp_web_ad_${getAppsFlyerGroupName()}`,
  };
}

export function getAppsFlyerDeepLinkGroupParameter() {
  return {
    paramKey: "deep_link_sub1",
    defaultValue: getAppsFlyerGroupName(),
  };
}
