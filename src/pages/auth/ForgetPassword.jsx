import { FaEnvelope, FaLongArrowAltLeft } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import mainLogo from "../../assets/logo.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

export default function ForgetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Email submitted:", data);
    };

    return (
        <div className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 sm:py-20 lg:py-24 px-4 sm:px-6">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg">
                {/* Back button */}
                <Link to="/">
                    <button className="flex items-center gap-2 text-left text-sm sm:text-base mb-6 text-[#FF6900] cursor-pointer hover:text-orange-600 transition">
                        <FaLongArrowAltLeft /> Back To Food Wheel
                    </button>
                </Link>

                {/* Logo header */}
                <div className="flex justify-center items-center gap-2 my-8 sm:my-12">
                    <div className="bg-[linear-gradient(to_right,rgba(255,103,0,1),rgba(251,47,53,1))] p-2 sm:p-3 rounded-full">
                        <img
                            src={mainLogo}
                            alt="FoodWheel Logo"
                            className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                    </div>
                    <span className="font-bold text-gray-800 text-lg sm:text-xl">
                        FoodWheel
                    </span>
                </div>

                {/* Main Card */}
                <section className="max-w-md w-full bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <section className="auth-reg-bg py-8 sm:py-10 flex flex-col items-center justify-center border-b border-gray-100 text-center px-4">
                        <div className="auth_logo p-5 rounded-full bg-orange-400 shadow-sm">
                            <MdMailOutline size={28} className="text-white" />
                        </div>
                        <h2 className="text_color my-4 text-lg sm:text-xl font-semibold">
                            Forgot Password?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-sm">
                            No worries! Enter your email and we’ll send you a reset link.
                        </p>
                    </section>

                    {/* Form Section */}
                    <section className="p-5 sm:p-6">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Email address
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm sm:text-base focus:ring-2 outline-none ${errors.email
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-200 focus:ring-orange-400"
                                            }`}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email address",
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                           <Link to={'/auth/verify-otp'}>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2.5 sm:py-3 rounded-lg text-white font-medium bg-orange-500 hover:bg-orange-600 transition cursor-pointer text-sm sm:text-base"
                            >
                                Send Reset Link
                            </button>
                           </Link>
                        </form>

                        {/* Divider */}
                        <div className="relative py-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row justify-between items-center text-center text-sm text-gray-600 gap-2 sm:gap-0">
                            <span>Remember your password?</span>
                            <Link to="/auth/signin" className="text-orange-500 hover:underline">
                                Back to Signin
                            </Link>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}
