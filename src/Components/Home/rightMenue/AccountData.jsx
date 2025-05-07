import { FaRegMoon, FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { MdAccessibilityNew } from "react-icons/md";

export const account_data = [
  {
    id: 1,
    title: "Settings & Privacy",
    icon: <IoSettingsOutline size={20} className="text-gray-600" />,
    arrow: <IoIosArrowForward size={18} className="text-gray-400" />,
  },
  {
    id: 2,
    title: "Help & Support",
    icon: <IoHelpCircleOutline size={20} className="text-gray-600" />,
    arrow: <IoIosArrowForward size={18} className="text-gray-400" />,
  },
  {
    id: 3,
    title: "Data & Accessibility",
    icon: <MdAccessibilityNew size={20} className="text-gray-600" />,
    arrow: <IoIosArrowForward size={18} className="text-gray-400" />,
  },
  {
    id: 4,
    title: "Feedback",
    icon: <MdFeedback size={20} className="text-gray-600" />,
  },
  {
    id: 5,
    title: "Logout",
    icon: <FaSignOutAlt size={20} className="text-gray-600" />,
  },
];
