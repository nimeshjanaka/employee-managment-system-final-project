import React, { useEffect, useState } from "react";
import { Card, Form, DatePicker, Select, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Employees } from "../../../assets/Index";

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

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const Apply = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees: ", error);
    }
  };

  const onFinish = async (fieldsValue) => {
    // Extracting and formatting date values from the form
    const values = {
      ...fieldsValue,
      start_date_picker: fieldsValue["start_date_picker"]?.format("YYYY-MM-DD"),
      end_date_picker: fieldsValue["end_date_picker"]?.format("YYYY-MM-DD"),
    };
    console.log("Received values of form: ", values);

    let data = JSON.stringify({
      fromDate: values.start_date_picker,
      toDate: values.end_date_picker,
      reason: values.reason,
      SuggestedCoworkerId: values.assignee,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/leave-request`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("fetchTodayEmployees : ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    width: "750px",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1%",
    height: "auto",
    borderRadius: "20px",
    backgroundColor: "rgba(25, 135, 84, 0.25)",
    color: "white",
    padding: "20px",
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  return (
    <div>
      <h1 className="fs-2 mb-5" style={{ textAlign: "center" }}>
        Apply Leave
      </h1>
      <Card style={cardStyle}>
        <Form
          name="time_related_controls"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          // style={{
          //   marginRight: "160px",
          // }}
        >
          <Form.Item
            name="select-leave"
            label="Select leave type"
            rules={[{ required: true, message: "Please select a leave type!" }]}
          >
            <Select placeholder="Please select leave type">
              <Option value="casual leave">Casual leave</Option>
              <Option value="annual leave">Annual Leave</Option>
              <Option value="sick leave">Sick leave</Option>
            </Select>
          </Form.Item>

          <Form.Item name="start_date_picker" label="Start Date" {...config}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="end_date_picker" label="End Date" {...config}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please input your reason!" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            name="assignee"
            label="Assign employee name"
            rules={[
              { required: true, message: "Please input an assignee name!" },
            ]}
          >
            <Select placeholder="Select an employee">
              {Employees.map((employee) => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Apply;
