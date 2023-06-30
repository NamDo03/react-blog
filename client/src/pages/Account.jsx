import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import { toast } from "react-toastify";

const Account = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    const updateUser = {
      userId: currentUser._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/users/" + currentUser._id, updateUser);
      dispatch(updateSuccess(res.data));
      toast.success("Updated successfully.");
    } catch (err) {
      dispatch(updateFailure(err.message));
      toast.error("Updated Failure.");
    }
  };
  return (
    <div className="flex">
      <div className="flex-[10] p-5">
        <div className="flex items-center justify-between">
          <span className="text-3xl text-title mb-5 sm:text-xl">Update Your Account</span>
          <span className="text-[16px] text-red-500 cursor-pointer sm:text-[12px]">
            Delete Account
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-lg mt-5">Profile Picture</label>
          <div className="flex items-center my-3">
            <img
              className="w-[70px] h-[70px] rounded-2xl object-cover"
              src={
                file
                  ? URL.createObjectURL(file)
                  : PF + currentUser.profilePicture
              }
              alt=""
            />
            <label className="text-lg mt-5" htmlFor="fileInput">
              <BiUserCircle
                size={36}
                className="bg-title text-white rounded-full p-1 cursor-pointer ml-3"
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="text-lg mt-5">Username</label>
          <input
            className="text-zinc-500 my-3 h-[30px] border-b outline-none"
            type="text"
            placeholder={currentUser.username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-lg mt-5">Email</label>
          <input
            className="text-zinc-500 my-3 h-[30px] border-b outline-none"
            type="email"
            placeholder={currentUser.email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-lg mt-5">Password</label>
          <input
            className="text-zinc-500 my-3 h-[30px] border-b outline-none"
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn w-[150px] self-center mt-5 rounded-xl">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Account;
