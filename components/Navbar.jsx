import React from "react";
import useStore from "../store.js";

const Navbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useStore();
  return (
    <>
      <div className="h-12 w-full flex items-center  justify-between">
        <div className="text-2xl font-semibold" style={{ color: "#1976D2" }}>
          Schedulr2.0
        </div>
        <div
          className="h-12 w-12 items-center flex justify-end"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <img
            className="h-10 w-10 cursor-pointer"
            src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741849703/hamburger-menu_fcx2z5.png"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
