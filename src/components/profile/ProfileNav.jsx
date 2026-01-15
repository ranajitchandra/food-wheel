import { NavLink } from "react-router";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

export default function ProfileNav() {
  const navItems = [
    { path: "/profile", label: "Profile", icon: <FiUser /> },
    { path: "/profile/locations", label: "Locations", icon: <MdOutlineLocationOn /> },
    { path: "/profile/history", label: "History", icon: <FaRegClock /> },
    { path: "/profile/settings", label: "Settings", icon: <IoSettingsOutline /> },
  ];

  return (
    <nav className="hidden sm:block user-profile bg-white p-4 lg:p-1 lg:m-0 rounded-md lg:rounded-full shadow-md text-gray-700">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 sm:gap-4 lg:gap-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex-1 flex justify-center items-center gap-2 py-1 rounded-full transition-all cursor-pointer text-sm sm:text-base md:text-lg ${
                isActive
                  ? "bg-[linear-gradient(90deg,rgba(255,104,0,1),rgba(250,44,54,1)100%)] text-white"
                  : "text-gray-600 hover:bg-[linear-gradient(90deg,rgba(255,104,0,1),rgba(250,44,54,1)100%)] hover:text-white"
              }`
            }
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
