import { Input, Button } from 'antd';
import './mailList.css';

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Book Your Room, Plant a Tree</h1>
      <span className="mailDescript">Sign up for the best deals and to go green</span>
      <div className="mailInput">
        <Input placeholder="Your Email" />
        <Button type="primary">Subscribe</Button>
      </div>
    </div>
  );
}

export default MailList;
