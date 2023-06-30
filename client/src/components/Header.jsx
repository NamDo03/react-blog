import React, { useState } from "react";
import bg from "../images/bg1.jpeg";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");

  const handleChangeInput = (e) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    if (keywords.length > 0) {
      navigate(`/search?keywords=${encodeURIComponent(keywords.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-9 relative select-none">
      <div
        className="bg-fixed flex items-center justify-center w-[90%] h-[250px] bg-no-repeat bg-center bg-cover rounded-3xl"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2 className="text-4xl text-white">Blog</h2>
      </div>

      <div className="absolute bottom-2 w-[40%] rounded-xl z-50 drop-shadow-xl">
        <FiSearch size={24} className="absolute left-3 top-4" />
        <input
          className="py-4 px-12 w-full rounded-xl"
          placeholder="Search"
          onChange={handleChangeInput}
          value={keywords}
        />
      </div>
    </div>
  );
};

export default Header;
