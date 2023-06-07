import { Link } from "react-router-dom";
import "./searchItem.css";
import { Button } from "antd";

const SearchItem = ({item}) => {
  
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}km from the city center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <Button>{item.rating}</Button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">Rs.{item.cheapestPrice}/-</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <Button type="primary" className="siCheckButton">
See availability
</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;