import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; //eslint-disable-line
import { X, Truck, Calendar, Clock, ChevronRight, Car } from "lucide-react";
import OrderConfirmationModal from "./OrderConfirmationModal";
import CommonButton from "../common/CommonButton";

const DeliveryTimeModal = ({ isOpen, onClose, provider, time, fee }) => {
    const [selectedOption, setSelectedOption] = useState("now");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("11:00 AM – 11:30 AM");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [orderData, setOrderData] = useState(null);

    // Time slots
    const generateTimeSlots = () => {
        const times = [
            "11:00 AM – 11:30 AM",
            "11:30 AM – 12:00 PM",
            "12:00 PM – 12:30 PM",
            "12:30 PM – 1:00 PM",
            "1:00 PM – 1:30 PM",
            "1:30 PM – 2:00 PM",
            "2:00 PM – 2:30 PM",
            "2:30 PM – 3:00 PM",
        ];
        return times;
    };

    const handleConfirm = () => {
        const orderData = {
            deliveryType: selectedOption,
            timeSlot: selectedOption === "later" ? selectedTimeSlot : "15-25 min",
            deliveryFee: fee,
        };
        setOrderData(orderData);
        setIsConfirmModalOpen(true);
        console.log(orderData);
    };

    const timeSlots = generateTimeSlots();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 flex justify-center z-50 p-4 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto"
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className="px-4 py-4 flex items-center justify-between border-b border-orange-100"
                            style={{
                                background: "linear-gradient(90deg, #FF69001A, #FB2C361A)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-xl shadow-lg">
                                    <Car className="text-orange-500" />
                                </div>
                                <div>
                                    <h2 className="text-sm sm:text-xl font-bold text-gray-800">
                                        Select Delivery Time
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500">{provider}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors hover:cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-6 space-y-4">
                            {/* Deliver Now Option */}
                            <motion.button
                                onClick={() => setSelectedOption("now")}
                                className={`w-full p-2 md:p-5 rounded-2xl border-2 transition-all ${selectedOption === "now"
                                    ? "border-orange-500 bg-orange-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-orange-200 hover:shadow-sm"
                                    }`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 md:gap-6">
                                        <div
                                            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === "now"
                                                ? "border-orange-500"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {selectedOption === "now" && (
                                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <Clock className="text-orange-500" size={20} />
                                                <span className="font-semibold text-gray-800 text-sm md:text-md">
                                                    Deliver Now
                                                </span>
                                                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                                    Fastest
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                                Estimated delivery:{" "}
                                                <span className="font-medium text-orange-600 text-xs sm:text-sm md:text-md">
                                                    {time}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    {selectedOption === "now" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-orange-500 text-white rounded-full p-0.5 md:p-1"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>

                            {/* Schedule for Later Option */}
                            <motion.button
                                onClick={() => setSelectedOption("later")}
                                className={`w-full p-2 md:p-5 rounded-2xl border-2 transition-all ${selectedOption === "later"
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"
                                    }`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 md:gap-6">
                                        <div
                                            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === "later"
                                                ? "border-blue-500"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {selectedOption === "later" && (
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="text-[#2B7FFF]" size={20} />
                                                <span className="font-semibold text-gray-800 text-sm md:text-md">
                                                    Schedule for Later
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                                Choose your preferred delivery time
                                            </p>
                                        </div>
                                    </div>
                                    {selectedOption === "later" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-blue-500 text-white rounded-full p-0.5 md:p-1"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>

                            {/* Time Slots Section */}
                            <AnimatePresence>
                                {selectedOption === "later" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4 overflow-y-auto"
                                    >
                                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Clock size={18} className="text-blue-500" />
                                            <span>Available Time Slots</span>
                                        </div>

                                        {/* Time Slots Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                                            {timeSlots.map((slot, index) => (
                                                <motion.button
                                                    key={`${slot}-${index}`}
                                                    onClick={() => setSelectedTimeSlot(slot)}
                                                    className={`p-3 rounded-xl border-2 transition-all text-xs sm:text-sm  font-medium ${selectedTimeSlot === slot
                                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-200"
                                                        }`}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{slot}</span>
                                                        {selectedTimeSlot === slot && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="bg-blue-500 text-white rounded-full p-0.5"
                                                            >
                                                                <svg
                                                                    width="12"
                                                                    height="12"
                                                                    viewBox="0 0 16 16"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                                                        stroke="white"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Selected Time Display */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                className="text-blue-600"
                                            >
                                                <path
                                                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span className="text-sm text-blue-700 font-medium">
                                                Selected: {selectedTimeSlot}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Delivery Note */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                <div className="hidden sm:block text-amber-600 mt-0.5">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-xs md:text-sm text-amber-800">
                                    <p className="font-medium mb-1">Delivery Note</p>
                                    <p className="text-amber-700 leading-relaxed">
                                        Delivery times are estimates and may vary based on
                                        restaurant preparation time, traffic conditions, and driver
                                        availability.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-4 md:px-6 md:py-6 flex flex-col md:flex-row md:items-center gap-3 text-xs bg-[#F9FAFB]">
                            <button
                                onClick={onClose}
                                className="flex-1 px-8 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-200 transition-colors py-2"
                            >
                                Cancel
                            </button>
                            <CommonButton
                                onClick={handleConfirm}
                                className="flex-1 !text-xs !sm-text-sm !py-2"
                            >
                                <Truck size={20} />
                                <span>
                                    {selectedOption === "now"
                                        ? "Confirm - Deliver Now"
                                        : `Confirm - ${selectedTimeSlot}`}
                                </span>
                                <ChevronRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </CommonButton>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <OrderConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                orderData={orderData}
                deliveryProvider={provider}
            ></OrderConfirmationModal>
        </AnimatePresence>
    );
};

export default DeliveryTimeModal;
