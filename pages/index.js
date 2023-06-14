import Head from "next/head";
import Card from "../components/Card";
import YhList from "../components/YhList";
import Icon from "../components/Icon";
import NotFound from "../components/NotFound";
import useDataFromLocalStrong from "../hooks/useDataFromLocalStrong";

export default function Home() {
  const urlParamsTmp = new URLSearchParams(window.location.search);
  const url = urlParamsTmp.get("url");
  const title = urlParamsTmp.get("title");
  const yhParams = urlParamsTmp.get("yh");

  const { cardData, loading, error } = useDataFromLocalStrong(
    url,
    title,
    yhParams
  );

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      <Head>
        <title>{cardData.title}</title>
        <meta name="description" content="Fetch URL Card" />
        <Icon />
      </Head>

      <main>
        <Card cardData={cardData} loading={loading} />
        {cardData.urls && <YhList urls={cardData.urls} />}
      </main>
    </div>
  );
}
