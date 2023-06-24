import { useState } from "react";
import { Input, Form, Button } from "antd";
import { useRouter } from "next/router";

const GenUrl = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodeUrl = `http://localhost:3000/?url=${encodeURIComponent(url)}`;
    setEncodedUrl(encodeUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="请输入URL"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
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
