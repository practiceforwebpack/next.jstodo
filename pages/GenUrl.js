import { useState } from "react";
import { Input, Form, Button, message, Table } from "antd";

const GenUrl = () => {
  const [url, setUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [additionalUrls, setAdditionalUrls] = useState([]);
  const [encodedUrls, setEncodedUrls] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleNavigate = (url) => {
    window.location.href = url;
  };

  const handleSubmit = (values) => {
    let submitUrl = values.url;
    if (submitUrl && !submitUrl.startsWith("https://")) {
      submitUrl = "https://" + submitUrl;
    }

    let encodedAdditionalUrls = "";
    const modifiedAdditionalUrls = additionalUrls.map((additionalUrl) => {
      if (additionalUrl && !additionalUrl.startsWith("https://")) {
        return "https://" + additionalUrl;
      }
      return additionalUrl;
    });

    if (modifiedAdditionalUrls.length > 0) {
      encodedAdditionalUrls = modifiedAdditionalUrls
        .map((additionalUrl) => encodeURIComponent(additionalUrl))
        .join(",");
      encodedAdditionalUrls = `&yh=${encodedAdditionalUrls}`;
    }

    const encodedUrl = `https://previewlink.chentaotie.com/?url=${encodeURIComponent(
      submitUrl
    )}${encodedAdditionalUrls}`;

    setUrl([""]);
    setAdditionalUrls([]);
    setEncodedUrl(encodedUrl);
    setEncodedUrls([...encodedUrls, encodedUrl]);

    const newTableData = [
      ...tableData,
      {
        key: encodedUrl,
        productUrl: submitUrl,
        couponUrls: modifiedAdditionalUrls,
        encodedUrl: encodedUrl,
      },
    ];
    setTableData(newTableData);

    message.success("成功生成链接！");
  };

  const handleFailedSubmit = () => {
    message.error("生成链接失败，请检查您的输入！");
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
  };

  const handleAdditionalUrl = (index, e) => {
    const value = e.target.value;
    const newUrls = [...additionalUrls];
    newUrls[index] = value;
    setAdditionalUrls(newUrls);
  };
  const columns = [
    {
      title: "商品链接",
      dataIndex: "productUrl",
      key: "productUrl",
      render: (text) => text || "——",
    },
    {
      title: "优惠券链接",
      dataIndex: "couponUrls",
      key: "couponUrls",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {text.length > 0
            ? text.map((couponUrl, index) => <div key={index}>{couponUrl}</div>)
            : "——"}
        </div>
      ),
    },
    {
      title: "编码结果",
      dataIndex: "encodedUrl",
      key: "encodedUrl",
      render: (text) => text || "——",
    },
    {
      title: "操作",
      key: "actions",
      render: (text, record) => (
        <a
          style={{ marginLeft: "8px" }}
          onClick={() => handleNavigate(record.encodedUrl)}
        >
          跳转
        </a>
      ),
    },
  ];

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
          rules={[{ required: true, message: "请输入商品链接！" }]}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Input
            placeholder="请输入商品链接"
            onChange={handleUrlChange}
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
                      onChange={(e) => handleAdditionalUrl(index, e)}
                      style={{ marginRight: "10px" }}
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
              <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <Button type="primary" htmlType="submit">
                  生成链接
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>

      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default GenUrl;
