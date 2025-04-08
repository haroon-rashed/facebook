import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showEye, setShowEye] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loginVar, setLoginVar] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginVar;

  const handleChange = (e) => {
    setLoginVar((prev) => ({
      ...prev, // ✅ Spread the previous state correctly
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setShowEye(password.length > 0); // ✅ This will ensure correct behavior
  }, [password]);

  return (
    <div>
      <div className="w-[90%] md:w-[70%] p-3 mx-auto shadow-2xl bg-[#FFFFFF]">
        <form className="flex flex-col gap-4 p-3 rounded-sm">
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Enter Username or Email"
            className="outline-0 focus:border-blue-500 w-full border border-gray-300 rounded-md p-2"
          />

          <div className="relative w-full">
            <input
              value={password}
              onChange={handleChange}
              name="password"
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              className="outline-0 focus:border-blue-500 border w-full border-gray-300 rounded-md p-2 pr-10"
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

          <button className="bg-blue-500 rounded-md w-full text-white font-semibold p-2">
            Log In
          </button>

          <p className="text-center text-blue-500 p-3 hover:underline cursor-pointer">Forgotten Password?</p>

          <hr className="h-[1px] bg-gray-300 border-0" />

          <Link to='/registor' className="text-white bg-green-500 cursor-pointer px-3 py-2 font-semibold mx-auto my-3 rounded-sm">
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
