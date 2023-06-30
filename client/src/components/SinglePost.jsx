import React, { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SinglePost = () => {
  const PF = "http://localhost:5000/images/";
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: currentUser.username },
      });
      toast.success("Deleted Post Successful.");
      window.location.replace("/");
    } catch (err) {
      toast.success("Deleted Post Failed.");
      console.log(err.response);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: currentUser.username,
        title,
        desc,
      });
      toast.success("Updated Post Successful.");
      setUpdateMode(false);
    } catch (err) {
      toast.success("Updated Post Failed.");
      console.log(err.response);
    }
  };

  return (
    <div className="flex-[10]">
      <div className="p-5 flex flex-col">
        {post.photo && (
          <img
            className="w-full h-[400px] object-cover rounded"
            src={PF + post.photo}
            alt={post.title}
          />
        )}
        {updateMode ? (
          <input
            className="my-3 text-2xl text-title text-center border-b-2 border-slate-500 rounded-md py-2 focus:outline-none focus:border-b-sky-500"
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-center m-3 text-2xl text-title">
            {title}
            {post.username === currentUser?.username && (
              <div className="float-right flex gap-5">
                <FaRegEdit
                  onClick={() => setUpdateMode(true)}
                  className="cursor-pointer text-green-500"
                  size={24}
                />
                <FaRegTrashAlt
                  onClick={handleDelete}
                  className="cursor-pointer text-red-500"
                  size={24}
                />
              </div>
            )}
          </h1>
        )}

        <div className="mb-5 flex justify-between text-lg text-sky-500">
          <span>
            Autor:{" "}
            <b
              className="cursor-pointer"
              onClick={() => navigate(`/?user=${post.username}`)}
            >
              {post.username}
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="text-base text-zinc-500 font-sans border-2 border-slate-500 rounded-md p-2 focus:outline-none focus:border-sky-500"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="text-zinc-500 font-sans text-base first-letter:ml-5 first-letter:text-3xl first-letter:font-bold">
            {desc}
          </p>
        )}
        {updateMode && (
          <button
            onClick={handleUpdate}
            className="btn rounded-lg w-[150px] self-end mt-6"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
