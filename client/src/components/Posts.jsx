import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className="flex flex-[3] flex-wrap justify-center">
      {posts.map((post) => (
        <Post key={post._id} post={post}/>
      ))}
    </div>
  );
};

export default Posts;
