import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FaRegEye, FaRegEyeSlash, FaCheck, FaLock } from "react-icons/fa";
import { LuShield } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import CommonButton from "../../common/CommonButton";

export default function UpdatePassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form initialization
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword", "");

  // Password strength logic
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

  const strength = getPasswordStrength(newPassword);

  // Submit handler
  const onSubmit = (data) => {
    console.log("Password Updated:", data);
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 sm:py-20 lg:py-24 md:px-6">
      <div className="w-[90%] sm:w-[85%] md:w-[70%] lg:max-w-2xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6 sm:my-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/profile/settings">
              <button className="bg-white p-2 sm:p-2.5 rounded-full text-gray-600 shadow-md cursor-pointer">
                <MdKeyboardArrowLeft size={26} className="sm:size-[30px]" />
              </button>
            </Link>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text_color_light">
                Create New Password
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                 Enter a strong new password to secure your account.
              </p>
            </div>
          </div>
        </div>

        {/* Card Section */}
        <section className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-orange-50 to-pink-50 p-6 sm:p-8 border-b border-gray-100">
            <div className="auth_logo p-2 sm:p-3 rounded-full bg-white text-white shadow-sm">
              <CiLock size={22} className="sm:size-[24px]" />
            </div>
            <div>
             <p className="text-base sm:text-lg font-medium">Set a Strong New Password</p>
              <p className="text-xs sm:text-sm text-gray-600">
                user@example.com
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 space-y-4 sm:space-y-5"
          >
            {/* New Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                  })}
                  type={showNew ? "text" : "password"}
                  placeholder="Create strong password"
                  className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                />
                {showNew ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowNew(false)}
                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowNew(true)}
                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  />
                )}
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Password strength (unchanged) */}
            {newPassword && (
              <>
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

                {!watch("confirmPassword") && (
                  <ul className="text-xs mt-2 px-4 py-3 rounded-md border border-[#BEDBFF] bg-[#EFF6FF] space-y-1.5 sm:space-y-2">
                    <li
                      className={`flex items-center gap-2 ${
                        /[a-z]/.test(newPassword)
                          ? "text-[#1447E6]"
                          : "text-gray-500"
                      }`}
                    >
                      <FaCheck /> Lowercase letter
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        newPassword.length >= 8
                          ? "text-[#1447E6]"
                          : "text-gray-500"
                      }`}
                    >
                      <FaCheck /> Minimum 8 characters
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[A-Z]/.test(newPassword)
                          ? "text-[#1447E6]"
                          : "text-gray-500"
                      }`}
                    >
                      <FaCheck /> Uppercase letter
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[0-9]/.test(newPassword)
                          ? "text-[#1447E6]"
                          : "text-gray-500"
                      }`}
                    >
                      <FaCheck /> Number
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[^A-Za-z0-9]/.test(newPassword)
                          ? "text-[#1447E6]"
                          : "text-gray-500"
                      }`}
                    >
                      <FaCheck /> Symbol
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === newPassword || "Passwords do not match",
                  })}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
                />
                {showConfirm ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowConfirm(false)}
                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowConfirm(true)}
                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  />
                )}
              </div>

              {watch("confirmPassword") && (
                <p
                  className={`text-xs sm:text-sm mt-2 ${
                    watch("confirmPassword") === newPassword
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {watch("confirmPassword") === newPassword ? (
                    <div className="flex items-center gap-1">
                      <FaCheck /> Password matched
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <RxCross2 size={16} /> Password does not match
                    </div>
                  )}
                </p>
              )}
            </div>

            {/* Security Tips */}
            <div className="bg-orange-50 border-2 border-[#FFD6A7] rounded-md p-3 sm:p-4 text-xs sm:text-sm text-orange-700">
              <p className="flex items-center gap-2 sm:gap-3 font-medium mb-1">
                <LuShield size={18} className="sm:size-[20px]" /> Password
                Security Tips:
              </p>
              <ul className="space-y-1 ml-5 sm:ml-8">
                <li className="flex items-center gap-2">
                  <FaCheck /> Use a unique password you don’t use elsewhere
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck /> Mix uppercase, lowercase, numbers, and symbols
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck /> Avoid personal info like names or birthdays
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full justify-between items-center gap-3 pt-3">
              <Link
                to="/profile/settings"
                className="text-center px-6 py-2 rounded-lg border text-gray-600 hover:bg-gray-50 transition text-sm sm:text-base"
              >
                Cancel
              </Link>
              <Link to={'/auth/signin'}className="inline-block">
                <CommonButton
                  type="submit"
                  variant="primary"
                  className="!py-2 !font-normal flex gap-3 w-full!"
                >
                  <FaLock /> <span>Reset</span>
                </CommonButton>
              </Link>
            </div>
          </form>
        </section>

        <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
          🎯 Start your food discovery journey today!
        </p>
      </div>
    </div>
  );
}
