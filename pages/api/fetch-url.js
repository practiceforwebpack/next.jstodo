import { get } from "axios";
import { load } from "cheerio";

async function getMetaData(url) {
  try {
    if (!url) {
      throw new Error("URL is required");
    }

    const response = await get(url);
    const html = response.data;
    const $ = load(html);

    const title =
      $("meta[property='og:title']").attr("content") || $("title").text();
    const description =
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='description']").attr("content") ||
      "";
    const image = $("meta[property='og:image']").attr("content") || "";

    return {
      url,
      title,
      description,
      image,
    };
  } catch (error) {
    throw error;
  }
}

export default getMetaData;
