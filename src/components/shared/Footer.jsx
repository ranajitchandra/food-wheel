import {
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa";
import mainLogo from "../../assets/logo.png";

export default function Footer() {
    return (
        <footer className="w-full bg-[#111827] text-white border-t border-gray-800">
            {/* ===== TOP SECTION ===== */}
            <div className="container mx-auto flex flex-col justify-between gap-10 lg:flex-row lg:gap-16 px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">

                {/* ===== LEFT COLUMN ===== */}
                <div className="flex-1 flex flex-col md:items-center md:text-center lg:items-start lg:text-left space-y-4 sm:space-y-5">
                    {/* Logo + Name */}
                    <div className="flex items-center gap-3 lg:justify-start">
                        <div className="bg-gradient-to-r from-[#FF6700] to-[#FB2F35] p-2 rounded-full">
                            <img
                                src={mainLogo}
                                alt="FoodWheel Logo"
                                className="w-6 h-6 sm:w-7 sm:h-7"
                            />
                        </div>
                        <span className="text-xl sm:text-2xl font-semibold tracking-wide">
                            FoodWheel
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                        Discover your next favorite restaurant with a spin! Making dining
                        decisions fun and exciting since 2024.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3 md:justify-center sm:gap-4 lg:justify-start">
                        {[
                            { icon: <FaLinkedinIn />, link: "#" },
                            { icon: <FaTwitter />, link: "#" },
                            { icon: <FaYoutube />, link: "#" },
                            { icon: <FaInstagram />, link: "#" },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                className="transition-transform transform hover:scale-110"
                            >
                                <div className="bg-[#29303D] hover:bg-gradient-to-r hover:from-[#FF6700] hover:to-[#FB2F35] p-2.5 sm:p-3 rounded-full flex items-center justify-center">
                                    {social.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ===== RIGHT SECTION ===== */}
                <div className="flex flex-col gap-6 md:gap-10 flex-1 md:justify-center md:text-center lg:text-start sm:flex-row sm:gap-16 lg:gap-20 lg:justify-end sm:text-left">

                    {/* Quick Links */}
                    <div className="w-full">
                        <h4 className="font-semibold text-base sm:text-lg text-white mb-3 sm:mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-0.5 sm:space-y-2 text-gray-400">
                            {["How It Works", "Popular Cuisines", "Restaurant Partners"].map(
                                (item, i) => (
                                    <li key={i}>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors text-sm sm:text-base"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="w-full">
                        <h4 className="font-semibold text-base sm:text-lg text-white mb-3 sm:mb-4">
                            Support
                        </h4>
                        <ul className="space-y-0.5 sm:space-y-2 text-gray-400">
                            {["Help Center", "Contact Us", "Safety"].map((item, i) => (
                                <li key={i}>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors text-sm sm:text-base"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="border-t border-gray-800 py-5 sm:py-6 px-5 sm:px-8 lg:px-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm">
                    <p className="text-center md:text-left">
                        &copy; 2024 FoodWheel. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                            (link, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
