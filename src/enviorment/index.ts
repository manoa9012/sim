const {
  VUE_APP_APIKEY,
  VUE_APP_BASE_URL,
  VUE_APP_SITE_URL,
  NODE_ENV = "",
} = process.env;

export const environment = NODE_ENV.toLowerCase();
export const apiBaseUrl = VUE_APP_BASE_URL;
export const siteUrl = VUE_APP_SITE_URL;
export const apikey = VUE_APP_APIKEY;

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelop = process.env.NODE_ENV != "production";
