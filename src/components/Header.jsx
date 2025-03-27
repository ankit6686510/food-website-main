import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LocationContext from "../utils/LocationContext";
import CityContext from "../utils/CityContext";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [showNavItems, setShowNavItems] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onlineStatus = useOnlineStatus();
  const [nearMe, setNearMe] = useState(false);
  const { setLocation } = useContext(LocationContext);
  const { city } = useContext(CityContext);
  const location = useLocation();

  const cartItems = useSelector((store) => store.cart.items);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setShowNavItems(false);
  }, [location]);

  const handleLocationNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position?.coords;
      setLocation({
        latitude: latitude,
        longitude: longitude,
      });
      setNearMe(true);
    });
  };

  const handleLocationDefault = () => {
    setLocation({
      latitude: 28.6139,
      longitude: 77.2090,
    });
    setNearMe(false);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  // Check if route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="logo-container">
          <Link to={"/"} className="logo-link">
            <img
              alt="Zaika logo"
              className="logo"
              src={require("../../logos/logo.png")}
            />
            <span className="logo-text">Zaika</span>
          </Link>
          <div className="location-container">
            {nearMe ? (
              <button 
                className="location-btn"
                onClick={() => {
                  handleLocationDefault();
                  toast.success(`Switched to Default Location: Delhi`);
                }}
              >
                <i className="fa-solid fa-location-dot location-icon"></i>
                <span>Switch to Default Location</span>
              </button>
            ) : (
              <button 
                className="location-btn"
                onClick={() => {
                  handleLocationNearMe();
                  toast.success(`Switched to Nearby Location`);
                }}
              >
                <i className="fa-solid fa-location-crosshairs location-icon"></i>
                <span>Locate Me</span>
              </button>
            )}
            <p className="city-display">{city}</p>
          </div>
        </div>

        <nav className="nav-items">
          <div className="menu-toggle" onClick={toggleNavItems} aria-label="Toggle menu">
            <i className={`fa-solid ${showNavItems ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
          
          <ul className={`nav-list ${showNavItems ? 'show' : ''}`}>
            <li className={isActiveRoute('/') ? 'active' : ''}>
              <Link className="nav-link" to={"/"}>
                <i className="fa-solid fa-house nav-icon"></i>
                <span>Home</span>
              </Link>
            </li>
            
            <li className={isActiveRoute('/about') ? 'active' : ''}>
              <Link className="nav-link" to={"/about"}>
                <i className="fa-solid fa-circle-info nav-icon"></i>
                <span>About</span>
              </Link>
            </li>
            
            <li className={isActiveRoute('/cart') ? 'active' : ''}>
              <Link className="nav-link cart-link" to={"/cart"}>
                <div className="cart-icon-container">
                  <i className="fa-solid fa-cart-shopping nav-icon"></i>
                  {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
                </div>
                <span>Cart</span>
              </Link>
            </li>

            <li className="online-status" title={onlineStatus ? "You are online" : "You are offline"}>
              <i className={`fa-solid fa-wifi ${onlineStatus ? 'online' : 'offline'}`}></i>
            </li>
            
            <li className="login-item">
              <button
                className="login-btn"
                onClick={() => {
                  if (btnName === "Login") {
                    setBtnName("Logout");
                    toast.success("User Logged In");
                  } else {
                    setBtnName("Login");
                    toast.success("User Logged Out");
                  }
                }}
              >
                <i className={`fa-solid ${btnName === "Login" ? "fa-user" : "fa-sign-out-alt"} nav-icon`}></i>
                <span>{btnName}</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="header-spacer"></div>
    </>
  );
};

export default Header;
