import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import profileAvatar from "../../assets/avatar/avatar_2.png";
import { NavLink, Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion"; //eslint-disable-line
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { useState } from "react";

export default function ProfileTopSection() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/profile", label: "Profile", icon: <FiUser /> },
    {
      path: "/profile/locations",
      label: "Locations",
      icon: <MdOutlineLocationOn />,
    },
    { path: "/profile/history", label: "History", icon: <FaRegClock /> },
    {
      path: "/profile/settings",
      label: "Settings",
      icon: <IoSettingsOutline />,
    },
  ];

  return (
    <>
      {/* --- Top Bar --- */}
      <section className="flex justify-between items-center sm:items-center gap-4">
        <Link to="/" className="flex items-center gap-3 sm:gap-4">
          <div className="bg-white p-2 sm:p-3 rounded-full shadow-md">
            <RxCross1 size={20} />
          </div>
          <div>
            <h2 className="text_color_light text-2xl sm:text-3xl">
              My Profile
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Manage your food adventure preferences
            </p>
          </div>
        </Link>

        <div className="hidden md:block">
          <Link to="/auth/signin" className="flex items-center gap-2 sm:gap-4 border border-[#ffc9c9] py-2 px-3 rounded-md text-red-600 cursor-pointer hover:bg-red-50 transition">
            <FaArrowRightFromBracket size={20} className="sm:size-[22px]" />
            <span className="text-sm sm:text-md font-semibold">Sign Out</span>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="sm:hidden flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="p-2 bg-white rounded-md shadow-md"
          >
            <RxHamburgerMenu size={22} />
          </button>
        </div>
      </section>

      {/* --- Profile Banner --- */}
      <section className="common flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 p-6 sm:p-10 rounded-2xl my-6 sm:my-8 text-center sm:text-left">
        <div className="bg-white rounded-full p-0.5">
          <img
            src={profileAvatar}
            className="bg-[#ff6900] rounded-full p-1 w-24 h-24 sm:w-32 sm:h-32"
            alt="Profile Avatar"
          />
        </div>
        <div>
          <h3 className="text-white text-2xl sm:text-3xl font-semibold">
            John Foodie
          </h3>
          <p className="text-white text-base sm:text-lg">user@example.com</p>
        </div>
      </section>

      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="w-64 bg-white h-full shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
                  <button onClick={() => setOpen(false)}>
                    <RxCross1 size={22} />
                  </button>
                </div>

                {/* Nav Links */}
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-4 rounded-md text-base transition-all cursor-pointer ${
                        isActive
                          ? "bg-[linear-gradient(90deg,rgba(255,104,0,1),rgba(250,44,54,1)100%)] text-white"
                          : "text-gray-700 hover:bg-[linear-gradient(90deg,rgba(255,104,0,1),rgba(250,44,54,1)100%)] hover:text-white"
                      }`
                    }
                  >
                    {item.icon} {item.label}
                  </NavLink>
                ))}
                <Link to="/auth/signin" className="flex items-center gap-2 sm:gap-4 border border-[#ffc9c9] py-2 px-3 rounded-md text-red-600 cursor-pointer hover:bg-red-50 transition mt-8">
                  <FaArrowRightFromBracket
                    size={20}
                    className="sm:size-[22px]"
                  />
                  <span className="text-sm sm:text-md font-semibold">
                    Sign Out
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
