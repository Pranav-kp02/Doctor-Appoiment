import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddDoctors.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { getApplyDoctorData } from "../../REDUX/adminSlice";
import { useNavigate } from "react-router-dom";

function AddDoctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const docDetails = useSelector((state) => state.Admin.docApplyData ?? []);

  const handleCancel = async (doctorId, role) => {
    role = "Doctor";
    try {
      const res = await API.post(
        `/docApplyUpdate/${doctorId}`,
        { role },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Doctor approved successfully");
        const updatedDoctors = docDetails.filter((doc) => doc._id !== doctorId);
        dispatch(getApplyDoctorData(updatedDoctors));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error approving doctor");
    }
  };

  const handleDelete = async (docId) => {
    try {
      const res = await API.delete(`/applyDocDel/${docId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Deleted successfully");
        const updatedDoctors = docDetails.filter((doc) => doc._id !== docId);
        dispatch(getApplyDoctorData(updatedDoctors));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error approving doctor");
    }
  };

  useEffect(() => {
    const getAddDoctorData = async () => {
      try {
        const res = await API.get("/allDoctorsApply", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getApplyDoctorData(res.data.doctors));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
      }
    };
    getAddDoctorData();
  }, [dispatch]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.headDiv}>
        <p className={style.heading}>Doctor Applications</p>
        <button onClick={() => navigate("/doctor-Apply")}>Add doctor</button>
      </div>
      <div className={style.divContainer}>
        <div className={style.gridContainer}>
          <p>#</p>
          <p>Name</p>
          <p>Experience</p>
          <p>Specialty</p>
          <p>Email</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {docDetails.map((ele, index) => (
          <div key={ele._id}>
            <div
              className={`${style.divIndex} ${
                openDropdownIndex === index ? style.activeRow : ""
              }`}
            >
              <div className={style.dataItem}>
                <span className={style.mobileLabel}>#:</span>
                <span className={style.hideOnMobile}>{index + 1}</span>
              </div>

              <div className={style.dataItem}>
                <span className={style.mobileLabel}>Name:</span>
                <div className={style.userDiv}>
                  <img
                    className={style.imgUser}
                    src={ele.image}
                    alt={ele.fullName}
                  />
                  <p>{ele.fullName}</p>
                </div>
              </div>

              <div className={style.dataItem}>
                <span className={style.mobileLabel}>Experience:</span>
                <p>{ele.experience} Years</p>
              </div>

              <div className={style.dataItem}>
                <span className={style.mobileLabel}>Speciality:</span>
                <p>{ele.speciality}</p>
              </div>

              <div className={style.dataItem}>
                <span className={style.mobileLabel}>Email:</span>
                <p>{ele.email}</p>
              </div>

              <div className={style.dataItem}>
                <span className={style.mobileLabel}>Fee:</span>
                <p>₹{ele.fees}</p>
              </div>

              <div className={style.dataItem}>
                <span className={style.mobileLabel}>Action:</span>
                <div className={style.actionButtons}>
                  <button
                    className={`${style.actionButton} ${style.completeButton}`}
                    onClick={() => handleCancel(ele._id, ele.role)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Approve
                  </button>
                  <button
                    className={`${style.actionButton} ${style.cancelButton}`}
                    onClick={() => handleDelete(ele._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>

              <div
                className={style.dropdownToggle}
                onClick={() => toggleDropdown(index)}
              >
                {openDropdownIndex === index ? "less" : "more"}
              </div>
            </div>

            {openDropdownIndex === index && (
              <div className={style.extraDetailsDropdown}>
                <div className={style.dropdownContent}>
                  <div>
                    <strong>About:</strong> {ele.about || "N/A"}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddDoctors;
