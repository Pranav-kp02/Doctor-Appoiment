import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  doctorsDetails,
  getAppoimentSlot,
  getRelatedDoc,
} from "../REDUX/doctorsSlice";
import DoctorInfo from "../Componets/Appoiment/DoctorInfo";
import RelatedDoctor from "../Componets/Appoiment/RelatedDoctor";
import { API } from "../AXIOS";
import "./Appoiment.css";

const Appointment = () => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [time, setTime] = useState(null);
  const [dateIndex, setDateIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const docAppointmentSlot = useSelector(
    (state) => state.doctors.appoimentSlots
  );
  const authentication = useSelector(
    (state) => state.userAth.athetication ?? false
  );

  const daysInWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      date: null,
      time: null,
    },
  });

  useEffect(() => {
    const getAvailableSlot = async () => {
      setIsLoading(true);
      try {
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

        // Set initial values when slots are available
        if (slots.length > 0 && slots[0].length > 0) {
          setValue("date", slots[0][0].dateTime);
          setDateIndex(0);
        }
      } catch (error) {
        console.error("Error loading slots:", error);
        toast.error("Failed to load appointment slots");
      } finally {
        setIsLoading(false);
      }
    };

    dispatch(doctorsDetails(docId));
    dispatch(getRelatedDoc(docId));
    getAvailableSlot();
  }, [dispatch, docId, setValue]);

  const onSubmit = async (data) => {
    if (!authentication) {
      toast.error("Please login to book an appointment");
      return;
    }

    if (!data.time || !data.date) {
      toast.error("Please select both date and time");
      return;
    }

    try {
      const res = await API.post(`/docProf/${docId}`, data, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/userAppoiments");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data || error.message || "Failed to book appointment";
      toast.error(errorMessage);
      console.error("Appointment booking error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading appointment slots...</p>
      </div>
    );
  }

  return (
    <div className="appointment-container">
      <DoctorInfo />

      <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
        <div className="slot-main-appoi">
          <h2 className="booking-title">Select Appointment Slot</h2>

          {/* Day Slot Selection */}
          <div className="day-slot-appoi">
            {docAppointmentSlot.length > 0 &&
              docAppointmentSlot.map((ele, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDateIndex(index);
                    setValue("date", ele[0].dateTime);
                    setTime(null); // Reset time when date changes
                    setValue("time", null);
                  }}
                  className={`week-slot-appoi ${
                    dateIndex === index ? "selected-week" : "not-selected-week"
                  }`}
                >
                  <p>{ele[0] && daysInWeek[ele[0].dayOfWeek]}</p>
                  <p>{ele[0] && ele[0].dayOfMonth}</p>
                </div>
              ))}
          </div>

          {/* Time Slot Selection */}
          <div className="time-slot-main-appoi">
            {docAppointmentSlot.length > 0 &&
              docAppointmentSlot[dateIndex].map((items, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setTime(items.time);
                    setValue("time", items.time);
                  }}
                  className={`time-slot-appoi ${
                    items.time === time
                      ? "selected-times"
                      : "not-selected-times"
                  }`}
                >
                  {items.time}
                </button>
              ))}
          </div>

          {/* Selected Slot Summary */}
          <div className="selected-slot-summary">
            {time && docAppointmentSlot[dateIndex][0]?.dateTime && (
              <p>
                Selected : {docAppointmentSlot[dateIndex][0].dateTime} at {time}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="booking-btn"
            disabled={!time || !docAppointmentSlot[dateIndex][0]?.dateTime}
          >
            Book Appointment
          </button>
        </div>
      </form>

      <RelatedDoctor />
    </div>
  );
};

export default Appointment;
