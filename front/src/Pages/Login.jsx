import React from "react";
import "./Login.css";
import Register from "../Componets/LoginOrReg/Register";
import LoginForm from "../Componets/LoginOrReg/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { changeLogReg } from "../REDUX/userAuthenticationSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigator = useNavigate();
  const loginRegister = useSelector(
    (state) => state.userAth.loginRegPage ?? "Login"
  );
  const dispatch = useDispatch();

  return (
    <section className="login-main">
      <div className="loginbackimg"></div>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>{loginRegister === "Sign Up" ? "Create Account" : "Login"}</div>
        </div>

        {loginRegister === "Sign Up" ? <Register /> : <LoginForm />}

        <br />
        {loginRegister === "Sign Up" ? (
          <p className="text-center registerPage">
            Already have Account?{" "}
            <span onClick={() => dispatch(changeLogReg("Login"))}>
              Login In
            </span>
          </p>
        ) : (
          <p className="text-center registerPage">
            Not a member?{" "}
            <span onClick={() => dispatch(changeLogReg("Sign Up"))}>
              Create Account
            </span>
          </p>
        )}
        <p className="doctor-login">
          Are you a Doctor?{" "}
          <span
            onClick={() => {
              navigator("/docLogin");
            }}
          >
            Doctor login
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
