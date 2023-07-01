import { useState } from "react";
import { Input, Form, Button, message } from "antd";

const GenUrl = () => {
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

  const handleSubmit = (values) => {
    const submitUrl = values.url;
    const encodedAdditionalUrls = additionalUrls
      .map((additionalUrl) => encodeURIComponent(additionalUrl))
      .join(",");
    const encodedUrl = `https://previewlink.chentaotie.com/?url=${encodeURIComponent(
      submitUrl
    )}&yh=${encodedAdditionalUrls}`;

    // Validating URLs
    const isValidUrl = validateUrl(submitUrl);
    const areAdditionalUrlsValid = additionalUrls.every((url) =>
      validateUrl(url)
    );

    if (!isValidUrl || !areAdditionalUrlsValid) {
      handleFailedSubmit();
      return;
    }

    setEncodedUrl(encodedUrl);

    // Clear input fields
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

  const validateUrl = (url) => {
    const regex = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return regex.test(url);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Form
        name="my-form"
        onFinish={handleSubmit}
        onFinishFailed={handleFailedSubmit}
        layout="vertical"
      >
        <Form.Item
          label="商品链接"
          name="url"
          rules={[
            { required: true, message: "请输入商品链接！" },
            {
              validator: (_, value) =>
                validateUrl(value)
                  ? Promise.resolve()
                  : Promise.reject("请输入有效的URL"),
            },
          ]}
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
                      rules={[
                        {
                          validator: (_, value) =>
                            validateUrl(value)
                              ? Promise.resolve()
                              : Promise.reject("请输入有效的URL"),
                        },
                      ]}
                    />
                    <Button onClick={() => remove(field.name)} danger>
                      删除
                    </Button>
                  </div>
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ offset: 0, span: 18 }}>
                <Button
                  onClick={() => add()}
                  block
                  style={{ border: "1px dashed rgba(128, 128, 128, 0.4)" }}
                >
                  添加一行数据
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      {encodedUrl && (
        <Form style={{ marginTop: "20px" }} initialValues={{ encodedUrl }}>
          <Form.Item label="编码结果" name="encodedUrl">
            <input
              type="text"
              value={encodedUrl}
              readOnly
              style={{ width: "73%" }}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default GenUrl;
