import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Row, Col, Typography, Divider } from 'antd';
import { AlignCenterOutlined, GoogleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './registration.css';


const { Title } = Typography;

const RegistrationPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/auth/register", values);
      console.log(response.data);
      navigate("/");
      alert("Registration Successful!");
    } catch(err) {
      if (err.response.status === 400) {
        setErrorMessage("User already exists!");
      }
      console.log(err.response.data);
    }
  };

  const google = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="registration-container">
      <Title level={2} className="registration-title">Choose a Registration Method</Title>
      <Row gutter={24}>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}}>
          <div className="google-registration" onClick={google}>
            <GoogleOutlined />
            Google
          </div>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 24}}>
          <Divider className="registration-divider" plain><Title level={4}>OR</Title></Divider>
          <Form form={form} onFinish={handleFinish} className="registration-form">
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
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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
              <div className="registration-error-message">
                <p>
                  <Title level={4} className="registration-error-message-title">{errorMessage}</Title>
                </p>
              </div>
            }
            <Form.Item>
              <Button className="registration-submit-button" type="primary" htmlType="submit">Register</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div className="registration-redirect">
        <span>Already Registered?</span>
        <Link className="registration-sign-in" to={"/login"}>Sign In</Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
