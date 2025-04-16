import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { sidebar_data } from "../../../Data/SideBarData";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};

const SideBar = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? sidebar_data : sidebar_data.slice(0, 7);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="flex flex-col gap-2 min-h-[86vh] p-4 bg-white w-64">
      <ul className="flex flex-col gap-3">
        {/* User Profile */}
        <li className="flex gap-3 p-2 items-center">
          <div className="flex items-center justify-center bg-gray-300 rounded-full h-[30px] w-[30px] text-gray-700">
            <FaUser size={20} />
          </div>
          <p className="text-lg font-medium">Haroon Rasheed</p>
        </li>

        {/* Sidebar Items with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-3"
        >
          {visibleItems.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.heading}
                className="h-6 w-6"
              />
              <p className="text-base">{item.heading}</p>
            </motion.li>
          ))}
        </motion.div>

        {/* Show More / Less Button */}
        <li
          className="flex gap-3 items-center bg-gray-100 p-2 rounded-lg cursor-pointer"
          onClick={handleToggle}
        >
          <div
            className={`w-[30px] h-[30px] rounded-full bg-gray-200 flex justify-center items-center transition-transform duration-300 ${
              showAll ? "rotate-180" : ""
            }`}
          >
            <RiArrowDropDownLine size={20} />
          </div>
          <p className="text-base text-gray-500">
            {showAll ? "Show less" : "Show more"}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
