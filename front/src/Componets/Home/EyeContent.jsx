import React from "react";
import { useNavigate } from "react-router-dom";

function EyeContent() {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary">
      <div className="eye-bg-img"></div>

      <div className="container main">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img
              className="img-fluid"
              src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/eye-care.png"
              alt="..."
            />
          </div>

          <div className="col-md-7 col-xxl-6 text-center text-md-start">
            <h2 className="fw-bold text-light mb-4 mt-4 mt-lg-0 eye-care-head">
              Eye Care with Top Professionals
              <br className="d-none d-sm-block" />
              and In Budget.
            </h2>
            <p className="text-light">
              We've built a healthcare system that puts your needs first.
              <br className="d-none d-sm-block" />
              For us, there is nothing more important than the health of{" "}
              <br className="d-none d-sm-block" />
              you and your loved ones.
            </p>
            <div className="py-3">
              <a
                className="btn btn-lg btn-light rounded-pill load-Btn"
                href="#!"
                role="button"
                onClick={() => navigate("/doctors/Eye-care")}
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EyeContent;
