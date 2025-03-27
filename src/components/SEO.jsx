import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title || "Zaika - Food Delivery Platform"}</title>
      <meta 
        name="description" 
        content={description || "Zaika is a dynamic food delivery website created with the Swiggy API. Order delicious food from restaurants near you."} 
      />
      <meta 
        name="keywords" 
        content={keywords || "food delivery, online food, order food, restaurants, Zaika, food app"} 
      />
      <meta property="og:title" content={title || "Zaika - Food Delivery Platform"} />
      <meta property="og:description" content={description || "Zaika is a dynamic food delivery website created with the Swiggy API. Order delicious food from restaurants near you."} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Zaika" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Zaika - Food Delivery Platform"} />
      <meta name="twitter:description" content={description || "Zaika is a dynamic food delivery website created with the Swiggy API. Order delicious food from restaurants near you."} />
    </Helmet>
  );
};

export default SEO; 