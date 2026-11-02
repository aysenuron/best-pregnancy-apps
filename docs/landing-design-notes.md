# Separate editorial landing design

Reference requested: https://bestbabytrackerapp.com/homepage

## Observed reference

The requested URL redirects through WordPress to the site's root. The reference
also runs its own A/B test. A controlled REA capture reached the other variant
at `/?nab=1` (Evidence
`ev_48f078605374f9fe78a4a9b993aaf04034608bb7352018ab056ceba93a922cac`).
That capture establishes the alternative being served; it does not establish
which version every visitor sees. Browser inspection also reached `/?nab=0`.
The user explicitly selected the latter: the large serif headline over a
full-width baby photo.

Observed design elements used in the reconstruction:

- Lora serif typography, dark purple headline (`#20124d`), faded full-width hero
  image, and navigation over the image.
- Approximately 484px desktop hero, centered heading around 82px, white content
  area, and roughly 1160px article width.
- Large, underlined, numbered review headings; screenshot on the left and
  review text on the right; purple rectangular download buttons.
- A long editorial page leading to comparison data and frequently asked questions.

## Implementation decisions

The design is reconstructed in `app/homepage`, rather than copying WordPress
markup, scripts, tracking identifiers, or reference content. The reference's baby
photo is replaced with the current site's `/hero.png`. Its review images are
replaced with the current site's existing screenshots. Lora is self-hosted with
its SIL Open Font License in `public/fonts/lora`.

Review claims, methodology, chart data, FAQs, scores, and links come from existing
project sources. The variation's English and Spanish review copy is stored under
`editorialLanding` in `app/lib/translations.ts`. It uses a personal editorial voice:
one enthusiastic Cubtale paragraph and four highlights, followed by short reviews
of the other five apps, each with a positive point and a comparison to Cubtale.
Shared review metadata now lives in `app/lib/pregnancy-app-meta.ts`. The reference's
baby-app claims, rankings, testimonials, and affiliate parameters were not reused.

The variation's headline is “Best Pregnancy Apps in 2026”. The quick-answer block,
comparative-analysis introduction, and detailed review lists of strengths,
limitations, and unavailable features were removed at the user's request. The chart-save section and Cubtale coverage caption were also removed. The
variation uses a November 1, 2026 update date and a wider “Download Cubtale”
button, with explicit copy about continuing to track feeds, diapers, and sleep
after birth. Author, medical disclaimer, and geography-dependent sticky offer remain. The original page keeps its existing design and copy.

The supplied App Store and Google Play badges appear beneath Cubtale's image.
Both receive the same generated AppsFlyer URL as the review's download button,
including ad attribution and `deep_link_sub1`. The badges use the same fallback
URL as that button while the Smart Script initializes or if it is unavailable.

## Verification checklist

- Reference identity and user's chosen A/B design: answered.
- Separate route preserving original and current content: implemented.
- English and Spanish: checked in the browser; original-page translations are unchanged.
- Desktop and 390px mobile layout: checked; no page-wide horizontal overflow.
- App imagery and six reviews: checked; no failed image loads observed.
- Mobile menu and comparison category selection: checked.
- Search metadata: direct variant has `noindex, follow` and root canonical;
  sitemap remains unchanged.
- Experiment routing and measurement: see `landing-experiment.md` and automated
  routing/analytics tests. Production configuration and GA reporting setup remain
  deployment tasks, not changes made to a live account.
- Final local verification: all 17 tests and `npm run build` passed. The built
  production server served the correct original/redesign marker for each cookie,
  preserved UTMs in the rewrite, and returned both targeted CDN `no-store`
  headers. A crawler request received the original without a new assignment.
