export const API_CONFIG = {
  BASE_URL: "https://api.tomorrow.io/v4/weather",
  GEO: "https://api.tomorrow.io/v4/locations",
  API_KEY: import.meta.env.VITE_TOMORROW_API_KEY,
  DEFAULT_PARAMS: {
    units: "metric",
    apikey: import.meta.env.VITE_TOMORROW_API_KEY,
  },
};
