import React from "react";
import { Link } from "react-router-dom";

function Department() {
  return (
    <>
      <section className="py-5 mt-3">
        <div className="container ">
          <div className="row ">
            <div className="col-12 py-3 dept-reltive">
              <div className="bg-holder bg-size dept-bg-img"></div>
              <h1 className="text-center dept-header">OUR DEPARTMENTS</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row py-3 align-items-center justify-content-center justify-content-lg-evenly">
            <div className="col-auto col-md-4 col-lg-auto text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <Link
                    className="text-decoration-none"
                    to={"/doctors/Neurology"}
                  >
                    <img
                      className="mb-3 deparment-icon"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/neurology.png"
                      alt="..."
                    />
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/neurology.svg"
                      alt="..."
                    />
                    <p className="para-size text-center">Neurology</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto col-md-4 col-lg-auto text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <Link
                    className="text-decoration-none"
                    to={"/doctors/Eye-care"}
                  >
                    <img
                      className="mb-3 deparment-icon"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/eye-care.png"
                      alt="..."
                    />
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/eye-care.svg"
                      alt="..."
                    />
                    <p className="para-size text-center">Eye-care</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto col-md-4 col-lg-auto text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <Link
                    className="text-decoration-none"
                    to={"/doctors/Cardiac"}
                  >
                    <img
                      className="mb-3 deparment-icon"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/cardiac.png"
                      alt="..."
                    />
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/cardiac.svg"
                      alt="..."
                    />
                    <p className="para-size text-center">Cardiac care</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto col-md-4 col-lg-auto text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <Link className="text-decoration-none" to={"/doctors/Heart"}>
                    <img
                      className="mb-3 deparment-icon"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/heart.png"
                      alt="..."
                    />
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/heart.svg"
                      alt="..."
                    />
                    <p className="para-size text-center">Heart care</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto col-md-4 col-lg-auto text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <Link
                    className="text-decoration-none"
                    to={"/doctors/Osteoporosis"}
                  >
                    <img
                      className="mb-3 deparment-icon"
                      src="	https://technext.github.io/live-doc/v1.0.0/assets/img/icons/osteoporosis.png"
                      alt="..."
                    />
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/osteoporosis.svg"
                      alt="..."
                    />
                    <p className="para-size text-center">Osteoporosis</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto col-md-4 col-lg-auto text-xl-start">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-box text-center">
                  <Link className="text-decoration-none" to={"/doctors/ENT"}>
                    <img
                      className="mb-3 deparment-icon"
                      src="https://technext.github.io/live-doc/v1.0.0/assets/img/icons/ent.png"
                      alt="..."
                    />
                    <img
                      className="mb-3 deparment-icon-hover"
                      src="	https://technext.github.io/live-doc/v1.0.0/assets/img/icons/ent.svg"
                      alt="..."
                    />
                    <p className="para-size text-center">ENT</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Department;
