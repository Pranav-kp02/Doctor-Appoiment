import React, { useEffect } from "react";
import "./RelatedDoctor.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RelatedDoctor() {
  const navigate = useNavigate();

  const relatedDoc = useSelector((state) => state.doctors.relatedDOctors);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <>
      <div className="main-rel-doc">
        <h1 className="rel-doc-head">Related Doctors</h1>
        <p className="rel-doc-para">
          simply browse through our extensive list of trusted doctors.
        </p>
        <div className="doctor-list-related">
          {relatedDoc.map((item, index) => (
            <div
              key={index}
              className="rel-doctors-card-related"
              onClick={() => navigate(`/appoiment/${item._id}`)}
            >
              <img className="rel-doc-img-color" src={item.image} alt="" />
              <div className="p-4">
                <div className="rel-doc-avlb">
                  <p className="rel-doc-avlb-sybol"></p>
                  <p>avialable</p>
                </div>
                <p className="rel-doc-text-name">{item.fullName}</p>
                <p className="rel-doc-specality">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RelatedDoctor;
