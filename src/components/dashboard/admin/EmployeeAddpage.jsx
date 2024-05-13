import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Spin, Card } from "antd";
import axios from "axios";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EmployeeAddPage = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [roles, setRoles] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    handleSubmit(values);
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      is_permanent: values.isPermanent,
    };
    delete payload.isPermanent;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const endpoint = `${process.env.REACT_APP_API_BASE_URL}/user/create`;

    try {
      // Send POST request to the API
      const response = await axios.post(endpoint, payload, config);

      // Handle the response
      console.log("User created successfully", response.data);
    } catch (error) {
      console.error(
        "Error creating the user",
        error.response ? error.response.data : error.message
      );
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const getAllRoles = async () => {
    setIsRoleLoading(true);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const endpoint = `${process.env.REACT_APP_API_BASE_URL}/role/without-pagination`;
      const response = await axios.get(endpoint, headers);

      if (response.status === 200) {
        setRoles(response.data.payload);
      }
    } catch (error) {
      console.log("Error while get roles", error);
    } finally {
      setIsRoleLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAllRoles();
    }
  }, [accessToken]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  const cardStyle = {
    width: "900px",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1%",
    height: "1000px auto",
    borderRadius: "20px",
    backgroundColor: "rgba(25, 135, 84, 0.25)",
    color: "white",
  };

  return (
    <Card style={cardStyle}>
      <h1 className="fs-2 mb-5" style={{ color: "white", marginTop: "35px" }}>
        New Employee Add
      </h1>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        validateMessages={validateMessages}
        style={{
          marginRight: "160px",
        }}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nic"
          label="NIC"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telNo"
          label="Telephone Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="isPermanent"
          label="Permanent Employee"
          valuePropName="checked"
        >
          <Select placeholder="Select if the employee is permanent">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select role">
            {isRoleLoading ? (
              <Option value="disabled" disabled>
                <Spin size="small" className="p-2" />
              </Option>
            ) : (
              roles?.map((role, key) => {
                return (
                  <Option key={key} value={role.id}>
                    {role.role}
                  </Option>
                );
              })
            )}
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EmployeeAddPage;
