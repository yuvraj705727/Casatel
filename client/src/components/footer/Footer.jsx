import { Layout, Row, Col } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ background: '#89375F', padding: '20px 0' }}>
      <Row justify="center" align="middle">
        <Col xs={24} sm={12} md={8} lg={5}>
          <h3>ABOUT US</h3>
          <p>
          We are a hotel booking website committed to providing the best service and experience to our customers.
          </p>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <h3>CONTACT US</h3>
          <p>
            Address: Bengaluru, Karnataka, India
            <br />
            Phone: +91 080 567890
            <br />
            Email: casatel@gmail.com
          </p>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <h3>FOLLOW US</h3>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '24px' }} />
            </a>
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        &copy; {new Date().getFullYear()} Casatel. All rights reserved.
      </div>
    </Footer>
  );
};

export default AppFooter;
