import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { API, googleAuth } from "../../AXIOS";
import toast from "react-hot-toast";
import styles from "./EmailOtpVerfication.module.css";
import { isOtpVerfiy, userEmail } from "../../REDUX/otpVerfiction";
import {
  changeLogReg,
  getLoginInfo,
} from "../../REDUX/userAuthenticationSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function EmailOtpVerfication() {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmailOtp = useSelector(
    (state) => state.otpVerfication.emailOtp ?? false
  );

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    otp: yup.string(),
  });

  const handleForm = async (logData) => {
    if (isEmailOtp) {
      try {
        const res = await API.post(
          "/otp",
          {
            email: logData.email,
            otp: logData.otp,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(userEmail(res.data.user));
          dispatch(changeLogReg("OTPapprove"));
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
    } else {
      try {
        const res = await API.post(
          "/emailcheck",
          {
            email: logData.email,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(isOtpVerfiy(true));
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
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const res = await googleAuth(authResult.code);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                otp: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label>Email verfiction</Form.Label>
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

                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.invalidFeedback}
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {isEmailOtp && (
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>OTP</Form.Label>
                      <Form.Control
                        type="otp"
                        placeholder="Enter your OTP"
                        name="otp"
                        className={styles.formControl}
                        value={values.otp}
                        onChange={handleChange}
                        isValid={touched.otp && !errors.otp}
                        isInvalid={!!errors.otp}
                      />

                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.invalidFeedback}
                      >
                        {errors.otp}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {isEmailOtp ? (
                    <Button type="submit" className={styles.submitButton}>
                      OTP submit
                    </Button>
                  ) : (
                    <Button type="submit" className={styles.submitButton}>
                      Email verfiy
                    </Button>
                  )}
                </Form>
              )}
            </Formik>

            <button className={styles.googleBtn} onClick={handleGoogle}>
              <img
                className={styles.googlIcon}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMjIuNTYgMTIuMjVjMC0uNzgtLjA3LTEuNTMtLjItMi4yNUgxMnY0LjI2aDUuOTJjLS4yNiAxLjM3LTEuMDQgMi41My0yLjIxIDMuMzF2Mi43N2gzLjU3YzIuMDgtMS45MiAzLjI4LTQuNzQgMy4yOC04LjA5eiIvPjxwYXRoIGZpbGw9IiMzNEE4NTMiIGQ9Ik0xMiAyM2MyLjk3IDAgNS40Ni0uOTggNy4yOC0yLjY2bC0zLjU3LTIuNzdjLS45OC42Ni0yLjIzIDEuMDYtMy43MSAxLjA2LTIuODYgMC01LjI5LTEuOTMtNi4xNi00LjUzSDIuMTh2Mi44NEM0IDE5LjUgNy43IDIzIDEyIDIzeiIvPjxwYXRoIGZpbGw9IiNGQkJDMDUiIGQ9Ik01Ljg0IDE0LjA5Yy0uMjItLjY2LS4zNS0xLjM2LS4zNS0yLjA5cy4xMy0xLjQzLjM1LTIuMDlWNy4wN0gyLjE4QzEuNDMgOC41NSAxIDEwLjIyIDEgMTJzLjQzIDMuNDUgMS4xOCA0LjkzbDIuODUtMi4yMi44MS0uNjJ6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTEyIDUuMzhjMS42MiAwIDMuMDYuNTYgNC4yMSAxLjY0bDMuMTUtMy4xNUMxNy40NSAyLjA5IDE0Ljk3IDEgMTIgMSA3LjcgMSAzLjk5IDMuNDcgMi4xOCA3LjA3bDMuNjYgMi44NGMuODctMi42IDMuMy00LjUzIDYuMTYtNC41M3oiLz48L3N2Zz4="
                alt="google"
              />
              Sign in with Google
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailOtpVerfication;
