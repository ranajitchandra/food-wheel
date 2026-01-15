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
import { useForm } from "react-hook-form";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      receiveEmails: false,
    },
  });

  const password = watch("password", "");

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

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

  const onSubmit = (data) => {
    console.log("Reg Form Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg">
        <Link to="/">
          <button className="flex items-center gap-2 text-left mb-6 text-[#FF6900] cursor-pointer text-sm sm:text-base">
            <FaLongArrowAltLeft /> Back To Food Wheel
          </button>
        </Link>

        {/* Header */}
        <div className="flex justify-center items-center gap-2 mb-3">
          <div className="bg-[linear-gradient(to_right,rgba(255,103,0,1),rgba(251,47,53,1))] p-2 rounded-full">
            <img src={mainLogo} alt="Logo" className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="font-bold text-gray-800 text-lg sm:text-xl">
            FoodWheel
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text_color text-center">
          Join the Adventure!
        </h2>
        <p className="mb-8 pt-2 text-center text-gray-600 text-sm sm:text-base">
          Create your account and start discovering amazing restaurants
        </p>

        <section className="w-full bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          {/* Logo header */}
          <section className="auth-reg-bg py-6 sm:py-8 flex items-center justify-center border-b border-gray-100">
            <div className="auth_logo p-3 rounded-full bg-white shadow-sm">
              <img
                src={mainLogo}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
          </section>

          <section className="p-5 sm:p-6 md:p-8">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button className="w-full border border-gray-200 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm sm:text-base">
                <FcGoogle className="w-5 h-5" /> Continue with Google
              </button>
              <button className="w-full border border-gray-200 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm sm:text-base">
                <FaApple className="w-5 h-5" /> Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                <span className="bg-white px-2 text-gray-400">
                  or create with email
                </span>
              </div>
            </div>

            {/* React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name fields */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <div className="w-full">
                  <label className="block text-sm text-gray-600 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      placeholder="First Name"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-sm text-gray-600 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      placeholder="Last Name"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="block text-sm text-gray-600 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
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
              <div className="w-full">
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters required",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Strong password"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                  />
                  {!showPassword ? (
                    <FaRegEye
                      size={22}
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={22}
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Strength Bar */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${strength.color} ${strength.width}`}
                    ></div>
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium ${strength.textColor}`}
                  >
                    {strength.level}
                  </p>
                </div>
              )}

              {/* Validation text */}
              {password && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2 text-gray-500">
                  <li
                    className={
                      /[a-z]/.test(password)
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck /> Lowercase letter
                  </li>
                  <li
                    className={
                      password.length >= 8
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck /> Minimum 8 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(password)
                        ? "text-green-500 flex items-center gap-2"
                        : "flex items-center gap-2"
                    }
                  >
                    <FaCheck /> Uppercase letter
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

              {/* Confirm Password */}
              <div className="w-full">
                <label className="block text-sm text-gray-600 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (val) =>
                        val === password || "Passwords do not match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                  />
                  {!showConfirmPassword ? (
                    <FaRegEye
                      size={22}
                      onClick={() => setShowConfirmPassword(true)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={22}
                      onClick={() => setShowConfirmPassword(false)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {watch("confirmPassword") && (
                  <p
                    className={`text-xs mt-1 font-medium ${
                      watch("confirmPassword") === password
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {watch("confirmPassword") === password && "Passwords match"}
                  </p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="w-full space-y-3">
                <label className="flex items-start space-x-2 cursor-pointer select-none text-xs sm:text-sm">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("agreeTerms", {
                        required: "You must agree before continuing",
                      })}
                      className="peer h-4 w-4 rounded border border-gray-500 appearance-none cursor-pointer checked:bg-white checked:border-orange-500 transition-all duration-200"
                    />
                    <svg
                      className="absolute w-3.5 h-3.5 text-orange-500 left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none"
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
                  <span className="text-gray-700">
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
                {errors.agreeTerms && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.agreeTerms.message}
                  </p>
                )}
                <label className="flex items-start space-x-2 cursor-pointer select-none text-xs sm:text-sm">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("receiveEmails")}
                      className="peer h-4 w-4 rounded border border-gray-500 appearance-none cursor-pointer checked:bg-white checked:border-orange-500 transition-all duration-200"
                    />
                    <svg
                      className="absolute w-3.5 h-3.5 text-orange-500 left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none"
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
                  <span className="text-gray-700">
                    I'd like to receive email updates about new restaurants and
                    features
                  </span>
                </label>
              </div>

              <Link to={'/auth/verify-email'}>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-[8px] text-white font-medium bg-gradient-to-r from-[#FF6700] to-[#FB2F35] opacity-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),_0_4px_6px_-4px_rgba(0,0,0,0.10)] transition-all duration-300 hover:opacity-100 hover:shadow-lg text-sm sm:text-base"
                >
                  Create Account
                </button>
              </Link>
            </form>

            <div className="text-center mt-6 text-xs sm:text-sm text-gray-600">
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
      </div>
    </div>
  );
}
