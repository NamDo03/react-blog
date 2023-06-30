import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Posts from "../components/Posts";

const Search = () => {
  const location = useLocation();
  const keywords = new URLSearchParams(location.search).get("keywords");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts?title=${keywords}`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (keywords) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [keywords]);

  return (
    <div className="mt-[70px]">
      {posts.length === 0 ? (
        <p className="text-center text-2xl">
          {" "}
          {`Your search for "${keywords}" did not have any matches.`}
        </p>
      ) : (
        <Posts posts={posts} />
      )}
    </div>
  );
};

export default Search;
