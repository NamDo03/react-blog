import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const PF = "http://localhost:5000/images/";
  const [isHovered, setIsHovered] = useState(false);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/post/${post._id}`)}
      className="w-[385px] mb-14 mt-0 mx-6"
    >
      {post.photo && (
        <div className="relative cursor-pointer">
          <img
            className="w-full h-[280px] object-cover rounded-3xl"
            src={PF + post.photo}
            alt=""
          />
          {isHovered && (
            <div className="w-full h-[280px] rounded-3xl bg-black/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <RxArrowTopRight
                color="white"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-500 rounded-full w-[70px] h-[70px] p-5"
              />
            </div>
          )}
        </div>
      )}
      <div className="px-6 pt-7 flex gap-7 flex-col">
        <div className="flex gap-4">
          {post.categories.map((cat) => (
            <span key={cat} className="text-sky-500">
              {cat}
            </span>
          ))}
        </div>
        <h2 className="text-title text-2xl font-semibold cursor-pointer">
          {post.title}
        </h2>
        <span className="text-zinc-500 font-sans">
          {truncateString(post.desc, 150)}
        </span>
        <div className="flex items-center justify-between">
          <span className="text-base">{post.username}</span>
          <span className="text-zinc-500 font-sans text-sm">
            {" "}
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
