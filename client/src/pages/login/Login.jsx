import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Form, Input, Button, Divider,  Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import "./login.css";

const { Title } = Typography;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/auth/login", values, { withCredentials: true });
      if (response.status === 200) {
        // Redirect user to home page after successful login
        const result = await axios.get(process.env.REACT_APP_API_URL + "/users/getUser", { withCredentials: true });
        const user = result.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (err) {
      // Set error message if login fails
      if (err.response && err.response.status === 401) {
        setErrorMessage("Incorrect username or password");
      } else {
        setErrorMessage("User Not found!");
      }
    }
  };

  const google = async () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="login-container">
      <Title level={2} className="login-title">Choose a Login Method</Title>
      <Row gutter={24}>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}}>
          <div className="google-login" onClick={google}>
            <GoogleOutlined />
            Google
          </div>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 24}}>
          <Divider className="login-divider" plain><Title level={4}>OR</Title></Divider>
          <Form form={form} onFinish={handleFinish} className="login-form">
          <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            {errorMessage && 
              <div className="login-error-message">
                <p>
                  <Title level={4} className="login-error-message-title">{errorMessage}</Title>
                </p>
              </div>
            }
            <Form.Item>
              <Button className="login-submit-button" type="primary" htmlType="submit">Log-In</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div className="login-redirect">
        <span>Have not Registered Yet?</span>
        <Link className="login-sign-in" to={"/registration"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
