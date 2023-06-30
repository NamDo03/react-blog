import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/categories");
      setCategory(res.data);
    };
    getCategory();
  }, [category]);

  return (
    <div className="flex-[3] hidden flex-col items-center m-5 pb-8 bg-gray-300 rounded-lg xl:flex">
      <div className="flex flex-col items-center">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="mt-4"
          src="https://inc42.com/wp-content/uploads/2022/06/nft-gaming-feature-760x570.png"
          alt=""
        />
        <p className="p-7">
          They are eager to work, whether they want to be great, they want to be
          softened by any pain.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="text-center mb-7">
          {category.map((item) => (
            <li
              onClick={() => navigate(`/?cat=${item.name}`)}
              key={item._id}
              className="inline-block w-[50%] mt-4 cursor-pointer hover:text-sky-500"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="flex gap-5 mt-5 items-center justify-between">
          <FaFacebookSquare size={24} />
          <FaInstagram size={24} />
          <FaGithub size={24} />
          <FaTwitter size={24} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
