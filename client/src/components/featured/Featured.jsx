import { Card, Skeleton } from 'antd';
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/api/hotels/countByCity?cities=Mumbai,Hyderabad,Kerala,Bengaluru");

  return (
    <div className="featured">
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Card className="featuredItem" cover={<img src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVtYmFpfGVufDB8fDB8fHwy&auto=format&fit=crop&w=600&q=60" alt="" className="featuredImg" />}>
            <div className="featuredTitles">
              <h1>MUMBAI</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </Card>

          <Card className="featuredItem" cover={<img src="https://images.unsplash.com/photo-1580976428730-292cd3a4b663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGh5ZGVyYWJhZHxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" className="featuredImg" />}>
            <div className="featuredTitles">
              <h1>HYDERABAD</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </Card>

          <Card className="featuredItem" cover={<img src="https://images.unsplash.com/photo-1593693401060-9fc28cf9e368?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGtlcmFsYXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" className="featuredImg" />}>
            <div className="featuredTitles">
              <h1>KERALA</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Featured;
