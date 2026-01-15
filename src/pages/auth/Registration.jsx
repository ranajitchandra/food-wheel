import { FcGoogle } from "react-icons/fc";
import {
  FaApple,
  FaEnvelope,
  FaLock,
  FaRegEye,
  FaRegEyeSlash,
  FaLongArrowAltLeft,
  FaUser,
  FaCheck,
} from "react-icons/fa";
import mainLogo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    if (strength <= 2)
      return {
        level: "Weak",
        color: "bg-red-500",
        width: "w-1/3",
        textColor: "text-red-500",
      };
    if (strength === 3 || strength === 4)
      return {
        level: "Medium",
        color: "bg-orange-500",
        width: "w-2/3",
        textColor: "text-orange-500",
      };
    if (strength === 5)
      return {
        level: "Strong",
        color: "bg-green-500",
        width: "w-full",
        textColor: "text-green-500",
      };
    return { level: "", color: "", width: "w-0", textColor: "" };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-24">
      {/* Main Body Section */}
      <div className="max-w-md w-full">
        <div>
          <Link to="/">
            <button className="flex items-center gap-2 text-left mb-6 text-[#FF6900] cursor-pointer">
              <FaLongArrowAltLeft /> Back To Food Wheel
            </button>
          </Link>
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-[linear-gradient(to_right,rgba(255,103,0,1),rgba(251,47,53,1))] p-2 rounded-full">
              <img
                src={mainLogo}
                alt="FoodWheel Logo"
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </div>
            <span className="font-bold text-gray-800 text-lg sm:text-xl">
              FoodWheel
            </span>
          </div>
          <h2 className="text-3xl text_color text-center">
            Join the Adventure!
          </h2>
          <p className="mb-8 pt-2 text-center text-gray-600">
            Create your account and start discovering amazing restaurants
          </p>
        </div>

        <section className="max-w-md w-full bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header Logo Section */}
          <section className="auth-reg-bg py-8 flex items-center justify-center border-b border-gray-100">
            <div className="auth_logo p-3 rounded-full bg-white shadow-sm">
              <img
                src={mainLogo}
                alt="FoodWheel Logo"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
          </section>

          <section className="p-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button className="w-full border border-gray-200 rounded-lg py-2.5 flex items-center justify-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
              <button className="w-full border border-gray-200 rounded-lg py-2.5 flex items-center justify-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
                <FaApple className="w-5 h-5 text-black" />
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">
                  or create with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div className="flex justify-between gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      placeholder="First Name"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      placeholder="Last Name"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Strong password"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                  {!showPassword ? (
                    <FaRegEye
                      size={22}
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-3 text-gray-400  cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={22}
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {/* Strength Bar */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${strength.color} ${strength.width}`}
                    ></div>
                  </div>
                  <p className={`text-sm font-medium ${strength.textColor}`}>
                    <span>{strength.level}</span>
                  </p>
                </div>
              )}

              {/* Validation Text */}
              {password && (
                <ul className="grid grid-cols-2 items-center justify-between gap-4 text-xs mt-1 text-gray-500">
                  <li
                    className={
                      /[a-z]/.test(password)
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck />
                    Lowercase letter
                  </li>
                  <li
                    className={
                      password.length >= 8
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    {" "}
                    <FaCheck />
                    Minimum 8 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(password)
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck />
                    Uppercase letter
                  </li>
                  <li
                    className={
                      /[0-9]/.test(password)
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck /> Number
                  </li>
                  <li
                    className={
                      /[^A-Za-z0-9]/.test(password)
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck /> Symbol
                  </li>
                </ul>
              )}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                  {!showConfirmPassword ? (
                    <FaRegEye
                      size={22}
                      onClick={() => setShowConfirmPassword(true)}
                      className="absolute right-3 top-3 text-gray-400  cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={22}
                      onClick={() => setShowConfirmPassword(false)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="
                                                        peer h-4 w-4 rounded border border-gray-500 
                                                        appearance-none cursor-pointer 
                                                        checked:bg-white checked:border-orange-500
                                                        transition-all duration-200
                                                        
                                                    "
                    />
                    <svg
                      className="absolute w-3.5 h-3.5 text-orange-500 left-0.4 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-orange-500 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-500 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                <label className="flex items-start space-x-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="
                                                        peer h-4 w-4 rounded border border-gray-500 
                                                        appearance-none cursor-pointer 
                                                        checked:bg-white checked:border-orange-500
                                                        transition-all duration-200
                                                        
                                                    "
                    />
                    <svg
                      className="absolute w-3.5 h-3.5 text-orange-500 left-0.4 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">
                    I'd like to receive email updates about new restaurants and
                    features
                  </span>
                </label>
              </div>

              <Link to={'/auth/verify-email'}>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-white font-medium auth-reg-btn-bg transition cursor-pointer"
                >
                  Create Account
                </button>
              </Link>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-600">
              Already spinning with us?{" "}
              <Link
                to="/auth/signin"
                className="text-orange-500 font-medium hover:underline"
              >
                Sign in here
              </Link>
            </div>
          </section>
        </section>
        <p className="mt-4 text-center text-xs text-gray-600">
          🎯 Start your food discovery journey today!
        </p>
      </div>
    </div>
  );
}
