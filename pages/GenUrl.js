import { useState } from "react";
import { Input, Form, Button, Space } from "antd";
import { useRouter } from "next/router";

const GenUrl = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [additionalUrls, setAdditionalUrls] = useState([]);

  const handleAdditionalUrlChange = (index, value) => {
    const newUrls = [...additionalUrls];
    newUrls[index] = value;
    setAdditionalUrls(newUrls);
  };

  const handleDeleteUrl = (index) => {
    const newUrls = [...additionalUrls];
    newUrls.splice(index, 1);
    setAdditionalUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedAdditionalUrls = additionalUrls
      .map((additionalUrl) => encodeURIComponent(additionalUrl))
      .join(",");
    const encodedUrl = `https://previewlink.chentaotie.com/?url=${encodeURIComponent(
      url
    )}&yh=${encodedAdditionalUrls}`;
    setEncodedUrl(encodedUrl);
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    setAdditionalUrls([...additionalUrls, ""]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form>
          <Form.Item label="商品链接" name="url">
            <Input
              placeholder="请输入商品链接"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </Form.Item>
        </Form>
        {additionalUrls.map((additionalUrl, index) => (
          <Form.Item
            key={index}
            label={`优惠券链接 ${index + 1}`}
            name={`yhurl-${index}`}
          >
            <div style={{ display: "flex" }}>
              <Input
                placeholder="请输入优惠券链接"
                value={additionalUrl}
                onChange={(e) =>
                  handleAdditionalUrlChange(index, e.target.value)
                }
                style={{ marginRight: "10px" }}
              />
              <Button onClick={() => handleDeleteUrl(index)} danger>
                删除
              </Button>
            </div>
          </Form.Item>
        ))}
        <Space>
          <Button onClick={handleAddUrl}>添加优惠券链接</Button>
          <Button htmlType="submit">提交</Button>
        </Space>
      </form>
      {encodedUrl && (
        <Form style={{ marginTop: "20px" }} initialValues={{ encodedUrl }}>
          <Form.Item label="编码结果" name="encodedUrl">
            <input
              type="text"
              value={encodedUrl}
              readOnly
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default GenUrl;
