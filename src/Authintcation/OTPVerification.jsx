import { useState, useRef, useEffect } from 'react';
// import './OTPVerification.css';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { resetUser, verifyUserAsync } from '../features/users/userSlice';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(45);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userError, userSuccess, userMessage } = useSelector((state) => state.user);

  
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  
  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }
    if (userSuccess) {
      toast.success(userMessage);
      navigate('/home');
    }
    dispatch(resetUser());
  }, [userError, userSuccess, userMessage, dispatch, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (/^[0-9]{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('').slice(0, 6);
      setOtp(pasteArray);
      inputRefs.current[5].focus();
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setIsSubmitting(true);

    const otpData = {
      otp: enteredOtp,
      id: user?._id,
    };

    await dispatch(verifyUserAsync(otpData));

    setIsSubmitting(false);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setResendTimer(45);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();

    toast.success('OTP code resent successfully!');
    console.log('Simulating OTP resend...');
    // Later you will call your actual resend OTP API here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verify your identity</h2>
          <p className="mt-2 text-sm text-gray-600">We've sent a 6-digit code to your registered device</p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10 transition-all duration-300 hover:shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none transition-all duration-200 ${error ? 'border-red-500 shake' : digit ? 'border-indigo-500' : 'border-gray-300 hover:border-gray-400'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 flex items-center justify-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300`}
              >
                {isSubmitting ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Didn't receive code?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleResendOtp}
                disabled={isResendDisabled}
                className={`font-medium text-sm flex items-center justify-center mx-auto ${
                  isResendDisabled ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-500'
                } transition-colors duration-300`}
              >
                {isResendDisabled ? `Resend code in ${resendTimer}s` : 'Resend verification code'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
