import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

function DoctorInfo() {
  const docDetails = useSelector((state) => state.doctors.docDetails);

  return (
    <div className="main-appoi ">
      <div className="img-main-appoi">
        <img
          className="img-appoi"
          src={docDetails.image}
          alt={docDetails.fullName}
        />
      </div>

      <div className="content-appoi">
        <p className="appoi-name">
          {docDetails.fullName}
          <AiFillCheckCircle />
        </p>

        <div className="qlfy-appoi">
          <p>
            {docDetails.degree} - {docDetails.speciality}
            <button className="qlfy-btn-appoi">
              {docDetails.experience} year
            </button>
          </p>
        </div>
        {/* about */}
        <div>
          <p className="about-appoi">
            About
            <IoMdInformationCircleOutline />
          </p>
          <p className="disc-about-appoi">{docDetails.about}</p>
        </div>
        <p className="fee-appoi">
          Appoiment fee: <span className="fee2-appoi">${docDetails.fees}</span>
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;
