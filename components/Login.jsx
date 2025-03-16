import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import SecondaryNavbar from "./SecondaryNavbar";
import { db } from "../firebase.config.js";
import bcrypt from "bcryptjs";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import useStore from "../store.js";

const Login = () => {
  const { setIsLoggedIn , setUserEmail  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLogin, setIsLogin] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(0);
  const [showErrorMessage, setShowErrorMessage] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        setIsLoggedIn(true);
        navigate("/");
      }, 1000);
    }
  }, [isLogin]);

  return (
    <>
      <SecondaryNavbar />
      <hr className="border-blue-400" />
      <div className="flex items-center  flex-col justify-center h-100 ">
        <div className="text-3xl font-semibold " style={{ color: "#1976D2" }}>
          Login
        </div>
        <br />
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const userRef = doc(db, "users", data.email);
              const res = await getDoc(userRef);
              if (res.exists()) {
                if (await bcrypt.compare(data.password, res.data().password)) {
                  setMessage("success");
                  setShowSuccessMessage(1);
                  setTimeout(() => {
                    setShowSuccessMessage(0);
                    setMessage("");
                  }, 3000);
                  setIsLogin(true);
                  setUserEmail(data.email);
                } else {
                  setIsLogin(false);
                  setMessage("password mismatch");
                  setShowErrorMessage(1);
                  setTimeout(() => {
                    setShowErrorMessage(0);
                    setMessage("");
                  }, 3000);
                }
              } else {
                setIsLogin(false);
                setMessage("user not found");
                setShowErrorMessage(1);
                setTimeout(() => {
                  setShowErrorMessage(0);
                  setMessage("");
                }, 3000);
              }
            } catch (error) {}
            reset();
          })}
        >
          <input
            {...register("email", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="Email"
            style={{ color: "#1976D2" }}
            type="email"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}
          <br />
          {!errors.email && <br />}

          <input
            {...register("password", { required: true })}
            className="border-1 h-10 p-4 focus:outline-none border-blue-400"
            style={{ color: "#1976D2" }}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required.</p>
          )}
          {!errors.password && <br />}
          <br />
          <Button variant="contained" type="submit" className="w-full h-10 p-4">
            Login
          </Button>
          <br />
          <br />
          <Link to="/signup">
            <Button variant="outlined" className="w-full h-10 p-4">
              Signup
            </Button>
          </Link>
          <br />
          <br />
          {showSuccessMessage == 1 ? (
            <>
              <div className="h-10  w-full shadow-xl  flex justify-center items-center  bg-green-400 shadow-green-200">
                <p className="text-white">{message}</p>
              </div>
            </>
          ) : null}
          {showErrorMessage == 1 ? (
            <>
              <div className="h-10  w-full shadow-xl  flex justify-center items-center  bg-red-400 shadow-red-200">
                <p className="text-white">{message}</p>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Login;
