import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <section className="py-5 mt-5">
        <div className="container ">
          <div className="row ">
            <div className="col-12 py-3 dept-reltive">
              <div className="bg-holder bg-size about-bg-img"></div>
              <h1 className="text-center dept-header">ABOUT US</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="about-bg">
        <div className="aboutUs-bg-img"></div>

        <div className="container main">
          <div className="row align-items-center">
            <div className="col-md-6 order-lg-1 mb-5 mb-lg-0">
              <img
                className="fit-cover rounded-circle w-100"
                src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/health-care.png"
                alt="..."
              />
            </div>

            <div className="col-md-6 text-center text-md-start">
              <h2 className="fw-bold mb-4 about-head-msg">
                We are developing a healthcare
                <br className="d-none d-sm-block" />
                system around you
              </h2>
              <p className="aboutText-color">
                We think that everyone should have easy access to excellent
                <br className="d-none d-sm-block" />
                healthcare. Our aim is to make the procedure as simple as
                <br className="d-none d-sm-block" />
                possible for our patients and to offer treatment no matter
                <br className="d-none d-sm-block" />
                where they are — in person or at their convenience.
              </p>
              <div className="py-3">
                <button
                  className="btn btn-lg btn-outline-primary rounded-pill about-button"
                  type="submit"
                  onClick={() => navigate("/about-us")}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
