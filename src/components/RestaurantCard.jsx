import { CDN_URL } from "../utils/constants";
import { COVID_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    aggregatedDiscountInfoV3,
    cuisines,
    costForTwo,
    sla,
  } = resData?.info;

  // Format cuisines list for better screen reader output
  const cuisinesList = cuisines.join(", ");
  
  // Calculate discount message
  const discountMessage = aggregatedDiscountInfoV3?.header
    ? `${aggregatedDiscountInfoV3.header}${
        aggregatedDiscountInfoV3.subHeader
          ? ` ${aggregatedDiscountInfoV3.subHeader}`
          : ""
      }`
    : "Flat Rs. 49 OFF";

  return (
    <div className="Food-item" tabIndex="0" role="article" aria-label={`Restaurant ${name}, Rating ${avgRating}, ${cuisinesList}, ${costForTwo}, Delivery in ${sla.deliveryTime} minutes`}>
      <div className="Food-item-margin">
        <div className="Food-item-link">
          <div className="card-img">
            <img 
              src={CDN_URL + cloudinaryImageId} 
              alt={`${name} restaurant`} 
              loading="lazy"
            />
          </div>
          <div className="off" aria-label={`Offer: ${discountMessage}`}>
            <p>{discountMessage}</p>
          </div>
        </div>
        <div className="Food-item-link">
          <div className="pname">
            <h4>{name}</h4>

            <div className="rating" aria-label={`Rating ${avgRating} out of 5`}>
              <p>{avgRating} </p>
              <i className="fa-solid fa-star" style={{ color: "#ffffff" }} aria-hidden="true" />
            </div>
          </div>
          <div className="Category">
            <p className="p1">{cuisinesList}</p>
            <p className="p2">{costForTwo}</p>
          </div>
          <div className="time" aria-label={`Delivery time: ${sla.deliveryTime} minutes`}>
            <p>{sla.deliveryTime} min</p>
          </div>
          <div className="line"></div>
          <div className="covid">
            <div className="covid-img">
              <img src={COVID_URL} alt="COVID safety badge" />
            </div>
            <p>Follows all Max Safety measures to ensure your food is safe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
