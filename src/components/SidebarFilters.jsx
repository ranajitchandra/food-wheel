import {
  FiClock,
  FiDollarSign,
  FiFilter,
  FiRotateCw,
  FiZap,
} from "react-icons/fi";
import { FaDollarSign, FaStar } from "react-icons/fa";
import { BiMapPin } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoLocationOutline } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";

// eslint-disable-next-line no-unused-vars
const QuickFilterButton = ({ icon: Icon, label, color }) => (
  <button
    className={`hover:cursor-pointer w-full flex items-center py-3 px-4 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 transition duration-300 hover:border-${color}-400 hover:scale-[1.01]`}
  >
    <Icon className={`w-5 h-5 mr-3 text-${color}-500`} />
    {label}
  </button>
);

const SidebarFilters = ({
  selectedPrice,
  setSelectedPrice,
  selectedDistance,
  setSelectedDistance,
  minRating,
  setMinRating,
  isOpenNow,
  setIsOpenNow,
  filterCount,
  restaurantCount,
  isMobile = false,
  onClose,
}) => {
  const togglePrice = (price) => {
    setSelectedPrice((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const toggleDistance = (dist) => {
    setSelectedDistance((prev) =>
      prev.includes(dist) ? prev.filter((d) => d !== dist) : [...prev, dist]
    );
  };

  //reset filter
  const resetFilter = () => {
    setSelectedPrice([]);
    setIsOpenNow(false);
    setMinRating(4.5);
    setSelectedDistance([]);
  };

  return (
    <AnimatePresence>
      <aside
        className={`w-[315px] bg-[#FF6900]/5 rounded-2xl p-6 h-fit border border-[#717182]/10
        ${
          !isMobile
            ? "sticky top-6"
            : "fixed inset-y-0 left-0 z-50 shadow-2xl animate-slide-in-right bg-white overflow-y-auto h-screen"
        }
      `}
      >
        {/* Close button only for mobile */}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            ✕
          </button>
        )}

        {/* Filter Header & Reset */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4 mt-8">
          <h2 className="text-xl text-gray-800 flex items-center tracking-wide">
            <FiFilter className="w-5 h-5 mr-3 text-orange-500" />
            Filters
          </h2>
          <button
            onClick={() => resetFilter()}
            className="flex items-center text-sm text-orange-500 transition hover:text-orange-700 hover:cursor-pointer"
          >
            <FiRotateCw className="w-4 h-4 mr-1" />
            Reset
          </button>
        </div>

        {/* Restaurant Count */}
        <p className="text-sm text-gray-500 mb-6 font-medium">
          {filterCount} of {restaurantCount} restaurants
        </p>

        {/* 1. Open Now Toggle */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
          <div className="flex items-center text-gray-700">
            <FiClock className="w-5 h-5 mr-3 text-[#00C950]" />
            <span className="text-md font-semibold">Open Now</span>
          </div>
          {/* Custom Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setIsOpenNow(!isOpenNow)}
              value=""
              className="sr-only peer     "
            />
            {/* The switch track and thumb are styled here */}
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full 
                  peer
                peer-checked:bg-black 
                  peer-checked:after:translate-x-full 
                  rtl:peer-checked:after:-translate-x-full
                  after:content-['']
                  after:absolute
                  after:top-[2px]
                  after:left-[2px]
                after:bg-white 
                after:border-gray-300
                  after:border 
                  after:rounded-full 
                  after:h-5 
                  after:w-5 
                  after:transition-all 
                  shadow-inner
"
            ></div>
          </label>
        </div>

        {/* 2. Price Range */}
        <div className="mb-6">
          <div className="flex items-center text-gray-700 mb-3">
            <FiDollarSign className="w-5 h-5 mr-3 text-[#00C950]" />
            <span className="text-md font-semibold">Price Range</span>
          </div>
          <div className="flex space-x-3 justify-between">
            {/* Button Group for Price Range - $$ is selected */}
            {["$", "$$", "$$$", "$$$$"].map((price) => (
              <button
                key={price}
                onClick={() => togglePrice(price)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition duration-200 border hover:cursor-pointer
                        ${
                          selectedPrice.includes(price)
                            ? "bg-[#FF6900] text-white shadow-md border-[#FF6900]"
                            : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                        }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Delivery Time (Dropdown styled like the image) */}
        <div className="mb-6">
          <div className="flex items-center text-gray-700 mb-3">
            <FiClock className="w-5 h-5 mr-3 text-[#2B7FFF]" />
            <span className="text-md font-semibold">Delivery Time</span>
          </div>

          <Select>
            <SelectTrigger className="w-full hover:cursor-pointer rounded-lg border border-gray-300 bg-[#F3F3F5] p-3 text-sm focus:ring-2 focus:ring-blue-400">
              <SelectValue placeholder="Select delivery time" />
            </SelectTrigger>
            <SelectContent className="bg-white border-0 animate-fade-down">
              <SelectItem className="hover:cursor-pointer" value="fast">
                Fast (20-40 min)
              </SelectItem>
              <SelectItem className="hover:cursor-pointer" value="long">
                Longer (1+ hour)
              </SelectItem>
              <SelectItem className="hover:cursor-pointer" value="medium">
                Standard (40-60 min)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 4. Minimum Rating (Custom Slider Style) */}
        <div className="mb-4">
          <div className="flex items-center text-gray-700 mb-3">
            <FaStar className="w-5 h-5 mr-3 text-yellow-500 fill-yellow-500" />
            <span className="text-md font-semibold">Minimum Rating</span>
          </div>

          {/* Custom Range Slider with state and advanced styling */}
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))} // Update state on change
            className="
             w-full h-5 bg-gray-200 rounded-full appearance-none cursor-pointer transition
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-black
            accent-black
            [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:h-5 
            [&::-moz-range-thumb]:bg-white 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:border-2 
            [&::-moz-range-thumb]:border-black
                                "
            style={{
              // Dynamic track fill using a linear gradient hack for cross-browser compatibility
              background: `linear-gradient(to right, #000000 0%, #000000 ${
                ((minRating - 1) / 4.4) * 100
              }%, #e5e7eb ${((minRating - 1) / 4) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>Any rating</span>
            {/* Dynamic display of the selected rating */}
            <span className="font-semibold text-black/70 flex items-center text-sm">
              {minRating.toFixed(1)}
              {minRating < 5.0 && "+"}
              <FaStar className="w-4 h-4 fill-[#F0B100] ml-1" />
            </span>
          </div>
        </div>

        {/* 5. Distance */}
        <div className="mb-8 border-b border-gray-100 pb-6">
          <div className="flex items-center text-gray-700 mb-3">
            <IoLocationOutline className="w-5 h-5 mr-1 text-[#AD46FF]" />
            <span className="text-md font-semibold">Distance</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["1 mile", "3 miles", "5 miles", "10 miles"].map((dist) => (
              <button
                key={dist}
                onClick={() => toggleDistance(dist)}
                className={`py-2 rounded-xl text-sm font-medium border transition duration-200 shadow-sm hover:cursor-pointer
          ${
            selectedDistance.includes(dist)
              ? "bg-[#AD46FF] border-[#AD46FF] text-white hover:bg-[#AD46FF]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Quick Filters
        </h2>
        <div className="space-y-3">
          <QuickFilterButton
            icon={FiZap}
            label="Fast & Highly Rated"
            color="orange"
          />
          <QuickFilterButton
            icon={FaDollarSign}
            label="Budget Friendly"
            color="green"
          />
          <QuickFilterButton
            icon={BiMapPin}
            label="Nearby & Quick"
            color="red"
          />
        </div>
      </aside>
    </AnimatePresence>
  );
};

export default SidebarFilters;
