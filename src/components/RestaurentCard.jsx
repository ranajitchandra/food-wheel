import { Star, MapPin, Scale, Bike, Car, Package, Clock } from "lucide-react";
import foodImg from "../assets/food1.png";
import { FiExternalLink } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";
import CommonButton from "../common/CommonButton";

// Map provider names to icons
const providerIcons = {
  DoorDash: Bike,
  "Uber Eats": Car,
  Grubhub: Package,
};

const DeliveryOption = ({ provider, available, delivery_time, price }) => {
  const Icon = providerIcons[provider] || Bike;
  return (
    <div
      className={`flex justify-between items-center p-3 my-2 rounded-xl border ${
        available
          ? "border-[#B9F8CF] bg-[#F0FDF4]"
          : "bg-[#F9FAFB] border-[#E5E7EB]"
      } transition duration-300 ease-in-out`}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p
            className={`text-sm font-semibold ${
              available ? "text-[#008236]" : "text-[#6A7282]"
            }`}
          >
            {provider}
          </p>
          <p
            className={`text-xs ${
              available ? "text-[#00A63E]" : "text-[#99A1AF]"
            }`}
          >
            {available ? delivery_time : "Unavailable"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-bold ${
            available ? "text-[#008236]" : "text-[#6A7282]"
          }`}
        >
          {price}
        </p>
        <p className="text-xs text-gray-500">delivery</p>
      </div>
    </div>
  );
};

const RestaurentCard = ({ data, onCompareClick }) => {
  const restaurant = data.restaurant;
  const [showAll, setShowAll] = useState(false);

  // Number of delivery options to show initially
  const visibleOptions = showAll
    ? data.delivery_options
    : data.delivery_options.slice(0, 3);

  return (
    <div
      className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 ease-in-out
  border border-transparent hover:border-[#FF6900] h-[770px]"
    >
      {/* Image Header */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={foodImg}
          alt={restaurant.name}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />

        <div className="absolute top-3 left-3 bg-white/90 text-black px-[10px] py-[2px] rounded-xl shadow-lg">
          {restaurant.price_range}
        </div>

        {restaurant.isOnline ? (
          <div className="absolute top-3 right-3 flex items-center bg-[#00C950] text-white text-xs font-bold py-1 px-3 rounded-xl shadow-lg">
            <Clock className="w-4 h-4 mr-1" />
            Open
          </div>
        ) : (
          <div className="absolute top-3 right-3 flex items-center bg-[#6A7282] text-white text-xs font-bold py-1 px-3 rounded-xl shadow-lg">
            <Clock className="w-4 h-4 mr-1" />
            Closed
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 w-full">
        {/* Title & Rating */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {restaurant.name}
          </h2>
          <div className="flex items-center space-x-1 mt-1 p-2 rounded-full">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-lg font-semibold">
              {restaurant.rating.score}
            </span>
            <span className="text-sm text-gray-500">
              ({restaurant.rating.review_count})
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-1 text-gray-600 mb-3">
          <div className="flex items-center text-sm">
            <span className="font-medium">{restaurant.cuisine}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              <span className="font-semibold text-gray-800">
                {restaurant.distance}
              </span>{" "}
              • {restaurant.address}
            </span>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="flex justify-between items-center text-sm mb-2">
          <p className="font-semibold text-gray-700 flex items-center">
            Delivery Options:
          </p>
          <p className="text-[#FF6900] font-semibold flex items-center hover:text-orange-700 cursor-pointer">
            <Scale className="w-4 h-4 mr-1" /> Compare
          </p>
        </div>

        {/* Show limited or full delivery options */}
        <div className="space-y-2 overflow-hidden">
          {visibleOptions.map((opt, idx) => {
            const priceObj = data.delivery_fees.find(
              (f) => f.provider === opt.provider
            );
            return (
              <div key={idx} className="">
                <DeliveryOption {...opt} price={priceObj?.fee || "$0.00"} />
              </div>
            );
          })}
        </div>

        {/* Toggle button */}
        {data.delivery_options.length > 3 && (
          <p
            onClick={() => setShowAll(!showAll)}
            className="text-center text-sm text-[#99A1AF] font-medium mt-4 cursor-pointer hover:underline mb-4"
          >
            {showAll
              ? "Show less options"
              : `+${data.delivery_options.length - 3} more options`}
          </p>
        )}

        {/* Action Buttons */}
        <CommonButton onClick={onCompareClick} className="w-full rounded-xl">
          <Scale className="w-6 h-6 mr-3" /> Compare Menus & Prices
        </CommonButton>

        <div className="mt-4 flex space-x-4">
          <button className="flex-1 flex justify-center items-center py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-xl transition duration-300 hover:bg-gray-50 hover:border-gray-400 hover:cursor-pointer">
            <FiExternalLink className="w-5 h-5 mr-2" />
            Book Table
          </button>
          <button className="flex-1 flex justify-center items-center py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-xl transition duration-300 hover:bg-gray-50 hover:border-gray-400 hover:cursor-pointer">
            <IoLocationOutline className="w-5 h-5 mr-1 font-bold " />
            Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurentCard;
