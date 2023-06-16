export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.error("GA tracking ID is missing!");
    return;
  }

  if (typeof window === "undefined" || !window.gtag) {
    console.warn("Google Analytics has not been loaded");
    return;
  }

  window.gtag("js", new Date());
  window.gtag("config", GA_TRACKING_ID);
};

export const pageview = (url) => {
  if (!GA_TRACKING_ID) {
    console.error("GA tracking ID is missing!");
    return;
  }

  if (typeof window === "undefined" || !window.gtag) {
    console.warn("Google Analytics has not been loaded");
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) {
    console.error("GA tracking ID is missing!");
    return;
  }

  if (typeof window === "undefined" || !window.gtag) {
    console.warn("Google Analytics has not been loaded");
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
