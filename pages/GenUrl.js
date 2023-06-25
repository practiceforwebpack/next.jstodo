import { useState } from "react";
import { Input, Form, Button } from "antd";
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
    const encodedUrl = `http://localhost:3000/?url=${encodeURIComponent(
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
        <Form.Item label="URL" name="url">
          <Input
            placeholder="请输入URL"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </Form.Item>
        {additionalUrls.map((additionalUrl, index) => (
          <Form.Item
            key={index}
            label={`YH-URL ${index + 1}`}
            name={`yhurl-${index}`}
          >
            <div style={{ display: "flex" }}>
              <Input
                placeholder="请输入YH-URL"
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
        <Button onClick={handleAddUrl}>添加URL</Button>
        <Button htmlType="submit">提交</Button>
      </form>
      {encodedUrl && (
        <Form style={{ marginTop: "20px" }} initialValues={{ encodedUrl }}>
          <Form.Item label="编码后URL" name="encodedUrl">
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
