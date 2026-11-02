"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";
import { APP_ORDER, APP_META } from "@/app/lib/pregnancy-app-meta";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { CubtaleDownloadButton } from "@/app/components/CubtaleDownloadButton";
import FeatureComparisonChart from "@/app/components/FeatureComparisonWithData";
import styles from "./editorial.module.css";

export function EditorialLanding() {
  const { language } = useLanguage();
  const t = translations[language];
  const editorial = t.editorialLanding;
  const [menuOpen, setMenuOpen] = useState(false);
  const [cubtaleLink, setCubtaleLink] = useState("https://app.cubtale.com/VTch/pregnancy");
  const nav = [
    ["features", t.nav.features], ["methodology", t.nav.methodology],
    ["chart", t.nav.comparisonChart], ["faq", t.nav.faq],
  ];

  return (
    <div className={styles.page} lang={language}>
      <div className={styles.cover} id="top">
        <Image src="/hero.png" alt={t.hero.imgAlt} fill priority sizes="100vw" className={styles.coverImage} />
        <header className={styles.header}>
          <a href="#top" className={styles.logo}><Image src="/best-pregnancy-logo.svg" alt="Best Pregnancy Apps" width={160} height={56} /></a>
          <div className={styles.headerActions}>
            <nav className={styles.desktopNav} aria-label={t.footer.explore}>{nav.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
            <LanguageSwitcher />
            <button className={styles.menuButton} aria-label={t.nav.toggleMenu} aria-expanded={menuOpen} aria-controls="editorial-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
          {menuOpen && <nav id="editorial-navigation" className={styles.mobileNav} aria-label={t.footer.explore}>{nav.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
        </header>
        <div className={styles.hero}><h1>{editorial.title}</h1></div>
      </div>

      <main data-landing-variant="redesign">
        <section className={`${styles.container} ${styles.intro}`}>
          <div className={styles.byline}><span>{editorial.lastUpdated}</span><span>{t.hero.author}</span></div>
          <p>{t.hero.description}</p>

        </section>

        <section id="features" className={`${styles.container} ${styles.reviews}`}>
          {APP_ORDER.map((name, index) => {
            const meta = APP_META[name];
            const review = editorial.reviews[name];
            return <article key={name} className={styles.review}>
              <h2><a href={`#review-${index + 1}`}>{index + 1}. {name}: ({meta.rating})</a></h2>
              <div id={`review-${index + 1}`} className={styles.reviewBody}>
                <figure className={styles.appImage}>
                  <Image src={meta.screenshot} alt={name} width={900} height={600} sizes="(min-width: 900px) 45vw, 100vw" />
                  {name === "Cubtale Pregnancy" && (
                    <div className={styles.storeBadges}>
                      <a id="cubtale-app-store-btn" href={cubtaleLink} target="_blank" rel="sponsored noopener noreferrer" aria-label={`${editorial.downloadCubtale} — App Store`}>
                        <Image src="/badges/app-store.png" alt="Download on the App Store" width={498} height={166} sizes="144px" />
                      </a>
                      <a id="cubtale-google-play-btn" href={cubtaleLink} target="_blank" rel="sponsored noopener noreferrer" aria-label={`${editorial.downloadCubtale} — Google Play`}>
                        <Image src="/badges/google-play.png" alt="Get it on Google Play" width={768} height={228} sizes="162px" />
                      </a>
                    </div>
                  )}
                  {name !== "Cubtale Pregnancy" && meta.adoptionRate !== undefined && <figcaption>{meta.adoptionRate}% {t.comparison.coverageLabel}</figcaption>}
                </figure>
                <div className={styles.reviewCopy}>
                  <p>{review.paragraph}</p>
                  {name === "Cubtale Pregnancy" && <p className={styles.babyTrackingNote}>{editorial.babyTrackingNote}</p>}
                  {review.highlights.length > 0 && (
                    <ul className={styles.highlights}>
                      {review.highlights.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  <div className={`${styles.cta} ${name === "Cubtale Pregnancy" ? styles.cubtaleCta : ""}`}>{name === "Cubtale Pregnancy"
                    ? <CubtaleDownloadButton id={meta.btnId} label={editorial.downloadCubtale} onLinkChange={setCubtaleLink} />
                    : <a className={styles.button} href={meta.link} id={meta.btnId} target="_blank" rel="noopener noreferrer">{t.comparison.website}</a>}
                  </div>
                </div>
              </div>

            </article>;
          })}

          <section className={styles.analysis}>
            <h2>{t.comparison.analysisSummary}</h2>
            <div className={styles.threeColumns}>{(["universal", "common", "rare"] as const).map(key => <div key={key}><h3>{t.comparison[key].title}</h3><p>{t.comparison[key].subtitle}</p><ul>{t.comparison[key].items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
            <h3>{t.comparison.keyDifferentiators}</h3>
            <dl className={styles.differentiators}>{APP_ORDER.map(name => <div key={name}><dt>{name}</dt><dd>{t.comparison.differentiators[name]}</dd></div>)}</dl>
            <p className={styles.note}><strong>{t.comparison.methodologyLabel}</strong> {t.comparison.methodologyNote}</p>
          </section>
        </section>

        <section id="methodology" className={styles.methodology}><div className={styles.container}><h2>{t.methodology.title}</h2><div className={styles.threeColumns}>{t.methodology.cards.map(card => <div key={card.title}><span className={styles.methodIcon}>{card.icon}</span><h3>{card.title}</h3><p>{card.body}</p></div>)}</div></div></section>

        <section id="chart" className={styles.chart}><FeatureComparisonChart editorial /></section>

        <section id="faq" className={`${styles.container} ${styles.faq}`}>
          <h2>{t.faq.title}</h2><p>{t.faq.subtitle}</p>
          {t.faq.items.map((item, index) => <details key={item.question} name="pregnancy-faq" open={index === 0 ? true : undefined}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          <aside className={styles.disclaimer}><h3>{t.faq.stillHaveQuestions}</h3><p>{editorial.updatedNote}</p><p><strong>{t.faq.disclaimerLabel}</strong> {t.faq.disclaimer}</p></aside>
        </section>
      </main>

      <footer className={styles.footer}><div className={styles.container}><div className={styles.footerTop}><div><a href="#top"><Image src="/best-pregnancy-logo.svg" alt="Best Pregnancy Apps" width={180} height={64} /></a><p>{t.footer.description}</p></div><nav aria-label={t.footer.explore}><h3>{t.footer.explore}</h3>{nav.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav></div><p className={styles.affiliateNote}>{t.footer.affiliateNote}</p><p className={styles.copyright}>© {new Date().getFullYear()} {t.footer.copyright}</p></div></footer>
    </div>
  );
}
