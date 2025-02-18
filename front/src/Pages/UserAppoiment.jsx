import React, { useEffect } from "react";
import "./UserAppoiment.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { API } from "../AXIOS";
import { getUserAppoiment } from "../REDUX/userAuthenticationSlice";
import { useNavigate } from "react-router-dom";

const MyAppoiment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appoimentDetails = useSelector(
    (state) => state.userAth.allUserAppoiments ?? []
  );

  const handleUserCancel = async (appoimentID, date, time) => {
    try {
      const res = await API.put(
        `/cancelAppoiment/${appoimentID}`,
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
        const cancelledAppoiment = appoimentDetails.map((appoi) => {
          if (appoi._id === appoimentID) {
            return { ...appoi, isCancelled: true, status: "cancelled" };
          }
          return appoi;
        });
        dispatch(getUserAppoiment(cancelledAppoiment));
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

  const handleDetils = (docid) => {
    navigate(`/appoiment/${docid}`);
  };

  useEffect(() => {
    const getAlluserAppoiment = async () => {
      try {
        const res = await API.get("/userAllAppoiment", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getUserAppoiment(res.data.appoiment));
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
    getAlluserAppoiment();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <p className="myAppoi-header">My Appoiment</p>
      <div>
        {appoimentDetails.map((item, index) => (
          <div className="myAppoi-doc-card" key={index}>
            <div onClick={() => handleDetils(item.docData._id)}>
              <img
                className="myAppoi-img"
                src={item.docData.image}
                alt={item.docData.fullName}
              />
            </div>
            <div className="myAppoi-content">
              <p className="myAppoi-name">{item.docData.fullName}</p>
              <p>
                {" "}
                <span className="myAppoi-span">speciality: </span>
                {item.docData.speciality}
              </p>
              <p>
                {" "}
                <span className="myAppoi-span">fee: ₹</span>
                {item.docData.fees}
              </p>
              <p className="myAppoi-p-span">
                <span className="myAppoi-span">Status: </span>
                {item.status === "cancelled" ? (
                  <span style={{ color: "red" }}>cancelled</span>
                ) : (
                  <span>
                    {item.status === "pending" && (
                      <span className="statusPending">Pending</span>
                    )}
                    {item.status === "approve" && (
                      <span className="statusApproved">Approved</span>
                    )}
                    {item.status === "completed" && (
                      <span className="statusCompleted">Completed</span>
                    )}
                  </span>
                )}
              </p>
              {/* <p className="myAppoi-address">Address:</p>
              <p className="myAppoi-address-line">{item.address.line1}</p>
              <p className="myAppoi-address-line">{item.address.line2}</p> */}
              <p className="myAppoi-p-span">
                <span className="myAppoi-span">Date & Time: </span>
                {item.slotBookedDate} | {item.slotBookedTime}
              </p>
            </div>
            <div></div>
            {item.status === "completed" ? (
              <div className="myAppoi-div-btn">
                <button className="myAppoi-cancel-btn completed-btn" disabled>
                  completed
                </button>
              </div>
            ) : (
              <div className="myAppoi-div-btn">
                {item.isCancelled ? (
                  <button className="myAppoi-cancel-btn cancelled-btn" disabled>
                    Cancelled
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleUserCancel(
                        item._id,
                        item.slotBookedDate,
                        item.slotBookedTime
                      )
                    }
                    className="myAppoi-cancel-btn"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppoiment;
