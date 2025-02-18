import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import styles from "./EmailOtpVerfication.module.css";
import { isOtpVerfiy, userEmail } from "../../REDUX/otpVerfiction";
import { changeLogReg } from "../../REDUX/userAuthenticationSlice";

function EmailOtpVerfication() {
  const { Formik } = formik;
  const dispatch = useDispatch();

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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailOtpVerfication;
