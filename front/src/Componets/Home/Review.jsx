import React, { useState } from "react";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";

function Review() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReview = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await API.post("/review", formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", message: "" });
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
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <section className="py-5 mt-3">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3 dept-reltive">
              <h1 className="text-center dept-header">REVIEW</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg">
        <div className="container main">
          <div className="row post-rel">
            <div className="col-lg-6 z-index-2 mb-5">
              <img
                className="w-100"
                src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/appointment.png"
                alt="Review Illustration"
              />
            </div>
            <div className="col-lg-6 z-index-2">
              <form className="row g-3" onSubmit={handleReview}>
                <div className="col-md-6">
                  <input
                    className="form-control form-livedoc-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control form-livedoc-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control form-livedoc-messages"
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary rounded-pill w-100"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
