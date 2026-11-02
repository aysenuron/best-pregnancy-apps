# Landing page design experiment

The original page remains in `app/page.tsx` at `/`. The design variant is a
separate App Router page in `app/homepage/page.tsx`, available at `/homepage` for
review. It shares the site's pregnancy content and translation source. Do not
add `/homepage` to the sitemap; keep its canonical URL pointing to `/` and mark
the direct variant route `noindex`.

## Routing choice

Use a single Vercel project/deployment with two static page routes and a
server-side rewrite. This follows [Vercel's cookie-based A/B routing pattern](https://vercel.com/blog/ab-testing-with-nextjs-and-vercel).
On this project's Next.js 16, the request hook is named
[`proxy.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy).
The visitor continues to see `/` in the address bar, avoiding a client-side
swap after the original page renders. Query parameters (including UTMs) survive
the rewrite unchanged.

The experiment is **off by default**. No Vercel account configuration or new
analytics service is required to preview the new route. This change prepares
the test; it does not deploy the website or start sending production traffic
to the redesign.

## Enable on Vercel when ready

Add these server-side environment variables to the desired Vercel environment
and redeploy:

```dotenv
LANDING_AB_TEST_ENABLED=true
LANDING_AB_TEST_REDESIGN_PERCENTAGE=50
```

Only the exact string `true` enables allocation. The percentage defaults to 50
when omitted; an invalid value sends new visitors to the original. Valid values
are 0 through 100. Existing assigned visitors retain their variant when the
percentage changes. To stop the test for everyone, set
`LANDING_AB_TEST_ENABLED=false` (or remove it) and redeploy.

On a normal GET to `/`, new visitors are randomly assigned and get a 30-day
`pregnancy_landing_v1=original|redesign` cookie (`SameSite=Lax`, `Secure` on
HTTPS). Subsequent visits use the same assignment. Known crawler user agents,
prefetch requests, and non-GET requests are excluded. Other routes, including
direct `/homepage` visits, never allocate or change assignment. Clear that cookie
or change its version/name for a new independent experiment.

Responses in the active experiment include `x-landing-experiment: landing-design-v1`
and `x-landing-variant: original|redesign`. The proxy sets `Cache-Control: private, no-store` and explicitly sets both
`CDN-Cache-Control: no-store` and `Vercel-CDN-Cache-Control: no-store` for allocation
responses. Next.js may replace the standard `Cache-Control` with its static-page
cache policy after a rewrite; the targeted CDN headers preserve the no-store
instruction at shared caches. [Vercel documents](https://vercel.com/docs/caching/cache-control-headers)
that `Vercel-CDN-Cache-Control` has highest priority and is consumed by Vercel
(it will not appear in a public response); `CDN-Cache-Control` controls downstream
CDNs. Page generation remains static and routing occurs before delivery. Verify
these headers and alternating cookie assignments on a Vercel Preview deployment
before enabling Production; local `next start` cannot validate Vercel's CDN.

## Measure before launching

The existing Google Analytics tag receives two custom events:

| Event | When it fires | Parameters |
| --- | --- | --- |
| `landing_experiment_exposure` | Once per full page load after the rendered design matches its valid assignment cookie | `experiment_id`, `variant` |
| `landing_experiment_cta_click` | A primary outbound Cubtale/download/install or free-pump CTA is clicked | `experiment_id`, `variant`, `link_id` |

The experiment ID is `landing-design-v1`; variant is `original` or `redesign`.
`link_id` uses known button IDs or fixed categories (`cubtale-download`,
`app-store-install`, `google-play-install`). No destination URLs, query strings,
link text, or arbitrary DOM IDs are added to these event parameters. The existing
AppsFlyer link and navigation behavior are preserved. Events queue in the existing
Google tag dataLayer if the tag has not initialized yet.

Tracking requires the server-side enable switch, the visible browser path `/`,
a valid assignment cookie, and the matching `data-landing-variant` marker on the
rendered main element. Direct `/homepage` previews, unassigned requests, and stale
cookie/render mismatches emit no experiment events. Effect remounts do not send a
second exposure in the same page load. Browser refreshes produce new exposures;
these are page-load counts, not unique visitor counts.

Before enabling traffic splitting, open GA4 **Admin → Data display → Custom
definitions → Create custom dimension** and create three **event-scoped**
definitions with event parameter names `experiment_id`, `variant`, and `link_id`.
Use readable dimension names such as “Landing experiment”, “Landing variant”,
and “Landing CTA”. See Google's [custom-dimensions guidance](https://support.google.com/analytics/answer/14240153).
Confirm both events in [Realtime or DebugView](https://developers.google.com/analytics/devguides/collection/ga4/events)
on a Preview deployment. New custom dimensions can take time to appear in reports.
No GA admin configuration is made automatically by this code.

In a GA exploration filtered to `experiment_id = landing-design-v1`, compare
`landing_experiment_exposure` and `landing_experiment_cta_click` event counts by
variant and CTA. Report clicks per exposure for page-level click-through rate;
repeat clicks count separately. For visitor conversion rate, use distinct users
who had an exposure and then a CTA click, divided by distinct exposed users in
the same variant and time window. Consider app-download and pump-offer CTAs
separately because the existing geography logic presents different offers.

CTA clicks are outbound intent signals. They do **not** confirm an app install,
pump order, or completed purchase. Those outcomes require attributed AppsFlyer or
merchant conversion data. The custom events do not automatically create a GA
experiment, key event, or results dashboard. Retain UTMs and choose the reporting
window and success metric before enabling the experiment.

### AppsFlyer ad attribution

All active AppsFlyer Smart Script calls (quick-answer download, review card,
and sticky download bar) share `app/lib/appsflyer-ad.ts`. Their default `af_ad`
value identifies the design actually rendered:

- Original / group A: `bestpregnancyapp_web_ad_a`
- Redesign / group B: `bestpregnancyapp_web_ad_b`

The rendered main element determines the suffix, including when the redesign is
rewritten to `/` or previewed directly at `/homepage`. A stale assignment cookie
cannot incorrectly label the original as B after the test is disabled. Normal
original visits use A even when traffic splitting is off. Explicit `utm_ad` and
`cub_ad` values retain their existing priority over the default value.

The same generators also set `deep_link_sub1` to the group name: `a` for the
original and `b` for the redesign. This value always follows the rendered group,
including when an explicit `utm_ad` or `cub_ad` overrides the ad name. Incoming
query parameters do not override this group identifier.

[Vercel Flags](https://vercel.com/docs/flags/vercel-flags) also supports dashboard
splits, per-environment targeting, and flag evaluation observability. If you want
the allocation controlled in Vercel's Flags dashboard without redeploying, connect
that project and use its recommended Flags SDK to replace the local environment
switch/allocation decision. This repository does not yet register a remote flag,
install its SDK, or provision a Vercel dashboard experiment. The separate page
routes remain suitable for that integration.

## Verify

Run `npm test` and `npm run build`, then enable the environment variables on a
Preview deployment before enabling Production. Confirm that `/homepage` is
visually correct in English and Spanish, and check routing with:

```bash
curl -I https://YOUR-PREVIEW.vercel.app/homepage
curl -s -D - -o /dev/null -H 'Cookie: pregnancy_landing_v1=original' 'https://YOUR-PREVIEW.vercel.app/?utm_source=qa'
curl -s -D - -o /dev/null -H 'Cookie: pregnancy_landing_v1=redesign' 'https://YOUR-PREVIEW.vercel.app/?utm_source=qa'
```

The active experiment's two GET responses should have the corresponding
`x-landing-variant` headers. The redesign uses an internal rewrite to `/homepage`
with the query string intact. A normal browser should keep its initial variant
on refresh. With the test disabled, `/` must always show the original even if a
redesign cookie remains.
