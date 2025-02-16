import React, { useEffect } from "react";
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

  const doctors = useSelector((state) => state.doctors.filteredDoctor ?? []);

  const handleFilter = (specialty) => {
    if (specialty) {
      dispatch(filterDoctorsBySpecialty(specialty));
    } else {
      dispatch(clearFilter());
    }
  };

  useEffect(() => {
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
        <p className="doc-side-para" onClick={() => handleFilter("")}>
          All doctors
        </p>
        <p className="doc-side-para" onClick={() => handleFilter("Neurology")}>
          Neurology
        </p>
        <p className="doc-side-para" onClick={() => handleFilter("Eye-care")}>
          Eye-care
        </p>
        <p
          className="doc-side-para"
          onClick={() => handleFilter("Osteoporosis")}
        >
          Osteoporosis
        </p>
        <p className="doc-side-para" onClick={() => handleFilter("Heart")}>
          Heart
        </p>
        <p className="doc-side-para" onClick={() => handleFilter("Cardiac")}>
          Cardiac
        </p>
        <p className="doc-side-para" onClick={() => handleFilter("ENT")}>
          ENT
        </p>
      </div>
      <div className="doctor-list">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="doctors-card"
            onClick={() => navigate(`/appoiment/${item._id}`)}
          >
            <img className="doc-img-color" src={item.image} alt="" />
            <div className="p-4">
              <div className="doc-avlb">
                <p className="doc-avlb-sybol"></p>
                <p>Available</p>
              </div>
              <p className="doc-text-name">{item.fullName}</p>
              <p className="doc-specality">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
