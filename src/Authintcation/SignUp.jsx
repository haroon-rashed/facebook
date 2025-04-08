import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { PiWarningOctagonFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showEye, setShowEye] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({
    f_name: false,
    l_name: false,
    email: false,
    password: false,
    gender: false,
    pronoun: false
  });
  const [loginVar, setLoginVar] = useState({
    email: "",
    password: "",
    f_name: "",
    l_name: "",
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    gender: "",
    pronoun: ''
  });
  const { email, password, f_name, l_name, date, month, year, gender, pronoun } = loginVar;

  useEffect(() => {
    setShowEye(password.length > 0);
  }, [password]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const years = [];
  for (let i = 1905; i <= 2025; i++) {
    years.push(i);
  }

  const handleChange = (e) => {
    setLoginVar({
      ...loginVar,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: false
      });
    }
  };

  const handleBlur = (field) => {
    if (!loginVar[field]) {
      setErrors({
        ...errors,
        [field]: true
      });
    } else {
      setErrors({
        ...errors,
        [field]: false
      });
    }
  };

  return (
    <>
      <div className="my-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Facebook_logo_%282023%29.svg/2560px-Facebook_logo_%282023%29.svg.png"
          className="w-[300px] block mx-auto"
          alt="Facebook Logo"
        />
        <div className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[35%] mx-auto bg-[#FFFFFF] shadow-2xl my-3 rounded-md p-3">
          <form>
            <h2 className="text-black text-2xl font-bold text-center">Create a new account</h2>
            <p className="text-gray-400 text-center my-2">It's quick and easy</p>
            <hr className="border-0 h-[1px] bg-gray-300" />

            <div className="md:flex gap-3 my-3">
              <div className="relative w-full">
                <input
                  name="f_name"
                  value={f_name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("f_name")}
                  type="text"
                  placeholder="First Name"
                  className={`p-3 w-full ${errors.f_name ? 'border-red-500' : 'text-gray-500 focus:border-blue-400'} outline-0 border border-gray-300 rounded-md`}
                />
                {errors.f_name && <PiWarningOctagonFill size={25} className="absolute text-red-500 right-3 top-[50%] -translate-y-[50%]"/>}
              </div>
              <div className="relative w-full">
                <input
                  name="l_name"
                  value={l_name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("l_name")}
                  type="text"
                  placeholder="Surname"
                  className={`p-3 w-full ${errors.l_name ? 'border-red-500' : 'text-gray-500 focus:border-blue-400'} outline-0 border border-gray-300 rounded-md`}
                />
                {errors.l_name && <PiWarningOctagonFill size={25} className="absolute text-red-500 right-3 top-[50%] -translate-y-[50%]"/>}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-gray-400 my-2 text-sm">Date of Birth</p>
              <FaQuestionCircle color="gray" size={15} />
            </div>

            <div className="md:flex gap-2 my-1">
              <select
                value={date}
                onChange={handleChange}
                className="p-3 w-full text-gray-500 outline-0 border border-gray-300 focus:border-blue-400 rounded-md"
                name="date"
              >
                {Array.from({ length: 31 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>

              <select
                className="p-3 w-full text-gray-500 outline-0 border border-gray-300 focus:border-blue-400 rounded-md"
                name="month"
                value={month}
                onChange={handleChange}
              >
                {months.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="p-3 w-full text-gray-500 outline-0 border border-gray-300 focus:border-blue-400 rounded-md"
                name="year"
                value={year}
                onChange={handleChange}
              >
                {years.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2 items-center">
              <p className="text-gray-400 my-2 text-sm">Select Gender</p>
              <FaQuestionCircle color="gray" size={15} />
            </div>

            <div className="md:flex gap-2 my-1">
              <div 
                onClick={() => {
                  setLoginVar({...loginVar, gender: "male"});
                  setErrors({...errors, gender: false});
                }}
                className={`flex justify-between items-center p-3 text-gray-500 border w-full rounded-md cursor-pointer ${errors.gender ? 'border-red-500' : 'border-gray-300'} ${gender === "male" ? "border-blue-500 bg-blue-50" : ""}`}
              >
                <p>Male</p>
                <input 
                  type="radio" 
                  checked={gender === "male"}
                  onChange={() => {}} 
                  value="male" 
                  name="gender"
                  className="cursor-pointer"
                />
              </div>
              
              <div 
                onClick={() => {
                  setLoginVar({...loginVar, gender: "female"});
                  setErrors({...errors, gender: false});
                }}
                className={`flex justify-between items-center p-3 text-gray-500 border w-full rounded-md cursor-pointer ${errors.gender ? 'border-red-500' : 'border-gray-300'} ${gender === "female" ? "border-blue-500 bg-blue-50" : ""}`}
              >
                <p>Female</p>
                <input 
                  type="radio" 
                  checked={gender === "female"}
                  onChange={() => {}} 
                  value="female" 
                  name="gender"
                  className="cursor-pointer"
                />
              </div>
              
              <div 
                onClick={() => {
                  setLoginVar({...loginVar, gender: "custom"});
                  setErrors({...errors, gender: false});
                }}
                className={`flex justify-between items-center p-3 text-gray-500 border w-full rounded-md cursor-pointer ${errors.gender ? 'border-red-500' : 'border-gray-300'} ${gender === "custom" ? "border-blue-500 bg-blue-50" : ""}`}
              >
                <p>Custom</p>
                <input 
                  type="radio" 
                  checked={gender === "custom"}
                  onChange={() => {}} 
                  value="custom" 
                  name="gender"
                  className="cursor-pointer"
                />
              </div>
            </div>

            {gender === "custom" && (
              <div className="custom">
                <select
                  value={pronoun}
                  onChange={handleChange}
                  onBlur={() => handleBlur("pronoun")}
                  name="pronoun"
                  className={`outline-0 focus:border-blue-500 my-2 w-full text-gray-500 border ${errors.pronoun ? 'border-red-500' : 'border-gray-300'} rounded-md p-3`}
                >
                  <option value="">Select your pronoun</option>
                  {[
                    `She: "Wish her a happy birthday!"`,
                    `He: "Wish him a happy birthday!"`,
                    `They: "Wish them a happy birthday!"`,
                  ].map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative">
              <input
                value={email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                name="email"
                type="text"
                placeholder="Enter Username or Email"
                className={`outline-0 focus:border-blue-500 my-2 w-full text-gray-500 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3`}
              />
              {errors.email && <PiWarningOctagonFill size={25} className="absolute text-red-500 right-3 top-[50%] -translate-y-[50%]"/>}
            </div>

            <div className="relative w-full">
              <input
                value={password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                name="password"
                type={visible ? "text" : "password"}
                placeholder="Enter Password"
                className={`outline-0 focus:border-blue-500 my-2 border w-full text-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 pr-10`}
              />
              {showEye && (
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <AiOutlineEye className="h-6 w-6" /> : <AiOutlineEyeInvisible className="h-6 w-6" />}
                </button>
              )}
              {errors.password && <PiWarningOctagonFill size={25} className="absolute text-red-500 right-10 top-[50%] -translate-y-[50%]"/>}
            </div>

            <p className="text-[0.8rem] text-gray-500 my-2">
              People who use our service may have uploaded your contact information to Facebook.{" "}
              <span className="text-black underline cursor-pointer">Learn more.</span>
            </p>
            <p className="text-[0.8rem] text-gray-500 my-2">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
            </p>

            <Link to="/" className="text-white bg-green-500 cursor-pointer px-3 py-2 my-2 block text-center font-semibold mx-auto my-3 rounded-sm">
              SignUp
            </Link>

            <Link to="/" className="text-center text-blue-500 p-3 cursor-pointer hover:underline block">Already have an account?</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
