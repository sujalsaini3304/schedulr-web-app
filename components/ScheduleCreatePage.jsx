import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import SecondaryNavbar from "./SecondaryNavbar";
import { db } from "../firebase.config.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

import useStore from "../store.js";

const ScheduleCreatePage = () => {
  const { userEmail } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(0);
  const [showErrorMessage, setShowErrorMessage] = React.useState(0);
  const [message, setMessage] = React.useState("");

  return (
    <>
      <SecondaryNavbar />
      <hr className="border-blue-400" />
      <div className="flex items-center  flex-col justify-start h-screen ">
        <div
          className="text-3xl font-semibold mt-2"
          style={{ color: "#1976D2" }}
        >
          Create Schedule
        </div>
        <br />
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              if (userEmail === "") throw new Error("login needed");
              await addDoc(collection(db, userEmail), {
                day: data.day.toLowerCase(),
                from: data.from,
                to: data.to,
                period: data.period,
                subject: data.subject.toLowerCase(),
                branch: data.branch.toLowerCase(),
                section: data.section.toLowerCase(),
                semester: data.semester,
              });
              setMessage("success");
              setShowSuccessMessage(1);
              setTimeout(() => {
                setShowSuccessMessage(0);
                setMessage("");
              }, 3000);
            } catch (error) {
              setMessage("schedule not created");
              setShowErrorMessage(1);
              setTimeout(() => {
                setShowErrorMessage(0);
                setMessage("");
              }, 3000);
            }
            reset();
          })}
        >
          <input
            {...register("day", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="Day"
            style={{ color: "#1976D2" }}
          />
          {errors.day && <p className="text-red-500">Day is required.</p>}
          <br />
          {!errors.day && <br />}

          <input
            {...register("from", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="From"
            style={{ color: "#1976D2" }}
            type="text"
          />
          {errors.from && (
            <p className="text-red-500">From time is required.</p>
          )}
          <br />
          {!errors.from && <br />}

          <input
            {...register("to", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="To"
            style={{ color: "#1976D2" }}
            type="text"
          />
          {errors.to && <p className="text-red-500">To time is required.</p>}
          <br />
          {!errors.to && <br />}

          <input
            {...register("period", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="Period"
            style={{ color: "#1976D2" }}
          />
          {errors.period && <p className="text-red-500">Period is required.</p>}
          <br />
          {!errors.period && <br />}

          <input
            {...register("subject", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="Subject"
            style={{ color: "#1976D2" }}
          />
          {errors.subject && (
            <p className="text-red-500">Subject is required.</p>
          )}
          <br />
          {!errors.subject && <br />}

          <input
            {...register("section", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="Section"
            style={{ color: "#1976D2" }}
          />
          {errors.section && (
            <p className="text-red-500">Section is required.</p>
          )}
          <br />
          {!errors.section && <br />}

          <input
            {...register("branch", { required: true })}
            className="border-1 h-10 p-4 border-blue-400 focus:outline-none border-blue-400"
            placeholder="Branch"
            style={{ color: "#1976D2" }}
          />
          {errors.branch && <p className="text-red-500">Branch is required.</p>}
          <br />
          {!errors.branch && <br />}

          <input
            {...register("semester", { required: true })}
            className="border-1 h-10 p-4 focus:outline-none border-blue-400"
            style={{ color: "#1976D2" }}
            placeholder="Semester"
          />
          {errors.semester && (
            <p className="text-red-500">Semester is required.</p>
          )}
          {!errors.semester && <br />}
          <br />
          <Button variant="contained" type="submit" className="w-full h-10 p-4">
            create
          </Button>
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

export default ScheduleCreatePage;
