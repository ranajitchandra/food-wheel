import { FcGoogle } from "react-icons/fc";
import {
  FaApple,
  FaEnvelope,
  FaLock,
  FaRegEye,
  FaRegEyeSlash,
  FaLongArrowAltLeft,
} from "react-icons/fa";
import mainLogo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // init React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle submit
  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 sm:py-20 lg:py-24 px-4 sm:px-6">
      {/* Main Body Section */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="max-w-md w-full mx-auto">
          <Link to="/">
            <button className="flex items-center gap-2 text-left mb-6 text-[#FF6900] cursor-pointer text-sm sm:text-base">
              <FaLongArrowAltLeft /> Back To Food Wheel
            </button>
          </Link>

          {/* Header */}
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

          <h2 className="text-2xl sm:text-3xl font-bold text_color text-center">
            Welcome Back!
          </h2>
          <p className="mb-6 sm:mb-8 pt-2 text-sm sm:text-base text-center">
            Ready to spin for your next delicious discovery?
          </p>
        </div>

        <section className="max-w-md w-full mx-auto bg-white/80  backdrop-blur-lg shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header Logo Section */}
          <section className="bg-[#FFF5F3] py-6 sm:py-8 flex items-center justify-center border-b border-gray-100">
            <div className="auth_logo p-3 rounded-full bg-white shadow-sm">
              <img
                src={mainLogo}
                alt="FoodWheel Logo"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
          </section>

          <section className="p-4 sm:p-6">
            {/* OAuth Buttons */}
            <div className="space-y-3 text-sm sm:text-base">
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
                  or continue with email
                </span>
              </div>
            </div>

            {/* React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters required",
                      },
                    })}
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                  />
                  {!showPassword ? (
                    <FaRegEye
                      size={20}
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={20}
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/auth/forget-password"
                  className="text-xs text-orange-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Link to={'/'}>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-white font-medium auth-btn-bg hover:opacity-80 transition cursor-pointer text-sm sm:text-base"
                >
                  Sign In
                </button>
              </Link>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-600">
              New to Food Wheel?{" "}
              <Link
                to="/auth/signup"
                className="text-orange-500 font-medium hover:underline"
              >
                Join the food adventure
              </Link>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
