import { Search, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import mainLogo from "../../assets/logo.png";
import avatarProfile from "../../assets/avatar/avatar.png";
import { Link, useNavigate } from "react-router";
import CommonButton from "../../common/CommonButton";
import { usePreferences } from "../../context/PreferenceProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {setSelectedView} = usePreferences()
  const navigate = useNavigate()

  const handleNavigate = () =>{
      setSelectedView("main")
      navigate("/")
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="container relative mx-auto flex items-center justify-between py-2 px-4 md:py-4 sm:px-6 md:px-10 lg:px-10">
        {/* ---------- Left Logo ---------- */}
          <div onClick={handleNavigate} className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[linear-gradient(to_right,rgba(255,103,0,1),rgba(251,47,53,1))] p-2 md:p-3 rounded-full">
              <img
                src={mainLogo}
                alt="FoodWheel Logo"
                className="w-5 h-5 sm:w-7 sm:h-7"
              />
            </div>
            <span className="font-bold text-gray-800 text-lg sm:text-xl">
              FoodWheel
            </span>
          </div>

        {/* ---------- Search (Tablet & Desktop) ---------- */}
        <div className="hidden md:flex items-center w-[250px] sm:w-[320px] lg:w-[400px] xl:w-[450px] bg-white border border-[rgba(255,103,0,0.3)] rounded-full px-4 py-2 shadow-sm mx-4">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* ---------- Right (Desktop only) ---------- */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-1 text-gray-700 text-sm transition">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>San Francisco, CA</span>
          </button>

          <Link
            to="/auth/signin"

          >
            <CommonButton className="!px-4 !py-2 !text-sm">Get Started</CommonButton>

          </Link>

          <Link to="/profile">
            <img
              src={avatarProfile}
              alt="User Avatar"
              className="w-9 h-9 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          </Link>
        </div>

        {/* ---------- Mobile Menu Button ---------- */}
        <button
          className="block lg:hidden text-gray-700 ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* ---------- Mobile Sidebar ---------- */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-white shadow-lg border-l border-gray-100 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden z-[999]`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <span className="font-semibold text-gray-800 text-lg">Menu</span>
          <button
            className="text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col items-center gap-6 px-5 py-6">

          {/* Profile */}
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <img
              src={avatarProfile}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-2 border-orange-400 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
          </Link>

          {/* Search */}
          <div className="flex items-center w-full bg-white border border-[rgba(255,103,0,0.3)] rounded-full px-3 py-2 shadow-sm">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-700 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>San Francisco, CA</span>
          </div>

          {/* Get Started Button */}
          <Link
            to="/auth/signin"
            className="bg-[linear-gradient(to_right,rgba(255,103,0,1),rgba(251,47,53,1))] text-white text-sm px-6 py-2 rounded-md font-medium w-full text-center hover:opacity-90 transition"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>

        </div>
      </div>

      {/* Background overlay when sidebar open */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden"
        ></div>
      )}
    </header>
  );
}
