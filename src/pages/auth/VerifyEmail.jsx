import { useState, useRef } from "react";
import { Link } from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import CommonButton from "../../common/CommonButton";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next input if value is not empty
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("OTP Entered:", otpValue);
    // TODO: Verify OTP via API
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 sm:py-20 lg:py-24 md:px-6">
      <div className="w-[90%] sm:w-[85%] md:w-[70%] lg:max-w-2xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6 sm:my-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/auth/signup">
              <button className="bg-white p-2 sm:p-2.5 rounded-full text-gray-600 shadow-md cursor-pointer">
                <MdKeyboardArrowLeft size={26} className="sm:size-[30px]" />
              </button>
            </Link>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text_color_light">
                Verify OTP
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Enter the OTP sent to your email
              </p>
            </div>
          </div>
        
        </div>

        {/* OTP Card */}
        <section className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-100 overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-12">
            <div className="auth_logo p-2 sm:p-3 rounded-full bg-white text-white shadow-sm">
              <CiLock size={22} className="sm:size-[24px]" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-medium">
                OTP Verification
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                user@example.com
              </p>
            </div>
          </div>

          {/* OTP Input Fields */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex justify-center gap-3 sm:gap-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
                />
              ))}
            </div>

            <Link to={'/'}>
              <CommonButton type="submit" className="w-full sm:w-auto">
                Verify OTP
              </CommonButton>
            </Link>
          </form>

          <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
            Didn't receive OTP?{" "}
            <button className="text-orange-500 underline">Resend</button>
          </p>
        </section>
      </div>
    </div>
  );
}
