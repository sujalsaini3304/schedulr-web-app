import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import SecondaryNavbar from "./SecondaryNavbar";
import { db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useStore from "../store";
import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { userEmail } = useStore();
  const { state } = useLocation();
  const { docId } = state || {};

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Form state
  const [formValues, setFormValues] = useState({
    day: "",
    to: "",
    from: "",
    period: "",
    subject: "",
    section: "",
    branch: "",
    semester: "",
  });

  useEffect(() => {
    const fetchDocument = async () => {
      if (userEmail && docId) {
        const docSnap = await getDoc(doc(db, userEmail, docId));
        if (docSnap.exists()) {
          const docData = docSnap.data();
          setData(docData);
          setFormValues(docData);
        }
      }
    };
    fetchDocument();
  }, [userEmail, docId]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async (formData) => {
    try {
      if (!userEmail) throw new Error("Login needed");
      await setDoc(doc(db, userEmail, docId), {
        ...formData,
        day: formData.day.toLowerCase(),
        subject: formData.subject.toLowerCase(),
        branch: formData.branch.toLowerCase(),
        section: formData.section.toLowerCase(),
      });
      setMessage("Success");
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage("Not saved");
      setShowErrorMessage(true);
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      setMessage("");
    }, 3000);
    reset();
  };

  return (
    <>
      <SecondaryNavbar />
      <hr className="border-blue-400" />
      {data && (
        <div className="flex items-center flex-col justify-start h-screen">
          <h2 className="text-3xl font-semibold mt-2 text-blue-400">
            Edit Schedule
          </h2>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md">
            {Object.keys(formValues).map((key) => (
              <>
                <div style={{ color: "#1976D2" }}>{`${
                  key.charAt(0).toUpperCase() + key.slice(1)
                }`}</div>
                <div key={key} className="mb-4">
                  <input
                    {...register(key, { required: true })}
                    className="border border-blue-400 h-10 p-4  focus:outline-none"
                    // placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={formValues[key]}
                    onChange={handleChange}
                    style={{ color: "#1976D2" }}
                  />
                  {errors[key] && (
                    <p className="text-red-500">{key} is required.</p>
                  )}
                </div>
              </>
            ))}

            <Button
              variant="contained"
              type="submit"
              className="w-full h-10 p-4 "
            >
              Save
            </Button>
            <br />
            <br />
            {showSuccessMessage && (
              <div className="h-10 w-full bg-green-400 flex justify-center items-center shadow-lg  mb-4">
                <p className="text-white">{message}</p>
              </div>
            )}
            {showErrorMessage && (
              <div className="h-10 w-full bg-red-400 flex justify-center items-center shadow-lg  mb-4">
                <p className="text-white">{message}</p>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default EditPage;
