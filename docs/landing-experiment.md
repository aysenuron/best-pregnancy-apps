# Start the landing page test

Follow this checklist in order. **Commit and push at Step 3, after Step 2.**
You do not need to install Vercel software or create a flag in its Flags screen.
The website code already handles the test.

## 1. Find your existing website project

1. Open https://vercel.com/dashboard and sign in.
2. Choose the team/account that owns the website.
3. Open the project for **bestpregnancy.app**. Its project name might differ.
   **Settings → Domains** lets you confirm the domain.
4. Open **Settings → Git**. Confirm the repository is
   `aysenuron/best-pregnancy-apps`.
5. Open **Deployments**, select the current deployment marked **Production**,
   and check its source branch. These instructions expect **main**, which is
   also your current local branch.

If you cannot find the existing project, or the repository/production branch is
different, pause and tell me what you see. Do not create a second project or
change domain settings to follow this guide.

## 2. Add the settings with the test OFF

1. In the project, click **Settings → Environment Variables**. Some layouts
   show **Environment Variables** directly in the project sidebar.
2. Click **Add Environment Variable** or use the **Add New** form.
3. Paste the first Name and Value below into their separate fields.
4. Select **Production** only. If asked for a type, choose **Config**.
5. Click **Save**, then repeat for the second row.

| Name / Key | Value | Environment |
| --- | --- | --- |
| `LANDING_AB_TEST_ENABLED` | `false` | Production |
| `LANDING_AB_TEST_REDESIGN_PERCENTAGE` | `50` | Production |

Use lowercase `false` and the number `50`, without quotes. If either name
already exists, use **… → Edit** to update its Production value instead of
adding a duplicate. Do not change other variables.

These settings take effect on the next deployment, not the current website.
[Vercel explains environment-variable changes here](https://vercel.com/docs/environment-variables/managing-environment-variables).

**Do not click Redeploy yet. Push the new code next.**

## 3. Commit and push NOW

Both settings should now be saved, with the test set to `false`.
Use your usual Git app to stage the website changes, commit, and push `main`.
Alternatively, run these commands in Terminal, one line at a time:

```bash
cd "/Users/altop/Documents/Freelance/Button/best-pregnancy-apps"
git add app public docs tests proxy.ts
git commit -m "Add alternate landing page and A/B tracking"
git push origin main
```

This includes the new page, scripts, badges, fonts, tests, and documentation.
I have not committed or pushed these changes for you.

With the existing Git integration enabled, pushing the production branch starts
a production deployment automatically. [Vercel documents that behavior here](https://vercel.com/docs/deployments/promoting-a-deployment).

## 4. Wait for Ready, then review both pages

1. In Vercel, open your project → **Deployments**.
2. Find the new deployment for the commit you just pushed.
3. Wait until it says **Ready** and confirm it is **Production**.
4. Open https://bestpregnancy.app/ and confirm the original page appears.
5. Open https://bestpregnancy.app/homepage and check the new page on your phone
   and computer. Check the images, store badges, and download button.

The new page is available for review, but visitors to `/` still see the original.

If the build fails, open the deployment → **Build Logs** and send me the error.
If no deployment appears after pushing, tell me what the Deployments screen shows.

## 5. Prepare Google Analytics reporting

Do this before starting the test.

1. Open https://analytics.google.com/ and choose the property for bestpregnancy.app.
   The site's current measurement ID is `G-QZ5SHGXRPV`.
2. Click **Admin** (gear icon) → **Data display → Custom definitions**.
3. Click **Create custom dimension**.
4. Enter the first row below, select **Event** for Scope, and click **Save**.
5. Repeat for the other rows. You can type an event parameter if it is not yet
   in the dropdown. Skip any definition that already exists.

| Dimension name | Scope | Event parameter |
| --- | --- | --- |
| Landing experiment | Event | `experiment_id` |
| Landing variant | Event | `variant` |
| Landing button | Event | `link_id` |

You need Editor or Administrator access. Google says custom dimensions can take
24–48 hours to become available in reports. [Google's explanation](https://support.google.com/analytics/answer/14240153).

## 6. Turn the test ON

1. Return to Vercel → your project → **Settings → Environment Variables**.
2. Find `LANDING_AB_TEST_ENABLED`. Click **… → Edit**.
3. Change its **Production** value from `false` to `true`. Click **Save**.
4. Leave `LANDING_AB_TEST_REDESIGN_PERCENTAGE` at `50`.
5. Open **Deployments**.
6. Find the Production deployment containing your new code. Click **… → Redeploy**.
7. Select **Production** if asked. Uncheck **Use existing Build Cache** if shown.
8. Click **Redeploy** and wait for the new Production deployment to say **Ready**.

**The 50/50 test starts when this deployment is Ready.** No second commit or push
is needed. [Vercel's redeploy instructions](https://vercel.com/docs/deployments/managing-deployments).

New visitors will be assigned roughly equally to the original or new design.
The address stays `https://bestpregnancy.app/` for both. Each visitor normally
keeps their design for 30 days, so refreshing will not switch designs.

## 7. Check that it works

1. Open a new private/incognito window and visit https://bestpregnancy.app/.
2. You should see either design. Refresh and confirm it stays the same.
3. To try another fresh assignment, close ALL private/incognito windows and open
   another. It might randomly choose the same design again.
4. In Google Analytics, open **Reports → Realtime**. Look for
   `landing_experiment_exposure` in the event list.
5. Scroll until a download button is visible. Look for
   `landing_experiment_cta_impression`. Click the button, then look for
   `landing_experiment_cta_click`. Allow a few minutes; ad blockers can prevent events.

**Keep ads pointed at https://bestpregnancy.app/.** Direct `/homepage` visits
always show the new design and are excluded from experiment events.

## 8. View results in Google Analytics

After the custom dimensions become available:

1. Click **Explore → Blank**. Name it **Landing page test**.
2. Under **Variables → Dimensions → +**, import **Event name**,
   **Landing experiment**, **Landing variant**, and **Landing button**.
3. Under **Variables → Metrics → +**, import **Event count**.
4. In **Tab settings → Rows**, add **Landing variant**, followed by **Landing button**.
5. Put **Event name** in **Columns** and **Event count** in **Values**.
6. Add a filter: **Landing experiment → exactly matches → landing-design-v1**.
7. Add another filter: **Event name → matches regex**, and paste:

   ```text
   ^landing_experiment_cta_(impression|click)$
   ```

8. Set the date range to cover your test. If you already created the report from
   an earlier version of this guide, update its Rows and add the event-name filter.

The table now shows each button's impressions and clicks under `original` (A) or
`redesign` (B). Divide clicks by impressions for that same button and group to
compare click-through rates. For example, 20 clicks / 1,000 impressions = 2%.
Repeated clicks count separately, so this is not a unique-visitor conversion rate.

An impression means at least half of that button entered the browser viewport.
Each button ID counts once per page load, even if you scroll away and back.
A refresh can produce another impression. This measures viewport visibility,
not a minimum viewing time or confirmed attention. Tracking includes late-loading
sticky offers. The code sends all events automatically once the test is enabled.

| Event | What it counts |
| --- | --- |
| `landing_experiment_exposure` | A visit to the assigned landing page, once per page load |
| `landing_experiment_cta_impression` | A button becomes at least 50% visible, once per button ID per page load |
| `landing_experiment_cta_click` | A click on a tracked button or store badge |

All three events include `experiment_id = landing-design-v1` and the `variant`.
Button events also include `link_id`, shown as Landing button:

| Button ID | Button |
| --- | --- |
| `quick-answer-download-btn` | Original page's quick-answer button |
| `cubtale-btn` | Download button in the Cubtale review |
| `sticky-cubtale-download-btn` | Sticky app download at the bottom of the screen |
| `cubtale-app-store-btn` | App Store badge in the variation |
| `cubtale-google-play-btn` | Google Play badge in the variation |
| `free-pump-btn` | Geography-dependent free-pump offer; analyze separately from downloads |

### A second report: landing page impressions and users

The button report above filters out page exposures. Create this separate report
to see how many tracked users saw each design, whether or not they clicked.
The existing `landing_experiment_exposure` event already measures this; no new
tracking code or custom dimension is needed.

1. Click **Explore → Blank**. Name it **Landing page impressions**.
2. In **Variables → Dimensions → +**, import **Event name**, **Landing experiment**,
   and **Landing variant**.
3. In **Variables → Metrics → +**, import **Event count** and **Total users**.
4. In **Tab settings → Rows**, add **Landing variant**. Leave **Columns** empty.
5. In **Values**, add **Event count** and **Total users**.
6. In **Filters**, add **Landing experiment → exactly matches → landing-design-v1**.
7. Add **Event name → exactly matches → landing_experiment_exposure**.
8. Set the date range to start when the experiment was enabled.

`original` means A; `redesign` means B. **Event count** is page impressions
(one per tracked page load, including refreshes). **Total users** is GA's count
of distinct users who triggered that exposure event during the selected period.
Use the total row for overall users; summing variant user counts can double-count
users who appear in both groups. These are visitors GA can measure, not every
server request. The report covers the active root-page experiment; it excludes
direct `/homepage` previews and visits while the test is disabled.

For overall page click-through performance, use another report with Landing
variant in Rows, Event name in Columns, Event count in Values, and the same
experiment filter. Set Event name → matches regex to
`^landing_experiment_(exposure|cta_click)$`, then compare clicks per page exposure.
Keep this denominator distinct from button impressions.

These counts do not confirm app installs. Reports only contain events collected
after the corresponding code is deployed and the test is enabled; button
impressions cannot be reconstructed for earlier visits. If the three custom
definitions from Step 5 already exist, keep them. No new custom dimension is needed.
Google's [Explorations guide](https://support.google.com/analytics/answer/7579450)
explains the Variables and Tab settings controls.

For AppsFlyer attribution, generated download links carry:

| Design | Default ad name (`af_ad`) | `deep_link_sub1` |
| --- | --- | --- |
| Original / A | `bestpregnancyapp_web_ad_a` | `a` |
| New / B | `bestpregnancyapp_web_ad_b` | `b` |

Existing `utm_ad` or `cub_ad` values can override the ad name, but
`deep_link_sub1` still identifies the group. Actual install results require
your AppsFlyer reporting rather than the GA click counts.

## Stop the test

1. In Vercel's Environment Variables, change `LANDING_AB_TEST_ENABLED` to
   `false` for **Production** and save.
2. Open **Deployments** → current Production deployment → **… → Redeploy**.
3. Uncheck the build cache if offered, confirm, and wait for **Ready**.

Everyone visiting `/` will get the original again. No commit or push is needed.
Use `false` to stop; setting the percentage to `0` would leave previously
assigned visitors in their existing groups.

Technical implementation notes have been kept in
[landing-experiment-technical.md](landing-experiment-technical.md) for future maintenance.
