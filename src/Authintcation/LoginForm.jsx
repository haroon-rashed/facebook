import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync, resetUser } from "../features/users/userSlice";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";

const LoginForm = () => {
    const [showEye, setShowEye] = useState(false);
    const [count, setCount] = useState(0);
    const [blocked, setBlocked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [timer, setTimer] = useState(30);

    const [loginVar, setLoginVar] = useState({
        email: "",
        password: "",
    });

    const { email, password } = loginVar;

    const handleChange = (e) => {
        setLoginVar((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { user, userError, userSuccess, userLoading, userMessage } = useSelector(
        (state) => state.user
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();

        if (blocked) {
            toast.error("Login is temporarily disabled. Please wait.");
            return;
        }

        dispatch(resetUser());

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        const userData = {
            m_mail: email,
            password,
        };
        dispatch(loginUserAsync(userData));
    };

    useEffect(() => {
        if (userError) {
            toast.error(userMessage);
            setCount((prev) => {
                const newCount = prev + 1;
                if (newCount === 5) {
                    setBlocked(true);
                    toast.error("You are blocked for 30 seconds");
                }
                return newCount;
            });
        }

        if (userSuccess && user) {
            toast.success(userMessage);
            navigate("/home");
            setCount(0);
        }
    }, [userError, userSuccess, user, userMessage, navigate]);

    useEffect(() => {
        let interval;
        if (blocked) {
            setTimer(30);
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setBlocked(false);
                        setCount(0);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [blocked]);

    useEffect(() => {
        setShowEye(password.length > 0);
    }, [password]);

    return (
        <div>
            <div className="w-[90%] md:w-[70%] p-3 mx-auto shadow-2xl bg-[#FFFFFF]">
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4 p-3 rounded-sm"
                >
                    <input
                        value={email}
                        onChange={handleChange}
                        name="email"
                        type="text"
                        placeholder="Enter Username or Email"
                        className="outline-0 focus:border-blue-500 w-full border border-gray-300 rounded-md p-2"
                        disabled={blocked || userLoading}
                    />
                    <div className="relative w-full">
                        <input
                            value={password}
                            onChange={handleChange}
                            name="password"
                            type={visible ? "text" : "password"}
                            placeholder="Enter Password"
                            className="outline-0 focus:border-blue-500 border w-full border-gray-300 rounded-md p-2 pr-10"
                            disabled={blocked || userLoading}
                        />
                        {showEye && (
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500"
                                onClick={() => setVisible(!visible)}
                            >
                                {visible ? (
                                    <AiOutlineEye className="h-6 w-6" />
                                ) : (
                                    <AiOutlineEyeInvisible className="h-6 w-6" />
                                )}
                            </button>
                        )}
                    </div>

                    <button
                        disabled={blocked || userLoading}
                        type="submit"
                        className={`${
                            blocked || userLoading ? "bg-gray-400" : "bg-blue-500"
                        } rounded-md w-full text-white font-semibold p-2`}
                    >
                        {userLoading ? (
                            <div className="flex justify-center items-center w-full">
                                <ClockLoader size={25} color="white" />
                            </div>
                        ) : blocked ? (
                            `Login disabled (${timer}s)`
                        ) : (
                            "Log In"
                        )}
                    </button>

                    <p className="text-center text-blue-500 p-3 hover:underline cursor-pointer">
                        Forgotten Password?
                    </p>

                    <hr className="h-[1px] bg-gray-300 border-0" />

                    <Link
                        to="/register"
                        className="text-white bg-green-500 cursor-pointer px-3 py-2 font-semibold mx-auto my-3 rounded-sm"
                    >
                        Create a new account
                    </Link>
                </form>
            </div>

            <p className="text-gray-500 my-5 text-center">
                <span className="text-black font-semibold">Create a page</span> for a
                celebrity, brand, or business
            </p>
        </div>
    );
};

export default LoginForm;
