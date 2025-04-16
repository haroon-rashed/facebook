import { FaMoon } from "react-icons/fa";
import { IoIosArrowForward, IoIosHelpCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";

export const account_data =[
    {
        id:1,
        title:'Settings & Privacy',
        icon: <IoSettingsSharp size={30} />,
        arrow: <IoIosArrowForward size={30} />,

    },
    {
        id:2,
        title:'Help & Support',
        icon: <IoIosHelpCircle size={30} />,
        arrow: <IoIosArrowForward size={30} />,

    },
    {
        id:3,
        title:'Data & Accessibility',
        icon: <FaMoon size={30} />,
        arrow: <IoIosArrowForward size={30} />,
    },
    {
        id:4,
        title:'Feedback',
        icon: <IoSettingsSharp size={30} />,

    },
    {
        id:5,
        title:'Logout',
        icon: <IoSettingsSharp size={30} />,

    },
]