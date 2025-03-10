import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorInfo() {
  const navigate = useNavigate();
  const docDetails = useSelector((state) => state.doctors.docDetails);

  const handleChatDoc = (id) => {
    navigate(`/chat/${id}`);
  };

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
          <span className="fee2-appoi">Appoiment fee: ${docDetails.fees}</span>
          <button
            className="chat-button"
            onClick={() => handleChatDoc(docDetails._id)}
          >
            chat
          </button>
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;
