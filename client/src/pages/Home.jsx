import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import Categories from "../components/Categories";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const {search} = useLocation();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      // console.log(res);
      setPosts(res.data)
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Categories />
      <div>
        <Posts posts={posts}/>
      </div>
    </>
  );
};

export default Home;
