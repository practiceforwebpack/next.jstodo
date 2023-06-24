import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

function EncodeUrl() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const urlParamsTmp =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search);
    const url = urlParamsTmp && urlParamsTmp.get("url");
    setUrl(url);
  }, []);

  const onFinish = (values) => {
    const encodedUrl = encodeURIComponent(values.url);
    window.location.href = `/encodeUrl?url=${encodedUrl}`;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>URL Encoder</h1>
      <Form
        name="basic"
        initialValues={{ url }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="URL to encode"
          name="url"
          rules={[
            {
              required: true,
              message: "Please input a URL to encode!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Encode
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EncodeUrl;
