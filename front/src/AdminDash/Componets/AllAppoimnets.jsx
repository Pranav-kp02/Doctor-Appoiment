import React, { useEffect, useState } from "react";
import style from "./AllAppoimnets.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { adminFilterAppoiment, allAppoimentData } from "../../REDUX/adminSlice";

function AllAppoimnets() {
  const dispatch = useDispatch();
  const appoimentData = useSelector((state) => state.Admin.allApppoiment ?? []);
  const appoimentFilterData = useSelector(
    (state) => state.Admin.aFilterappoiment ?? []
  );

  const [showDropdown, setShowDropdown] = useState(false);

  const handleCancel = async (appId, date, time) => {
    try {
      const res = await API.put(
        `/AdminAppoimentCancel/${appId}`,
        {
          cancel: true,
          status: "cancelled",
          bookDate: date,
          bookTime: time,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const cancelledAppoiment = appoimentData.map((appoi) => {
          if (appoi._id === appId) {
            return { ...appoi, isCancelled: true, status: "cancelled" };
          }
          return appoi;
        });
        dispatch(allAppoimentData(cancelledAppoiment));
        dispatch(adminFilterAppoiment());
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update availability";
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleFilter = (str) => {
    dispatch(adminFilterAppoiment(str));
  };

  useEffect(() => {
    const getAllAppoimentData = async () => {
      try {
        const res = await API.get("/allAppoiment", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(allAppoimentData(res.data.appoiment));
          dispatch(adminFilterAppoiment());
        } else {
          toast.error(res.data.message);
          console.log(res.data.message);
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
    getAllAppoimentData();
  }, [dispatch]);
  return (
    <div className={style.mainDiv}>
      <p className={style.heading}>All Appointments</p>
      <div className={style.filterContainer}>
        <button
          className={style.filterButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Filter
        </button>

        {/* Filter Dropdown */}
        <div
          className={`${style.filterDropdown} ${
            showDropdown ? style.show : ""
          }`}
        >
          <span
            className={style.filterOption}
            onClick={() => {
              handleFilter("");
              setShowDropdown(false);
            }}
          >
            All
          </span>
          <span
            className={style.filterOption}
            onClick={() => {
              handleFilter("pending");
              setShowDropdown(false);
            }}
          >
            Pending
          </span>
          <span
            className={style.filterOption}
            onClick={() => {
              handleFilter("approve");
              setShowDropdown(false);
            }}
          >
            Approved
          </span>
          <span
            className={style.filterOption}
            onClick={() => {
              handleFilter("completed");
              setShowDropdown(false);
            }}
          >
            Completed
          </span>
          <span
            className={style.filterOption}
            onClick={() => {
              handleFilter("cancelled");
              setShowDropdown(false);
            }}
          >
            Cancelled
          </span>
        </div>
      </div>

      <div className={style.divContainer}>
        <div className={style.gridContainer}>
          <p>#</p>
          <p>Patient</p>
          <p>Status</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {appoimentFilterData.map((ele, index) => (
          <div className={style.divIndex} key={index}>
            <div className={style.dataItem}>
              <span className={style.mobileLabel}>#:</span>
              <span className={style.hideOnMobile}>{index + 1}</span>
            </div>

            <div className={style.dataItem}>
              <span className={style.mobileLabel}>Patient:</span>
              <div className={style.userDiv}>
                <img
                  className={style.imgUser}
                  src={ele.userData.image}
                  alt=""
                />
                <p>{ele.userData.fullName}</p>
              </div>
            </div>

            <div className={style.dataItem}>
              <span className={style.mobileLabel}>Status:</span>
              {ele.isCancelled ? (
                <span className={style.cancelledBadge}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancelled
                </span>
              ) : (
                <div>
                  {ele.status === "pending" && (
                    <span className={style.statusPending}>Pending</span>
                  )}
                  {ele.status === "approve" && (
                    <span className={style.statusApproved}>Approved</span>
                  )}
                  {ele.status === "completed" && (
                    <span className={style.statusCompleted}>Completed</span>
                  )}
                </div>
              )}
            </div>

            <div className={style.dataItem}>
              <span className={style.mobileLabel}>Date & Time:</span>
              <p>
                {ele.slotBookedDate}, {ele.slotBookedTime}
              </p>
            </div>

            <div className={style.dataItem}>
              <span className={style.mobileLabel}>Doctor:</span>
              <div className={style.userDiv}>
                <img className={style.imgUser} src={ele.docData.image} alt="" />
                <p>{ele.docData.fullName}</p>
              </div>
            </div>

            <div className={style.dataItem}>
              <span className={style.mobileLabel}>Fee:</span>
              <p>${ele.fees}</p>
            </div>

            <div className={style.dataItem}>
              <span className={style.mobileLabel}>Action:</span>
              {ele.status === "pending" && (
                <div className={style.actionButtons}>
                  <button
                    className={`${style.actionButton} ${style.cancelButton}`}
                    onClick={() =>
                      handleCancel(
                        ele._id,
                        ele.slotBookedDate,
                        ele.slotBookedTime
                      )
                    }
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
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppoimnets;
