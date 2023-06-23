import Head from "next/head";
import Card from "../components/Card";
import YhList from "../components/YhList";
import Icon from "../components/Icon";
import NotFound from "../components/NotFound";
import useDataFromLocalStrong from "../hooks/useDataFromLocalStrong";
import { useState, useEffect } from "react";
import { Form, Input } from "antd";

export default function Home() {
  const urlParamsTmp =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search);
  const url = urlParamsTmp && urlParamsTmp.get("url");
  const encodedUrl = encodeURIComponent(url || "");
  const title = urlParamsTmp && urlParamsTmp.get("title");
  const yhParams = urlParamsTmp && urlParamsTmp.get("yh");

  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({ url: encodedUrl });

  useEffect(() => {
    if (encodedUrl) {
      setInitialValues({ url: encodedUrl });
    }
  }, [url]);

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
        <Form layout="vertical" form={form} initialValues={initialValues}>
          <Form.Item label="Encoded URL" name="url">
            <Input.TextArea rows={1} readOnly />
          </Form.Item>
        </Form>
      </main>
    </div>
  );
}
