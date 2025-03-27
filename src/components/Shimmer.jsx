import React, { useState, useEffect } from "react";
import { CDN_URL } from "../utils/constants";

const ShimmerCard = ({ key }) => {
  return (
    <div key={key} className="shimmer-item" aria-label="Loading content" role="status">
      <div className="shimmer-img shimmer-animate"></div>
      <div className="shimmer-details">
        <div className="shimmer-title shimmer-animate"></div>
        <div className="shimmer-rating shimmer-animate"></div>
        <div className="shimmer-category shimmer-animate"></div>
        <div className="shimmer-cost shimmer-animate"></div>
        <div className="shimmer-time shimmer-animate"></div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  const [shimmerCount, setShimmerCount] = useState(10);
  
  // Adjust number of shimmer items based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setShimmerCount(20);
      } else if (width > 768) {
        setShimmerCount(10);
      } else {
        setShimmerCount(6);
      }
    };
    
    // Set initial count
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate shimmer cards
  const shimmerItems = Array.from({ length: shimmerCount }, (_, index) => index + 1);

  return (
    <div className="Food-menu" aria-label="Loading restaurants" role="status">
      <div className="Food-card">
        {shimmerItems.map((item) => (
          <ShimmerCard key={item} />
        ))}
      </div>
    </div>
  );
};

export const ResMenuShimmer = () => {
  return (
    <div aria-label="Loading restaurant menu" role="status">
      <div className="menu-conatiner">
        <div className="menu-header shimmer-menu-header">
          <div className="menu">
            <div className="shimmer-animate"></div>
            <div className="shimmer-animate"></div>
            <div className="shimmer-animate"></div>
            <br />
            <div className="shimmer-animate"></div>
            <div className="shimmer-animate"></div>
          </div>
          <div className="rating">
            <div className="shimmer-rating-box shimmer-animate"></div>
          </div>
        </div>
        <div className="menu-info">
          <div className="shimmer-menu-animate shimmer-menu-info shimmer-animate"></div>
        </div>
        <div className="menu-price">
          <div className="shimmer-menu-animate shimmer-menu-price shimmer-animate"></div>
        </div>
        <div className="menu-border"></div>
        <div className="category-conatiner">
          <div className="category-header">
            <div className="shimmer-menu-animate shimmer-category-header shimmer-animate"></div>
          </div>
          {Array(8)
            .fill("")
            .map((item, i) => {
              return (
                <div className="item-container" key={"res-menu-list" + i}>
                  <div className="item-info shimmer-item-info">
                    <div className="shimmer-menu-animate shimmer-animate"></div>
                    <div className="shimmer-menu-animate shimmer-animate"></div>
                    <div className="shimmer-menu-animate shimmer-animate"></div>
                    <span className="shimmer-menu-animate shimmer-animate"></span>
                  </div>
                  <div className="item-img">
                    <div className="shimmer-menu-animate shimmer-item-img shimmer-animate"></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
