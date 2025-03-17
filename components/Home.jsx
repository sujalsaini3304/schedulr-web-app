import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Tables from "../components/Tables.jsx";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import useStore from "../store.js";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const navigate = useNavigate();
  const [banner_number, setBanner_number] = useState(0);

  const bannerArray = [
    "https://res.cloudinary.com/dep5qlowr/image/upload/v1742192018/banner1_yt6zwj.svg",
    "https://res.cloudinary.com/dep5qlowr/image/upload/v1742192250/banner2_d9srxz.svg",
    "https://res.cloudinary.com/dep5qlowr/image/upload/v1742192250/banner3_b0qyxg.svg",
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      if (banner_number == bannerArray.length - 1) {
        setBanner_number(0);
      }
      if (banner_number != 2) setBanner_number(banner_number + 1);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [banner_number]);

  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isLoggedIn,
    setIsLoggedIn,
    setIsModifyButtonPressedManually,
  } = useStore();
  return (
    <>
      <div className=" ml-2 mr-2 h-screen mb-10 ">
        <Navbar />
        <hr className="border-blue-400" />
        <div className=" relative ">
          <div
            className={`absolute z-1  h-screen w-48 right-0 mt-0 bg-white border-l-1 border-blue-400 ${
              isSidebarOpen ? null : "hidden"
            }`}
          >
            <div className="flex flex-col gap-4 p-2 ">
              {isLoggedIn ? (
                <>
                  <Button
                    sx={{ textDecoration: "none" }}
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsSidebarOpen(false);
                      setIsModifyButtonPressedManually(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ textDecoration: "none" }}
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      navigate("/login");
                      setIsSidebarOpen(false);
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      navigate("/signup");
                      setIsSidebarOpen(false);
                    }}
                  >
                    Signup
                  </Button>
                </>
              )}

              {isLoggedIn ? (
                <>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                  >
                    Profile
                  </Button>
                </>
              ) : null}
              {isLoggedIn ? (
                <>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      navigate("/schedule/create");
                      setIsSidebarOpen(false);
                      setIsModifyButtonPressedManually(false);
                    }}
                  >
                    Add schedule
                  </Button>
                </>
              ) : null}
            </div>
          </div>

          {!isLoggedIn ? (
            <>
              <div
                className="h-8  flex items-center text-thin mt-2 mb-2 font-bold"
                style={{ color: "#1976D2" }}
              >
                <marquee>{`${"Note - Please contact developer for more info.".toUpperCase()}`}</marquee>
              </div>
              <div className=" rounded-b-xl bg-blue-100 h-130 sm:h-160 relative md:h-160  ">
                <img
                  src={bannerArray[banner_number]}
                  className=" h-60   sm:h-80  w-full  pt-2 "
                />

                <div className="">
                  <div
                    className="flex justify-center sm:text-3xl text-2xl text-balance font-bold h-18 sm:h-22 items-center pt-8   "
                    style={{ color: "#1976D2" }}
                  >
                    <span>
                      <Typewriter
                        words={[
                          '"Plan it. Do it. Done ✅."',
                          '"Turn plans into action 🚀."',
                          '"Your time, perfectly planned 😊."',
                        ]}
                        loop={false}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        // onLoopDone={handleDone}
                        // onType={handleType}
                      />
                    </span>
                  </div>
                  <div className="flex justify-center mt-16 sm:mt-16   items-center">
                    <div
                      onClick={() => {
                        navigate("/login");
                      }}
                      className=" cursor-pointer h-14 text-xl  justify-center flex items-center max-w-60 sm:max-w-80  w-full rounded-full border-blue-400 font-thin text-white bg-blue-400 shadow-xl shadow-blue-300"
                    >
                      <span>Get Started 🚀</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-center mt-4 text-2xl font-bold"
                style={{ color: "#4199E8" }}
              >
                <span>Technology used</span>
              </div>
              <div className="flex  gap-10 mt-6 overflow-x-auto justify-center ">
                <div className="flex gap-8 flex-wrap ">
                  <div className=" shadow-xl shadow-blue-300 gap-8 rounded-xl  md:flex-row h-60 grow min-w-80   flex justify-center items-center ">
                    <img
                      src="https://res.cloudinary.com/dep5qlowr/image/upload/v1742192250/firebase_ryvhfy.svg"
                      className="h-24"
                    />
                    <span
                      className="text-xl font-bold sm:text-3xl"
                      style={{ color: "#4199E8" }}
                    >
                      Firebase
                    </span>
                  </div>
                  <div className=" shadow-xl shadow-blue-300 gap-8 rounded-xl  md:flex-row h-60 grow  min-w-80  flex justify-center items-center ">
                    <img
                      src="https://res.cloudinary.com/dep5qlowr/image/upload/v1742192252/react_irxgps.svg"
                      className="h-24"
                    />
                    <span
                      className="text-xl font-bold sm:text-3xl "
                      style={{ color: "#4199E8" }}
                    >
                      React
                    </span>
                  </div>
                  <div className=" shadow-xl shadow-blue-300 mb-4 gap-8 rounded-xl  md:flex-row h-60 grow min-w-80  flex justify-center items-center ">
                    <img
                      src="https://res.cloudinary.com/dep5qlowr/image/upload/v1742192251/vite_z1vpdw.svg"
                      className="h-24"
                    />
                    <span
                      className="text-xl font-bold sm:text-3xl"
                      style={{ color: "#4199E8" }}
                    >
                      Vite
                    </span>
                  </div>
                </div>
              </div>
              <div className=" mt-12 gap-2 text-center flex items-end justify-center">
                <img
                  src="https://res.cloudinary.com/dep5qlowr/image/upload/v1742192250/heart_wt2h1l.png"
                  className="h-6"
                />{" "}
                <span>Made with love.</span>
              </div>
              <div className="h-10 text-center flex items-end justify-center pb-4">
                <span className="text-base">
                  © This is subjected to copyright 2025 - 2027.
                </span>
              </div>
            </>
          ) : (
            <>
              <br />
              <Tables />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
