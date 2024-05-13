import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Employeelogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const endpoint = `${process.env.REACT_APP_API_BASE_URL}/auth/signin`;
      const response = await axios.post(endpoint, values);

      if (response.status === 200) {
        message.success("Successfully logged in.");
        console.log(response?.data);
        localStorage.setItem("accessToken", response?.data?.payload?.accessToken);

        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.payload?.user)
        );

        navigate("/dashboard");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Login failed:", errorInfo);
    message.error("Please correct the errors in the form.");
  };

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]);

  const cardStyle = {
    width: "600px",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    height: "370px",
    borderRadius: "20px",
    backgroundColor: "rgba(25, 135, 84, 0.25)",
    color: "white",
  };
  return (
    <Card style={cardStyle}>
      <div className="employee-login-container">
        <h1 className="fs-2 mb-5" style={{ color: "white", marginTop: "35px" }}>
          Employee Login
        </h1>
        <Form
          className="login-form"
          name="employee_login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            marginRight: "130px",
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox disabled={isLoading}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Employeelogin;
