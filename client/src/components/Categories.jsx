import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/categories");
      setCategory(res.data);
    };
    getCategory();
  }, [category]);

  const handleCategoryClick = (item) => {
    setSelectedCategory(item._id);
    navigate(`/?cat=${item.name}`);
  };

  const handleAllCategoryClick = () => {
    setSelectedCategory(null);
    navigate("/");
  };
  return (
    <div>
      <ul className="flex gap-6 my-12 items-center justify-center flex-wrap select-none">
        <li
          onClick={handleAllCategoryClick}
          className={
            selectedCategory === null ? "category-selected" : "category"
          }
        >
          All
        </li>
        {category.map((item) => (
          <li
            onClick={() => handleCategoryClick(item)}
            key={item._id}
            className={
              selectedCategory === item._id ? "category-selected" : "category"
            }
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
