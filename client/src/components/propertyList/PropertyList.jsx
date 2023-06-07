import { Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useFetch from '../../hooks/useFetch';
import './propertyList.css'
const { Meta } = Card;

const PropertyList = () => {
  const { data, loading, error } = useFetch('http://localhost:8000/api/hotels/countByType');

  const images = [
    'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8SG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlsbGFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW5zfGVufDB8fDB8fHwy&auto=format&fit=crop&w=600&q=60',
  ];

  return (
    <div className="pList">
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin indicator={<LoadingOutlined />} tip="Loading, please wait..." />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {data &&
            images.map((img, i) => (
              <Card
                hoverable
                style={{ width: '220px', margin: '8px' }}
                key={i}
                cover={
                  <img
                    src={img}
                    alt=""
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Meta
                  title={data[i]?.type}
                  description={`${data[i]?.count} ${data[i]?.type}`}
                />
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;

