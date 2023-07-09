import { useState } from "react";
import { Input, Form, Button, message, Table } from "antd";

const GenUrl = () => {
  const [url, setUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [additionalUrls, setAdditionalUrls] = useState([]);
  const [encodedUrls, setEncodedUrls] = useState([]);

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

  const handleNavigate = (url) => {
    window.location.href = url;
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

    setUrl(submitUrl);
    setEncodedUrl(encodedUrl);
    setEncodedUrls([...encodedUrls, encodedUrl]);

    // Clear input fields
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

  const columns = [
    {
      title: "商品链接",
      dataIndex: "productUrl",
      key: "productUrl",
      render: (text) => (
        <Input value={text} readOnly style={{ width: "100%" }} />
      ),
    },
    {
      title: "优惠券链接",
      dataIndex: "couponUrls",
      key: "couponUrls",
      render: (text, record) => (
        <div>
          {text.map((couponUrl, index) => (
            <div key={index} style={{ display: "flex" }}>
              <Input value={couponUrl} readOnly style={{ width: "100%" }} />
              <Button
                style={{ marginLeft: "8px" }}
                onClick={() => handleNavigate(couponUrl)}
              >
                跳转
              </Button>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "编码结果",
      dataIndex: "encodedUrl",
      key: "encodedUrl",
      render: (text) => (
        <div style={{ display: "flex" }}>
          <Input value={text} readOnly style={{ width: "100%" }} />
          <Button
            style={{ marginLeft: "8px" }}
            onClick={() => handleNavigate(text)}
          >
            跳转
          </Button>
        </div>
      ),
    },
  ];

  const data = encodedUrls.map((item, index) => ({
    key: index,
    productUrl: url,
    couponUrls: additionalUrls,
    encodedUrl: item,
  }));
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
          <Button htmlType="submit" type="primary">
            生成链接
          </Button>
        </Form.Item>
      </Form>
      {encodedUrls.length > 0 && (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
      )}
    </div>
  );
};

export default GenUrl;
