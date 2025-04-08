import { GiFireplace } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { MdOndemandVideo } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5"; // Correct package

export const navbar_data = [
  {
    id: 1,
    title: "Home",
    icon: <GoHome size={30} />,
    link: "/home",
  },
  {
    id: 2,
    title: "Video",
    icon: <MdOndemandVideo size={30} />,
    link: "/video",
  },
  {
    id: 3,
    title: "Friends",
    icon: <IoPeopleOutline size={30} />,
    link: "/friends",
  },
  {
    id: 4,
    title: "Marketplace",
    icon: <GiFireplace size={30} />,
    link: "/marketplace",
  },
];
