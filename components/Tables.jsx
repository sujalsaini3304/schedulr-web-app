import React, { useEffect, useState } from "react";
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
  deleteDoc,
} from "firebase/firestore";
import useStore from "../store.js";
import { useNavigate } from "react-router-dom";

const Tables = () => {
  const listData = [
    "Day",
    "From",
    "To",
    "Period",
    "Subject",
    "Section",
    "Branch",
    "Semester",
  ];
  const {
    userEmail,
    isLoggedIn,
    isModifyButtonPressed,
    setIsModifyButtonPressed,
    setIsModifyButtonPressedManually,
  } = useStore();

  const [resDocuments, setResDocuments] = React.useState([]);
  const [showEditButtonMessage, setShowEditButtonMessage] = useState(false);
  const [showDeleteButtonMessage, setShowDeleteButtonMessage] = useState(false);
  const [arr, setArr] = useState([]);
  const [deletionOperationFlag, setDeletionOperationFlag] = useState(0);
  const navigate = useNavigate();

  const getDocuments = async () => {
    if (userEmail == "") return;
    const snapshot = await getDocs(collection(db, userEmail));
    const documents = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setResDocuments(documents);
  };

  useEffect(() => {
    getDocuments();
    if (deletionOperationFlag == 1) {
      setDeletionOperationFlag(0);
    }
  }, [deletionOperationFlag]);

  return (
    <>
      {isLoggedIn && resDocuments.length != 0 ? (
        <>
          <div className="flex justify-end  ">
            <div
              className="mb-2 border w-34 flex items-center h-10 justify-evenly cursor-pointer"
              onClick={() => {
                setIsModifyButtonPressed();
                if (isModifyButtonPressed == false) setArr([]);
              }}
            >
              <span className="text-xl font-semibold ">
                {isModifyButtonPressed == false ? "Select" : "Deselect"}
              </span>
              <img
                src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741938016/select_img_x2qbgl.png"
                className="h-8 "
              />
            </div>
          </div>
        </>
      ) : null}

      {arr.length != 0 && isModifyButtonPressed && resDocuments.length != 0 && (
        <>
          <div className="flex justify-start gap-4 ">
            <div
              className="mb-2 border w-34 flex items-center h-10 justify-evenly border-red-500 cursor-pointer "
              onClick={() => {
                if (arr.length != 0) {
                  arr.forEach(async (item) => {
                    try {
                      await deleteDoc(doc(db, userEmail, item));
                      let index = arr.indexOf(item);
                      const removeItemFromArray = (indexToRemove) => {
                        setArr((prevArr) =>
                          prevArr.filter((_, index) => index !== indexToRemove)
                        );
                      };
                      removeItemFromArray(index);
                    } catch (error) {
                      console.error("Error deleting document:", error);
                    }
                  });
                }
                setDeletionOperationFlag(1);
                setShowDeleteButtonMessage(true);
                setTimeout(() => {
                  setShowDeleteButtonMessage(false);
                }, 3000);
              }}
            >
              <span className="text-xl font-semibold text-red-500 ">
                Delete
              </span>
              <img
                src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741939441/delete_ideb9x.png"
                className="h-8"
              />
            </div>
            <div
              className="mb-2 border w-34 flex items-center h-10 justify-evenly border-blue-400 cursor-pointer "
              onClick={() => {
                if (arr.length == 1) {
                  navigate("/schedule/edit", { state: { docId: arr[0] } });
                  setIsModifyButtonPressedManually(false);
                  setShowEditButtonMessage(false);
                } else {
                  setShowEditButtonMessage(true);
                  setTimeout(() => {
                    setShowEditButtonMessage(false);
                  }, 3000);
                }
              }}
            >
              <span className="text-xl font-semibold text-blue-400 ">Edit</span>
              <img
                src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741943915/pen_a1vkwy.png"
                className="h-8"
              />
            </div>
          </div>
          {showEditButtonMessage && (
            <>
              <div className="flex justify-center mb-2">
                <div
                  className="w-140 h-12 border flex items-center justify-center gap-4"
                  style={{ borderColor: "#2196F3" }}
                >
                  <img
                    src="https://res.cloudinary.com/dep5qlowr/image/upload/v1742015886/info_xdomqq.png"
                    className="h-10 w-10"
                  />
                  <span
                    className="text-lg  font-medium "
                    style={{ color: "#2196F3" }}
                  >
                    please select one to edit.
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {showDeleteButtonMessage && (
        <>
          <div className="flex justify-center mb-2">
            <div className="w-140 h-12 border flex items-center justify-center border-red-500 gap-4">
              <img
                src="https://res.cloudinary.com/dep5qlowr/image/upload/v1742017622/delete_completed_ihhgz6.png"
                className="h-8 w-8"
              />
              <span className="text-lg  font-medium text-red-500">
                Schedule deleted successfully.
              </span>
            </div>
          </div>
        </>
      )}
      {resDocuments.length != 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {isModifyButtonPressed &&
                  isLoggedIn &&
                  resDocuments.length != 0 ? (
                    <>
                      <th className="py-2 px-4 text-left">Select</th>
                    </>
                  ) : null}
                  {/* <th className="py-2 px-4 text-left">Id</th> */}

                  {listData.map((item , index) => (
                    <th key={index} className="py-2 px-4 text-left">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoggedIn
                  ? resDocuments.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        {isModifyButtonPressed ? (
                          <td>
                            <img
                              id={`selectButtonId_${item.id}`}
                              src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741930649/check_ll1wgl.png"
                              className="h-8 ml-4 cursor-pointer "
                              onClick={() => {
                                let url = document.querySelector(
                                  `#selectButtonId_${item.id}`
                                ).src;
                                if (
                                  url ===
                                  "https://res.cloudinary.com/dep5qlowr/image/upload/v1741930649/check_ll1wgl.png"
                                ) {
                                  document.querySelector(
                                    `#selectButtonId_${item.id}`
                                  ).src =
                                    "https://res.cloudinary.com/dep5qlowr/image/upload/v1741930660/check_fill_tnbx9f.png";

                                  const addItemToArray = (newItem) => {
                                    setArr((prevArr) => [...prevArr, newItem]);
                                  };

                                  addItemToArray(`${item.id}`);
                                }
                                if (
                                  url ===
                                  "https://res.cloudinary.com/dep5qlowr/image/upload/v1741930660/check_fill_tnbx9f.png"
                                ) {
                                  document.querySelector(
                                    `#selectButtonId_${item.id}`
                                  ).src =
                                    "https://res.cloudinary.com/dep5qlowr/image/upload/v1741930649/check_ll1wgl.png";

                                  let index = arr.indexOf(`${item.id}`);

                                  const removeItemFromArray = (
                                    indexToRemove
                                  ) => {
                                    setArr((prevArr) =>
                                      prevArr.filter(
                                        (_, index) => index !== indexToRemove
                                      )
                                    );
                                  };

                                  removeItemFromArray(index);
                                }
                              }}
                            />
                          </td>
                        ) : null}
                        {/* <td className="py-2 px-4">{item.id}</td> */}
                        <td className="py-2 px-4">
                          {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                        </td>
                        <td className="py-2 px-4">{item.from}</td>
                        <td className="py-2 px-4">{item.to}</td>
                        <td className="py-2 px-4">{item.period}</td>
                        <td className="py-2 px-4">
                          {item.subject.toUpperCase()}
                        </td>
                        <td className="py-2 px-4">
                          {item.section.toUpperCase()}
                        </td>
                        <td className="py-2 px-4">
                          {item.branch.toUpperCase()}
                        </td>
                        <td className="py-2 px-4">{item.semester}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {isLoggedIn && resDocuments.length == 0 ? (
        <>
          <div>
            <div className="flex justify-center pt-10">
              <img
                src="https://res.cloudinary.com/dep5qlowr/image/upload/v1741927529/nothing_lluvbm.png"
                className="h-30 "
              />
            </div>
            <div className="text-center font-semibold text-xl">
              No schedule created yet.
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Tables;
