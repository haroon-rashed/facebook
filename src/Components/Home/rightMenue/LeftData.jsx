import { BsCalendar2EventFill } from "react-icons/bs";
import { FaBookOpen, FaEdit, FaFlag, FaStar } from "react-icons/fa";
import { FcFilmReel } from "react-icons/fc";
import { HiSpeakerphone } from "react-icons/hi";
import { MdGroups } from "react-icons/md";

export const left_data = [
    {
        id:1,
        title: 'post',
        icon: <FaEdit size={25} />,
    },
    {
        id:2,
        title: 'story',
        icon: <FaBookOpen size={25} />,
    },
    {
        id:3,
        title: 'reel',
        icon: <FcFilmReel size={25} />,
    },
    {
        id:4,
        title: 'life event',
        icon: <FaStar size={25} />,
    },
    {
        id:5,
        title: 'page',
        icon: <FaFlag size={25} />,
    },
    {
        id:6,
        title: 'add',
        icon: <HiSpeakerphone size={25} />,
    },
    {
        id:7,
        title: 'group',
        icon: <MdGroups size={25} />,
    },
    {
        id:8,
        title: 'event',
        icon: <BsCalendar2EventFill size={25} />,
    },
]