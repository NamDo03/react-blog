import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, SetError] = useState(false);

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

  // Validate Username
  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
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

  //Onchange Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  //Onchange Username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    validateUsername();
  };

  //Onchange Password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validateUsername();
    validatePassword();
    if (!emailError && !usernameError && !passwordError) {
      try {
        const res = await axios.post("/auth/signup", {
          email,
          username,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      SetError(true);
      console.log("Please fill in all the required fields correctly.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen circle-container">
        <div className="h-full w-1/2 bg-[#647CF5] tablet:hidden"></div>
        <div className="h-full w-1/2 bg-[#E7EAF3] circle tablet:w-full"></div>

        <div className="w-[60vw] min-h-[80vh] sm:w-[100vw] flex rounded-xl overflow-hidden absolute shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <div className="bg-[#6A83FC] w-1/2 p-20 flex justify-center flex-col circleT tablet:hidden">
            <h1 className="text-white text-6xl font-medium mb-5 circleB">
              Hello, Friend!
            </h1>
            <span className="text-white text-xl font-sans font-normal">
              Enter your personal details and start journey with us
            </span>
          </div>

          <form
            className="bg-[#F5F6FA] w-1/2 p-16 tablet:w-full"
            onSubmit={handleSubmit}
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-3 text-[#6A83FC]">Signup</h1>
              <span>Create an Account</span>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col w-full gap-2 relative">
                  <label>Email</label>
                  <input
                    className="px-9 py-3"
                    type="text"
                    placeholder="Enter your email ..."
                    onChange={handleEmailChange}
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
                  <label>Username</label>
                  <input
                    className="px-9 py-3"
                    type="text"
                    placeholder="Enter your username ..."
                    onChange={handleUsernameChange}
                    required
                  />
                  <FaUser
                    size={20}
                    className="text-[#6A83FC] absolute bottom-[14px] left-2 "
                  />
                </div>
                {usernameError && (
                  <span className="text-red-400 text-sm">{usernameError}</span>
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
                    onChange={handlePasswordChange}
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
              <button className="bg-[#6A83FC] text-white py-3 px-4 rounded w-full hover:opacity-70 hover:text-black">
                Signup
              </button>
              {error && (
                <span className="text-red-400 text-sm">
                  Please fill in all the required fields correctly.
                </span>
              )}
              <span className="text-sm font-sans">
                Already a account?{" "}
                <Link to="/login" className="text-[#A7BEFF] hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
