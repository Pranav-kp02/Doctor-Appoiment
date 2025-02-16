import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-secondary">
        <div className="bg-footer opacity-25"></div>

        <div className="container main">
          <div className="row py-8">
            <div className="col-12 col-sm-12 col-lg-6 mb-4 order-0 order-sm-0">
              <a className="text-decoration-none" href="##">
                <img
                  src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/footer-logo.png"
                  height="51"
                  alt=""
                />
              </a>
              <p className="text-light my-4">
                The world's most trusted <br />
                telehealth company.
              </p>
            </div>
            <div className="col-6 col-sm-4 col-lg-2 mb-3 order-2 order-sm-1">
              <h5 className="lh-lg fw-bold mb-4 text-light header-text-sty">
                Departments
              </h5>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li
                  className="lh-lg"
                  onClick={() => navigate("/doctors/Eye-care")}
                >
                  <a className="footer-link" href="#!">
                    Eye care
                  </a>
                </li>
                <li
                  className="lh-lg"
                  onClick={() => navigate("/doctors/Cardiac")}
                >
                  <a className="footer-link" href="#!">
                    Cardiac care
                  </a>
                </li>
                <li
                  className="lh-lg"
                  onClick={() => navigate("/doctors/Heart")}
                >
                  <a className="footer-link" href="#!">
                    Heart care
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 col-lg-2 mb-3 order-3 order-sm-2">
              <h5 className="lh-lg fw-bold text-light mb-4 font-sans-serif">
                For Doctors
              </h5>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="lh-lg">
                  <p
                    className="footer-link"
                    onClick={() => navigate("/doctor-Apply")}
                  >
                    Doctor Profile
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 col-lg-2 mb-3 order-3 order-sm-2">
              <h5 className="lh-lg fw-bold text-light mb-4 font-sans-serif">
                {" "}
                Customer Care
              </h5>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="lh-lg">
                  <span
                    className="footer-link"
                    onClick={() => navigate("/about-us")}
                  >
                    About Us
                  </span>
                </li>
                <li className="lh-lg">
                  <span
                    className="footer-link"
                    onClick={() => navigate("/about-us")}
                  >
                    Contact US
                  </span>
                </li>
                <li className="lh-lg">
                  <span
                    className="footer-link"
                    onClick={() => navigate("/about-us")}
                  >
                    Get Update
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0 bg-primary">
        <div className="container">
          <div className="row justify-content-md-between justify-content-evenly py-4">
            <div className="col-12 col-sm-8 col-md-6 col-lg-auto text-center text-md-start">
              <p className="fs--1 my-2 fw-bold text-200">
                All rights Reserved © Your Company, 2024
              </p>
            </div>
            <div className="col-12 col-sm-8 col-md-6">
              <p className="fs--1 my-2 text-center text-md-end text-200">
                {" "}
                Made with&nbsp;
                <svg
                  className="bi bi-suit-heart-fill"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="#F95C19"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
