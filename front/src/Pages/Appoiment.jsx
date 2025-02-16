import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Appoiment.css";
import RelatedDoctor from "../Componets/Appoiment/RelatedDoctor";
import { useDispatch, useSelector } from "react-redux";
import {
  doctorsDetails,
  getAppoimentIndex,
  getAppoimentSlot,
  getAppoimentTime,
  getRelatedDoc,
} from "../REDUX/doctorsSlice";
import DoctorInfo from "../Componets/Appoiment/DoctorInfo";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API } from "../AXIOS";

const Appoiment = () => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const docAppoimentSlot = useSelector((state) => state.doctors.appoimentSlots);
  const docAppoimentIndex = useSelector((state) => state.doctors.slotIndex);
  const docAppoimentTime = useSelector((state) => state.doctors.slotTime);
  const authentication = useSelector(
    (state) => state.userAth.athetication ?? false
  );

  const daysInWeek = ["SUN", "MON", "TUE", "WED", "THUS", "FRI", "SAT"];

  useEffect(() => {
    dispatch(doctorsDetails(docId));
    dispatch(getRelatedDoc(docId));
    const getAvailableSlot = async () => {
      let today = new Date();
      today.setSeconds(0, 0);
      const slots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (i === 0) {
          let now = new Date();
          currentDate.setHours(
            now.getHours() >= 10 ? now.getHours() + 1 : 10,
            now.getMinutes() >= 30 ? 30 : 0
          );
        } else {
          currentDate.setHours(10, 0, 0, 0); // 10:00 AM
        }

        let timeSlot = [];
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          let formattedDate = currentDate.toLocaleDateString("en-GB", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          timeSlot.push({
            dateTime: formattedDate,
            time: formattedTime,

            dayOfWeek: currentDate.getDay(),
            dayOfMonth: currentDate.getDate(),
          });

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        slots.push(timeSlot);
      }

      dispatch(getAppoimentSlot(slots));
    };

    getAvailableSlot();
  }, [dispatch, docId]);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      date: null,
      time: null,
    },
  });

  const onSubmit = async (data) => {
    if (!authentication) {
      toast.error("Please Login");
      return;
    }
    if (!data.time || !data.date) {
      toast.error("Please select both date and time");
      return;
    }
    const submissionData = {
      ...data,
    };

    try {
      const res = await API.post(`/docProf/${docId}`, submissionData, {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/userAppoiments");
        toast.success(res.data.message);
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

    dispatch(getAppoimentTime(data.time));
  };

  return (
    <div>
      {/* --------doc info----------- */}
      <DoctorInfo />

      {/* slot booking */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Appointment Slot Selection */}
          <div className="slot-main-appoi">
            <p>Booking slot</p>

            {/* Day Slot Selection */}
            <div className="day-slot-appoi">
              {docAppoimentSlot.length > 0 &&
                docAppoimentSlot.map((ele, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch(getAppoimentIndex(index));
                      setValue("date", ele[0].dateTime);
                    }}
                    className={`week-slot-appoi ${
                      docAppoimentIndex === index
                        ? "selected-week"
                        : "not-selcted-week"
                    }`}
                  >
                    <p>{ele[0] && daysInWeek[ele[0].dayOfWeek]}</p>
                    <p>{ele[0] && ele[0].dayOfMonth}</p>
                  </div>
                ))}
            </div>

            {/* Time Slot Selection */}
            <div className="time-slot-main-appoi container">
              {docAppoimentSlot.length &&
                docAppoimentSlot[docAppoimentIndex].map((items, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      dispatch(getAppoimentTime(items.time));
                      setValue("time", items.time);
                    }}
                    className={`time-slot-appoi ${
                      items.time === docAppoimentTime
                        ? "selected-times"
                        : "not-selected-times"
                    }`}
                  >
                    {items.time}
                  </p>
                ))}
            </div>

            {/* Submit Button */}
            <button type="submit" className="booking-btn">
              Book An Appointment
            </button>
          </div>
        </div>
      </form>

      {/* -------realted doc---------- */}
      <RelatedDoctor />
    </div>
  );
};

export default Appoiment;
