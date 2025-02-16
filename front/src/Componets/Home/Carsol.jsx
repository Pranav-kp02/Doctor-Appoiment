import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Carsol() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="backImg"></div>
      <div className="container main">
        <div className="row min-vh-xl-100 min-vh-xxl-25 padTop">
          <div className="col-md-5 col-xl-6 col-xxl-6 order-0 order-md-1 text-end">
            <img
              className="pt-md-0 w-100"
              src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/hero.png"
              alt="hero-header"
            />
          </div>
          <div className="col-md-7 col-xl-6 col-xxl-6 text-md-start text-center py-6">
            <h1 className="carsolMessage">
              We're
              <strong> determined </strong>
              for
              <br />
              your&nbsp;
              <strong>better life.</strong>
            </h1>
            <p className="paraMesg">
              You can get the care you need 24/7 – be it online or in <br />
              person. You will be treated by caring specialist doctors.{" "}
            </p>
            <Button className="appBtn" onClick={() => navigate("/doctors")}>
              Make an Appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carsol;
