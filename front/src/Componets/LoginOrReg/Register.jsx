import React, { useEffect, useState } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeLogReg } from "../../REDUX/userAuthenticationSlice";
import styles from "./Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    fullName: yup.string().required("enter full name"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("enter password"),
  });

  const handleForm = async (data) => {
    try {
      const res = await API.post(
        "/reg",
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(changeLogReg("Login"));
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row>
        <Col className={styles.formColumn}>
          <div className={styles.formWrapper}>
            <Formik
              validationSchema={schema}
              onSubmit={handleForm}
              initialValues={{
                fullName: "",
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>full name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={values.fullName}
                      className={styles.formControl}
                      onChange={handleChange}
                      isValid={touched.fullName && !errors.fullName}
                      isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      className={styles.formControl}
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback className={styles.validFeedback}>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.invalidFeedback}
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Password</Form.Label>
                    <div className={styles.passwordWrapper}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        className={styles.formControl}
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                      />
                      <span
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <Form.Control.Feedback className={styles.validFeedback}>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.invalidFeedback}
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* <div className={styles.forgotPassword}>
                <a href="/forgot-password">Forgot Password?</a>
              </div> */}

                  <Button type="submit" className={styles.submitButton}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
