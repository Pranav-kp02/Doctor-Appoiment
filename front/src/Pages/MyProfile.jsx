import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getUserUpdateData } from "../REDUX/userAuthenticationSlice";
import { API } from "../AXIOS";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [isEdit, setEdit] = useState(false);
  const userDetails = useSelector((state) => state.userAth.user ?? {});

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userDetails,
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.put(`/prof/${userDetails.id}`, data, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(getUserUpdateData(res.data.user));
        toast.success(res.data.message || "update successfull");
        setEdit(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      reset(userDetails); // Reset form fields to initial state
    }
    setEdit(!isEdit);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="profile-main container">
        <img className="profile-img" src={userDetails.image} alt="Profile" />
        {isEdit ? (
          <input
            className="prof-name-input"
            type="text"
            {...register("fullName", { required: "Name is required" })}
          />
        ) : (
          <p className="prof-name">{userDetails.fullName}</p>
        )}
        {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        <hr className="prof-hr" />

        <div>
          <p className="prof-main-head">CONTACT INFORMATION</p>
          <div className="prof-cont-div">
            <p className="sub-heading">Email:</p>
            <p style={{ color: "#3b82f6" }}>{userDetails.email}</p>

            <p className="sub-heading">Phone:</p>
            {isEdit ? (
              <input
                className="prof-phone-input"
                type="tel"
                {...register("phone")}
              />
            ) : (
              <p style={{ color: "#60a5fa" }}>{userDetails.phone}</p>
            )}
          </div>
        </div>

        <div>
          <p className="prof-main-head">BASIC INFORMATION</p>
          <div className="prof-basic-main">
            <p className="sub-heading">Gender:</p>
            {isEdit ? (
              <select className="prof-gender-input" {...register("gender")}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p style={{ color: "#9CA3AF" }}>{userDetails.gender}</p>
            )}

            <p className="sub-heading">Birth Day:</p>
            {isEdit ? (
              <input
                className="prof-phone-input"
                type="date"
                {...register("dob")}
              />
            ) : (
              <p style={{ color: "#9CA3AF" }}>{userDetails.dob}</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: "2.5rem" }}>
          {isEdit ? (
            <input type="submit" value="Save Info" className="prof-edit-btn" />
          ) : (
            <button
              type="button"
              className="prof-edit-btn"
              onClick={toggleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MyProfile;
