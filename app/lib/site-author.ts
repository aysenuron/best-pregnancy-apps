export const SITE_AUTHOR = "Courtney Miller";
export const SITE_AUTHOR_PATH = "/authors/courtney-miller";
export const SITE_AUTHOR_URL = `https://bestpregnancy.app${SITE_AUTHOR_PATH}`;

export const SITE_AUTHOR_SCHEMA = {
  "@type": "Person",
  "@id": `${SITE_AUTHOR_URL}#person`,
  name: SITE_AUTHOR,
  url: SITE_AUTHOR_URL,
};
