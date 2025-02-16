import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getLoginInfo } from "../../REDUX/userAuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import styles from "./LoginForm.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleForm = async (logData) => {
    try {
      const res = await API.post(
        "/log",
        {
          email: logData.email,
          password: logData.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          getLoginInfo({
            user: res.data.user,
            athetication: true,
            token: res.data.token,
          })
        );

        navigate("/userProfile");
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
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container fluid className={styles.registrationContainer}>
      <Row className={styles.formRow}>
        <Col className={styles.formColumn}>
          <div className={styles.formWrapper}>
            {/* <h2 className={styles.formTitle}>Welcome Back</h2>
            <p className={styles.formSubtitle}>Sign in to continue</p> */}
            <Formik
              validationSchema={schema}
              onSubmit={handleForm}
              initialValues={{
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
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
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
