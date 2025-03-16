import React from "react";
import { Link } from "react-router-dom";

const SecondaryNavbar = () => {
  return (
    <>
      <div className="h-12">
        <Link to="/">
          <div className="h-12 w-12 flex items-center ">
            <img
              src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741847495/back_arrow_img_gsqsvs.png"
              className="h-10 w-10"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default SecondaryNavbar;
