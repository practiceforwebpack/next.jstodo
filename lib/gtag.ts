const GA_TRACKING_ID = "G-43HNXJP55G";

export const initGA = (): void => {
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

export const pageview = (url: string): void => {
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

interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GAEvent): void => {
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
