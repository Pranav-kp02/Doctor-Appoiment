import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./DoctorApply.css";
import { API } from "../AXIOS";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorApply() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const adminCheck = useSelector((state) => state.userAth.user?.role ?? null);

  const onSubmit = async (data) => {
    // const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]); // Append each field to FormData
    // });

    try {
      const res = await API.post(`/docReg`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);

        if (adminCheck === "admin") {
          navigate("/admin/add-doctors");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
    setSubmitted(true);
    reset();
    setImagePreview(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file); // Save the file to react-hook-form
    }
  };

  return (
    <Container fluid className="doctor-apply-container">
      <Row className="justify-content-center my-4">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="doctor-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Apply to be a Doctor
              </Card.Title>

              {/* Doctor Application Form */}
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Name */}
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: /^[^@]+@[^@]+\.[^@]+$/i,
                    })}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message ||
                      "Please enter a valid email address"}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* password*/}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Degree */}
                <Form.Group controlId="degree" className="mb-3">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your degree (e.g. MBBS)"
                    {...register("degree", { required: "Degree is required" })}
                    isInvalid={!!errors.degree}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.degree?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Specialty */}
                <Form.Group controlId="speciality" className="mb-3">
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your specialty (e.g. Neurology)"
                    {...register("speciality", {
                      required: "speciality is required",
                    })}
                    isInvalid={!!errors.speciality}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.speciality?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Experience */}
                <Form.Group controlId="experience" className="mb-3">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter years of experience"
                    {...register("experience", {
                      required: "Experience is required",
                      min: 1,
                    })}
                    isInvalid={!!errors.experience}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.experience?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Fees */}
                <Form.Group controlId="fees" className="mb-3">
                  <Form.Label>Consultation Fees</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter consultation fees"
                    {...register("fees", {
                      required: "Consultation fee is required",
                      min: 1,
                    })}
                    isInvalid={!!errors.fees}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fees?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* About */}
                <Form.Group controlId="about" className="mb-3">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Tell us about yourself"
                    {...register("about", {
                      required: "About section is required",
                    })}
                    isInvalid={!!errors.about}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.about?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Image Upload */}
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Upload Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    isInvalid={!!errors.image}
                  />
                  {imagePreview && (
                    <div className="image-preview-container mt-2">
                      <Image
                        src={imagePreview}
                        roundedCircle
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.image?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="submit-btn-doc-APPly w-100"
                >
                  Submit Application
                </Button>

                {submitted && (
                  <p className="mt-3 text-success">
                    Application Submitted Successfully! <br />
                    We will contact you.
                  </p>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorApply;
