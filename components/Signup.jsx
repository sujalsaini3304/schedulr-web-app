import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { db } from "../firebase.config.js";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs"
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
import SecondaryNavbar from "./SecondaryNavbar.jsx";

const signup = () => {
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(0);
  const [showErrorMessage, setShowErrorMessage] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <SecondaryNavbar />
      <hr className="border-blue-400" />
      <div className="flex items-center  flex-col justify-center h-160 ">
        <div
          className="text-3xl font-semibold text-blue-400"
          style={{ color: "#1976D2" }}
        >
          Signup
        </div>
        <br />
        <form
          onSubmit={handleSubmit(async (data) => {
            // console.log(data);
            try {
              const userRef = doc(db, "users", data.email);
              const res = await getDoc(userRef);
              if (res.exists()) {
                // console.log("User exist in firebase");
                setMessage("email already linked");
                setShowErrorMessage(1);
                setTimeout(() => {
                  setShowErrorMessage(0);
                  setMessage("");
                }, 3000);
              } else {
                let key = await bcrypt.hash(data.password , 10);
                await setDoc(doc(db, "users", `${data.email}`), {
                  username: data.username,
                  password: key,
                  email: data.email,
                  createdAt: new Date(),
                });
                // console.log("User added in firebase");
                setMessage("success");
                setShowSuccessMessage(1);
                setTimeout(() => {
                  setShowSuccessMessage(0);
                  setMessage("");
                }, 3000);
              }
            } catch (error) {
              console.error("Error adding document: ", error);
            }
            reset();
          })}
        >
          <input
            {...register("username", { required: true })}
            className="border-1 h-10 p-4 focus:outline-none border-blue-400"
            placeholder="Username"
            style={{ color: "#1976D2" }}
          />
          {errors.username && (
            <p className="text-red-500">Username is required.</p>
          )}
          <br />
          {!errors.username && <br />}
          <input
            {...register("email", { required: true })}
            className="border h-10 p-4 focus:outline-none border-blue-400"
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
            placeholder="Password"
            type="password"
            style={{ color: "#1976D2" }}
          />
          {errors.password && (
            <p className="text-red-500">Password is required.</p>
          )}
          {!errors.password && <br />}
          <br />
          <input
            {...register("confirmPassword", { required: true })}
            className="border-1 h-10 p-4 focus:outline-none border-blue-400"
            placeholder="Confirm Password"
            type="password"
            style={{ color: "#1976D2" }}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">Password validation is required.</p>
          )}
          {!errors.confirmPassword && <br />}
          <br />
          <Button variant="contained" type="submit" className="w-full h-10 p-4">
            Signup
          </Button>
          <br />
          <br />
          <Link to="/login">
            <Button variant="outlined" className="w-full h-10 p-4">
              Login
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

export default signup;
