import React from "react";
import Navbar from "../components/Navbar.jsx";
import Tables from "../components/Tables.jsx";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import useStore from "../store.js";

const Home = () => {
  const navigate = useNavigate();
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
            className={`absolute   h-screen w-48 right-0 mt-0 bg-white border-l-1 border-blue-400 ${
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
          {/* content */}
          {/* <div className="pt-4 flex overflow-x-auto gap-12 ">
            <div
              className="border pl-10 pr-10 pt-2 pb-2 shadow-sm"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Monday
            </div>
            <div
              className="border pl-10 pr-10 pt-2 pb-2 shadow-sm"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Tuesday
            </div>
            <div
              className="border pl-10 pr-10 pt-2 pb-2 shadow-sm"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Wednesday
            </div>
            <div
              className="border pl-10 pr-10 pt-2 pb-2 shadow-sm"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Thrusday
            </div>
            <div
              className="border pl-10 pr-10 pt-2 pb-2 shadow-sm"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Friday
            </div>
            <div
              className="border pl-10 pr-10 pt-2 pb-2 shadow-sm"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Saturday
            </div>
          </div> */}
          <br />
          <Tables />
        </div>
      </div>
    </>
  );
};

export default Home;
