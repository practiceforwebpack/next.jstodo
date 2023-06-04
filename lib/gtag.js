export const GA_TRACKING_ID = "G-43HNXJP55G";

// 初始化 Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.error("GA tracking ID is missing!");
    return;
  }

  window.gtag("js", new Date());
  window.gtag("config", GA_TRACKING_ID);
};

// 发送页面浏览事件
export const pageview = (url) => {
  if (!GA_TRACKING_ID) {
    console.error("GA tracking ID is missing!");
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// 发送事件
export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) {
    console.error("GA tracking ID is missing!");
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
