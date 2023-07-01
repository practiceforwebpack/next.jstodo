import { useState } from "react";
import { Input, Form, Button, message } from "antd";
import { useRouter } from "next/router";

const GenUrl = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [additionalUrls, setAdditionalUrls] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (values) => {
    setSubmitted(true);
    setUrl("");
    setAdditionalUrls([]);
    message.success("成功生成链接！");
  };

  const handleFailedSubmit = () => {
    message.error("生成链接失败，请检查您的输入！");
  };

  const handleAddUrl = () => {
    setAdditionalUrls([...additionalUrls, ""]);
  };

  const encodedAdditionalUrls = additionalUrls
    .map((additionalUrl) => encodeURIComponent(additionalUrl))
    .join(",");
  const encodedUrl = `https://previewlink.chentaotie.com/?url=${encodeURIComponent(
    url
  )}&yh=${encodedAdditionalUrls}`;

  return (
    <div>
      <Form
        name="my-form"
        onFinish={handleSubmit}
        onFinishFailed={handleFailedSubmit}
        layout="vertical"
      >
        <Form.Item
          label="商品链接"
          name="url"
          rules={[{ required: true, message: "请输入商品链接！" }]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Input
            placeholder="请输入商品链接"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </Form.Item>
        <Form.List name="additionalUrls">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  key={field.key}
                  label={`优惠券链接 ${index + 1}`}
                  name={["additionalUrls", index]} // 添加这行代码
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  <div style={{ display: "flex" }}>
                    <Input
                      placeholder="请输入优惠券链接"
                      value={additionalUrls[index]}
                      onChange={(e) =>
                        handleAdditionalUrlChange(index, e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <Button onClick={() => remove(field.name)} danger>
                      删除
                    </Button>
                  </div>
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ offset: 1 }}>
                <Button onClick={() => add()}>添加优惠券链接</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ offset: 1 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      {submitted && (
        <Form style={{ marginTop: "20px" }} initialValues={{ encodedUrl }}>
          <Form.Item label="编码结果" name="encodedUrl">
            <input
              type="text"
              value={encodedUrl}
              readOnly
              style={{ width: "74%" }}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default GenUrl;
