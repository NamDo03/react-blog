import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Write = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      username: currentUser.username,
      profilePicture: currentUser.profilePicture,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
      toast.success("Publish Post Successful.");
    } catch (err) {
      console.log(err);
      toast.error("Publish Post Failed.");
    }
  };
  return (
    <div className="pt-14">
      {file && (
        <img
          className="ml-[150px] w-[70vw] h-[350px] object-cover rounded-lg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="relative" onSubmit={handleSubmit}>
        <div className="ml-[150px] sm:ml-[20px] flex items-center">
          <label htmlFor="fileInput">
            <MdAdd
              size={36}
              className="border-2 rounded-full cursor-pointer border-black"
            />
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="text-3xl p-5 w-[70vw] focus:outline-none"
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="ml-[150px] sm:ml-[20px] flex items-center">
          <textarea
            className="text-2xl p-5 w-[70vw] focus:outline-none"
            placeholder="Tell your story ..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button
          className="btn absolute top-5 right-12 rounded-lg"
          type="submit"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
