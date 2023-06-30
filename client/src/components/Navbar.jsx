import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import avatar from "../images/avatar.png";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const PF = "http://localhost:5000/images/";
  const handleLogout = () => {
    dispatch(logout());
    console.log("logout");
    navigate("/");
  };

  const navigatePage = (path) => {
    navigate(`/${path}`);
    setMenu(false);
  };

  return (
    <div className="shadow-md w-full sticky top-0 left-0 z-[999] select-none">
      <div className="flex items-center justify-between bg-white py-5 lg:px-10 px-7">
        <div className="flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl text-title font-bold text-bl cursor-pointer sm:text-lg"
          >
            Namdo Blog
          </h1>
        </div>

        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in lg:shadow-none shadow-xl ${
            menu ? " top-16" : "top-[-490px]"
          }`}
        >
          <li onClick={() => navigatePage("")} className="nav-items">
            Home
          </li> 
          <li onClick={() => navigatePage("write")} className="nav-items">
            Write
          </li>
          {currentUser && (
            <li onClick={handleLogout} className="nav-items">
              Logout
            </li>
          )}
        </ul>
        <div className="flex items-center gap-6">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span>{currentUser.username}</span>
              {currentUser.profilePicture ? (
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
                  onClick={() => navigate("/account")}
                  src={PF + currentUser.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
                  onClick={() => navigate("/account")}
                  src={avatar}
                  alt="Avatar"
                />
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn shadow-lg shadow-sky-500"
            >
              Log in
            </button>
          )}
          <button
            className="lg:hidden block mx-2 "
            onClick={() => setMenu(!menu)}
          >
            {menu ? <MdClose size={40} /> : <MdMenu size={40} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
