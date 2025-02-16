import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DoctorsList.css";
import { AllDoctorData } from "../../REDUX/adminSlice";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

function DoctorsList() {
  const dispatch = useDispatch();
  const allDoctors = useSelector((state) => state.Admin.allDoctors ?? []);

  const handleCheckBox = async (doctorId, currentAvailability) => {
    try {
      const res = await API.put(
        `/toggleAvailability/${doctorId}`,
        {
          available: !currentAvailability, // Sending the new availability state
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Update local state through Redux
        const updatedDoctors = allDoctors.map((doctor) => {
          if (doctor._id === doctorId) {
            return { ...doctor, available: !currentAvailability };
          }
          return doctor;
        });

        dispatch(AllDoctorData(updatedDoctors));
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

  const handleDocDelete = async (dId) => {
    try {
      const res = await API.delete(`/docDeleteAdmin/${dId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        const newDoctorList = allDoctors.filter((ele) => ele._id !== dId);

        dispatch(AllDoctorData(newDoctorList));
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

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const res = await API.get("/alldoctors", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(AllDoctorData(res.data.doctors));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    };
    getAllDoctors();
  }, [dispatch]);

  if (!allDoctors) {
    return <div>Loading...</div>;
  }

  return (
    <div className="docList-admin-main">
      <h1 className="docList-admin-head">All Doctors</h1>
      <div className="docList-admin-div">
        {allDoctors.map((doctor) => (
          <div className="docList-admin-map" key={doctor._id}>
            <img
              className="docList-admin-img"
              src={doctor.image}
              alt={doctor.fullName}
            />
            <div className="docList-admin-sidePara">
              <p className="docList-admin-para1">{doctor.fullName}</p>
              <p className="docList-admin-para2">{doctor.email}</p>
              <p className="docList-admin-para2">Dept : {doctor.speciality}</p>
              <p className="docList-admin-para2">
                Exp : {doctor.experience} years
              </p>
              <p className="docList-admin-para2">Fees : ₹{doctor.fees}</p>
              <div className="doc-list-Bottom">
                <div className="docList-admin-input">
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() =>
                      handleCheckBox(doctor._id, doctor.available)
                    }
                  />
                  <p className="docList-admin-input-paraa">
                    {doctor.available ? "Available" : "Not Available"}
                  </p>
                </div>

                <AiFillDelete onClick={() => handleDocDelete(doctor._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;
