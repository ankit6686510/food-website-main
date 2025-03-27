import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import LocationContext from "./utils/LocationContext";
import CityContext from "./utils/CityContext";
import ThemeContext from "./utils/ThemeContext";
import useTheme from "./utils/useTheme";
import ErrorBoundary from "./components/ErrorBoundary";
import SEO from "./components/SEO";
import Shimmer from "./components/Shimmer";
// import Grocery from "./components/Grocery";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  //Location Context ----------------------------
  const [location, setLocation] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
  });

  const [city, setCity] = useState("Delhi");

  // Theme Context -----------------------------
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position?.coords;
      console.log(latitude, longitude);
      setLocation({
        latitude: latitude,
        longitude: longitude,
      });
    };
    const errorCallback = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  //----------------------------

  return (
    <Provider store={appStore}>
      <ErrorBoundary>
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
          <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <SEO 
              title="Zaika - Food Delivery Platform"
              description="Order food online from restaurants and get it delivered. Serving in major cities across India."
              keywords="food delivery, online food, restaurant, zaika"
            />
            <LocationContext.Provider
              value={{ location: location, setLocation: setLocation }}
            >
              <CityContext.Provider value={{ city: city, setCity: setCity }}>
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={30}
                  containerClassName="notification-container"
                  toastOptions={{
                    className: "notification-toast",
                    duration: 1500,
                  }}
                />
                <Header />
                <Outlet />
                <Footer />
              </CityContext.Provider>
            </LocationContext.Provider>
          </div>
        </ThemeContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

// Improved suspense fallback with our shimmer UI
const SuspenseFallback = () => (
  <div className="suspense-container">
    <Shimmer />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
