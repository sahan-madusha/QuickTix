import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { signIn } from "../../Api/index";
import { toast } from "react-toastify";
import { useAuthContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { LOGINSUCCESS } from "../../Constant";

const { Option } = Select;

export const AuthPage = () => {
  const [signInForm] = Form.useForm();
  const [regForm] = Form.useForm();
  const [isSignInBtnLoading, setIsSignInBtnLoading] = useState<boolean>(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleRegSubmit = async (values: any) => {
    if (values.password === values.repassword) {
      regForm.resetFields();
    } else {
      toast.warning("Passwords do not match");
    }
  };

  const handleSignInSubmit = async (values: any) => {
    setIsSignInBtnLoading(true);
    try {
      const response = await signIn(values);
      if (response?.token) {
        login(response?.token);
        navigate(`../${LOGINSUCCESS}`);
        
      }
      toast.success(response?.message);
    } finally {
      setIsSignInBtnLoading(false);
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
          <Form
            layout="vertical"
            className="w-full max-w-md"
            form={signInForm}
            onFinish={handleSignInSubmit}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
              className="my-2"
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
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
            <Form.Item className="mt-5">
              <Button
                type="primary"
                size="large"
                loading={isSignInBtnLoading}
                block
                htmlType="submit"
              >
                SignIn
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Registration Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 p-8">
        <h1 className="text-3xl mb-4 font-bold">Register on QuickTix.com</h1>
        <Form
          layout="vertical"
          className="w-full max-w-md"
          form={regForm}
          onFinish={handleRegSubmit}
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
          <Form.Item className="mt-5">
            <Button type="primary" size="large" block htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
