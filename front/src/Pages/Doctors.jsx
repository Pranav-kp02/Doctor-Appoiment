import React, { useEffect, useState } from "react";
import "./DoctorsList.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearFilter,
  filterDoctorsBySpecialty,
  getAllDoctorUser,
} from "../REDUX/doctorsSlice";
import { API } from "../AXIOS";
import toast from "react-hot-toast";

const Doctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { specialty } = useParams();
  const [activeFilter, setActiveFilter] = useState("");
  const doctors = useSelector((state) => state.doctors.filteredDoctor ?? []);

  const handleFilter = (specialty) => {
    setActiveFilter(specialty);
    if (specialty) {
      dispatch(filterDoctorsBySpecialty(specialty));
    } else {
      dispatch(clearFilter());
    }
  };

  useEffect(() => {
    setActiveFilter(specialty || "");
    if (specialty) {
      dispatch(filterDoctorsBySpecialty(specialty));
    } else {
      dispatch(clearFilter());
    }

    const getAlldoctorDetails = async () => {
      try {
        const res = await API.get("/userAllDoctors", {
          withCredentials: true,
        });
        if (res.data.success) {
          if (specialty) {
            dispatch(filterDoctorsBySpecialty(specialty));
          } else {
            dispatch(getAllDoctorUser(res.data.doctors));
          }
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

    getAlldoctorDetails();
    window.scrollTo(0, 0);
  }, [specialty, dispatch]);

  return (
    <div className="doctor-main">
      <div className="doc-side-bar">
        <div
          className={`doc-side-para ${!activeFilter ? "active-filter" : ""}`}
          onClick={() => handleFilter("")}
        >
          All doctors
        </div>
        <div
          className={`doc-side-para ${
            activeFilter === "Neurology" ? "active-filter" : ""
          }`}
          onClick={() => handleFilter("Neurology")}
        >
          Neurology
        </div>
        <div
          className={`doc-side-para ${
            activeFilter === "Eye-care" ? "active-filter" : ""
          }`}
          onClick={() => handleFilter("Eye-care")}
        >
          Eye-care
        </div>
        <div
          className={`doc-side-para ${
            activeFilter === "Osteoporosis" ? "active-filter" : ""
          }`}
          onClick={() => handleFilter("Osteoporosis")}
        >
          Osteoporosis
        </div>
        <div
          className={`doc-side-para ${
            activeFilter === "Heart" ? "active-filter" : ""
          }`}
          onClick={() => handleFilter("Heart")}
        >
          Heart
        </div>
        <div
          className={`doc-side-para ${
            activeFilter === "Cardiac" ? "active-filter" : ""
          }`}
          onClick={() => handleFilter("Cardiac")}
        >
          Cardiac
        </div>
        <div
          className={`doc-side-para ${
            activeFilter === "ENT" ? "active-filter" : ""
          }`}
          onClick={() => handleFilter("ENT")}
        >
          ENT
        </div>
      </div>

      <div className="doctor-list">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="doctors-card"
            onClick={() => navigate(`/appoiment/${item._id}`)}
          >
            <img
              className="doc-img-color"
              src={item.image}
              alt={`Dr. ${item.fullName}`}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Doctor";
              }}
            />
            <div className="p-4">
              <div className="doc-avlb">
                <div className="doc-avlb-sybol"></div>
                <p>Available</p>
              </div>
              <p className="doc-text-name">Dr. {item.fullName}</p>
              <p className="doc-specality">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
