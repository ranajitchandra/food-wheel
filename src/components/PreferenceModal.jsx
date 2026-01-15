import { IoClose, IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow, FaRegStar, FaDollarSign } from "react-icons/fa";
import { RxColorWheel } from "react-icons/rx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"; //eslint-disable-line
import { PiDiceSix } from "react-icons/pi";
import { usePreferences } from "../context/PreferenceProvider";
import { useNavigate } from "react-router";

export default function PreferenceModal({ onClose, type }) {

  const navigate = useNavigate();


  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      location: "",
      budget: [],
      maxDistance: 5,
      minRating: 3,
    },
  });

  const icon = type === "wheel" ? <RxColorWheel size={24} /> : <PiDiceSix size={24} />;
  const buttonLabel = type === "wheel" ? "Continue to Wheel" : "Continue to Slot";

  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const maxDistance = watch("maxDistance");
  const minRating = watch("minRating");
  const { modalType, setModalType, setPreferences, setSelectedView } =
    usePreferences();

  const toggleBudget = (price) => {
    const updated = selectedBudgets.includes(price)
      ? selectedBudgets.filter((b) => b !== price)
      : [...selectedBudgets, price];
    setSelectedBudgets(updated);
    setValue("budget", updated);
  };

  const onSubmit = (data) => {
    setPreferences(data);
    console.log(data);

    setSelectedView(modalType);
    setModalType(null);
    onClose();
    // --------- important for dynamic ----------
    // if (type === "wheel") {
    //   navigate("/wheel-spin", { state: data });
    // } else {
    //   navigate("/slot-spin", { state: data });
    // }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-lg mx-auto bg-gradient-to-br from-[#fff7f3] to-[#fffdfc] w-full rounded-2xl shadow-2xl overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#FFF7ED] to-[#FEF2F2]">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <div className="common p-2 text-white rounded-full bg-orange-400">
                {icon}
              </div>
              <p>Setup Your Preferences</p>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <IoClose size={22} />
            </button>
          </div>
          <p className="text-sm ml-12">
            Enter your location and optional filters before we spin
          </p>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6 text-left"
        >
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your location
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="San Francisco, CA"
                {...register("location")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition cursor-pointer"
              >
                <FaLocationArrow />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              We'll find restaurants near this location
            </p>
          </div>

          {/* Optional Filters */}
          <div className="border-t border-gray-200 pt-4">
            {/* Budget */}
            <div>
              <div className="flex items-center text-gray-700 mb-3">
                <FaDollarSign className="mr-3 text-blue-500" />
                <span className="text-sm font-semibold">
                  Budget (select all that apply)
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["$", "$$", "$$$", "$$$$"].map((price) => (
                  <button
                    key={price}
                    type="button"
                    onClick={() => toggleBudget(price)}
                    className={`border px-3 py-1 rounded-md text-sm transition cursor-pointer ${selectedBudgets.includes(price)
                      ? "bg-orange-100 border-orange-400 text-orange-600"
                      : "border-gray-300 hover:bg-orange-50 hover:border-orange-400"
                      }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                No budget filter — will show all price ranges
              </p>
            </div>

            {/* Distance */}
            <div className="mb-4 mt-4">
              <div className="flex items-center text-gray-700 mb-3">
                <IoLocationOutline className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-md font-semibold">Maximum Distance</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                {...register("maxDistance")}
                className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer transition
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:border-2 
                  [&::-webkit-slider-thumb]:border-orange-500
                  accent-orange-500"
                style={{
                  background: `linear-gradient(to right, #FB923C 0%, #FB923C ${((maxDistance - 1) / 24) * 100
                    }%, #e5e7eb ${((maxDistance - 1) / 24) * 100
                    }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>1 mile</span>
                <span className="font-semibold text-black/70 text-sm">
                  {Number(maxDistance).toFixed(1)} miles
                </span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="mt-6">
              <div className="flex items-center text-gray-700 mb-3">
                <FaRegStar className="w-5 h-5 mr-3 text-yellow-500 fill-yellow-500" />
                <span className="text-md font-semibold">Minimum Rating</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                {...register("minRating")}
                className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer transition
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:border-2 
                  [&::-webkit-slider-thumb]:border-yellow-500
                  accent-yellow-500"
                style={{
                  background: `linear-gradient(to right, #FACC15 0%, #FACC15 ${((minRating - 1) / 4) * 100
                    }%, #e5e7eb ${((minRating - 1) / 4) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>Any rating</span>
                <span className="font-semibold text-black/70 flex items-center text-sm">
                  {Number(minRating).toFixed(1)}
                  {minRating < 5.0 && "+"}
                  <FaRegStar className="w-4 h-4 fill-yellow-500 ml-1" />
                </span>
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <motion.div className="border-t border-gray-100 rounded-md overflow-hidden">
            <motion.button
              type="submit"
              className="w-full text-white font-semibold py-2 rounded-lg cursor-pointer"
              style={{
                background: "linear-gradient(to right, #FB923C, #EC4899)",
              }}
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #EC4899, #FB923C)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {buttonLabel}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
