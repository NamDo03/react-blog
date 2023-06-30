import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, SetError] = useState(false);
  const { isFetching } = useSelector((state) => state.user);

  //Regex Email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Email
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required.");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  // Validate Password
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (!emailError && !passwordError) {
      dispatch(loginStart());
      try {
        const response = await axios.post("/auth/login", { email, password });
        dispatch(loginSuccess(response.data));
        navigate("/");
      } catch (error) {
        dispatch(loginFailure(error.message));
      }
    } else {
      SetError(true);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen circle-container">
      <div className="h-full w-1/2 bg-[#647CF5] tablet:hidden"></div>
      <div className="h-full w-1/2 bg-[#E7EAF3] circle tablet:w-full"></div>

      <div className="w-[60vw] min-h-[80vh] sm:w-[100vw] flex rounded-xl overflow-hidden absolute shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="bg-[#6A83FC] w-1/2 p-20 flex justify-center flex-col circleT tablet:hidden">
          <h1 className="text-white text-6xl font-medium mb-5 circleB">
            Advanture start here
          </h1>
          <span className="text-white text-xl font-sans font-normal">
            Create and account to Join Our Community
          </span>
        </div>

        <form
          className="bg-[#F5F6FA] w-1/2 p-16 tablet:w-full"
          onSubmit={handleLogin}
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 text-[#6A83FC]">Login</h1>
            <span>Hello! Welcome back</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-8">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full gap-2 relative">
                <label>Email</label>
                <input
                  className="px-9 py-3"
                  type="text"
                  placeholder="Enter your email ..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdEmail
                  size={20}
                  className="text-[#6A83FC] absolute bottom-[14px] left-2 "
                />
              </div>
              {emailError && (
                <span className="text-red-400 text-sm">{emailError}</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full gap-2 relative">
                <label>Password</label>
                <input
                  className="px-9 py-3"
                  type="password"
                  placeholder="Enter your password ..."
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <GiPadlock
                  size={20}
                  className="text-[#6A83FC] absolute bottom-[14px] left-2 "
                />
              </div>
              {passwordError && (
                <span className="text-red-400 text-sm">{passwordError}</span>
              )}
            </div>
            <button
              disabled={isFetching}
              className="bg-[#6A83FC] text-white py-3 px-4 rounded w-full hover:opacity-70 hover:text-black"
            >
              Login
            </button>
            {error && (
              <span className="text-red-400">
                Invalid email/password combination....
              </span>
            )}
            <span className="text-sm font-sans">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#A7BEFF] hover:underline">
                Create Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
