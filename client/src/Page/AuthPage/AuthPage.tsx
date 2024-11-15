import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

export const AuthPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (values.password === values.repassword) {
      console.log("Form Data Submitted: ", values);
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh]">
      {/* Login Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 p-8">
        <h1 className="text-3xl mb-4 font-bold">Welcome Back!</h1>
        <p className="mb-6 text-md text-center">
          Sign in to QuickTix.com to book amazing experiences or manage your
          ticket sales and explore new opportunities.
        </p>
        <div className="w-full max-w-sm">
          <Input placeholder="Username" className="mb-4 p-2" size="large" />
          <Input.Password
            placeholder="Password"
            className="mb-6 p-2"
            size="large"
          />
          <Button
            type="primary"
            size="large"
            className="w-full"
            onClick={() => {}}
          >
            Login
          </Button>
        </div>
      </div>

      {/* Registration Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 p-8">
        <h1 className="text-3xl mb-4 font-bold">Register on QuickTix.com</h1>
        <Form
          layout="vertical"
          className="w-full max-w-md"
          form={form}
          onFinish={handleSubmit}
        >
          <div className="flex justify-between gap-0 w-full">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
              className="my-1 w-1/2"
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="my-1 w-1/2"
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
          </div>
          <div className="flex justify-between gap-0 w-full">
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
              className="my-1 w-1/2"
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
              className="my-1 w-1/2"
            >
              <Select placeholder="Select a role">
                <Option value="vendor">Vendor</Option>
                <Option value="customer">Customer</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
            className="my-1"
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="Re-Password"
            name="repassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please re-enter your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
            className="my-1"
          >
            <Input.Password placeholder="Re-Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" block htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
