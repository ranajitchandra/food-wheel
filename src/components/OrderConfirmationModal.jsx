import { Calendar } from "lucide-react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import CommonButton from "../common/CommonButton";

// Order Confirmation Modal
const OrderConfirmationModal = ({ isOpen, onClose, orderData, deliveryProvider }) => {
    if (!isOpen) return null;
    // console.log(deliveryProvider);

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Success Icon */}
                <div className="flex justify-center pt-8 pb-4">
                    <div className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] rounded-full p-4">
                        <div className="sm:w-10 w-6 sm:h-10 h-6"><svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg></div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center px-6 pb-6">
                    <h2 className="text-2xl text-gray-800 mb-2">Confirm Your Order</h2>
                    <p className="text-gray-600">
                        You're about to order from{" "}
                        <span className="text-[#F54900] ">{orderData.restaurant}</span> via{" "}
                        <span className="text-[#F54900]">{deliveryProvider}</span>
                    </p>
                </div>

                {/* Order Details */}
                <div className="px-6 pb-6 space-y-4">
                    {/* Scheduled Delivery Header */}
                    <div className="rounded-[10px] p-4 bg-[linear-gradient(90deg,#FFF7ED_0%,#FEF2F2_100%)] ">
                        <div className="flex items-center justify-between border-b border-[#FFD6A7] py-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-blue-500" />
                                <span className="text-black/70">
                                    {orderData.deliveryType === "now"
                                        ? "Deliver Now"
                                        : "Scheduled Delivery"}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="hover:cursor-pointer text-orange-500 text-sm font-medium hover:text-orange-600 flex items-center gap-1"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Change
                            </button>
                        </div>

                        {/* Delivery Details Card */}
                        <div className=" mt-4 space-y-3">
                            <div className="w-full flex 2xs:flex-row flex-col gap-2 justify-between 2xs:items-center items-start 2xs:text-base text-sm">
                                <span className="text-gray-700">Delivery Time:</span>
                                <span className="text-gray-900">
                                    {orderData.deliveryType === "now"
                                        ? "15-25 min"
                                        : orderData.timeSlot}
                                </span>
                            </div>
                            <div className="w-full flex 2xs:flex-row flex-col gap-2 justify-between 2xs:items-center items-start 2xs:text-base text-sm">
                                <span className="text-gray-700">Delivery Fee:</span>
                                <span className="text-gray-900">{orderData.deliveryFee}</span>
                            </div>
                        </div>
                    </div>

                    {/* Scheduled Time Highlight */}
                    {orderData.deliveryType === "later" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-blue-600" />
                                <span className="text-blue-900 2xs:text-base text-sm">
                                    Scheduled for: {orderData.timeSlot}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Discount Badge */}
                    {orderData.discount && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                20%
                            </div>
                            <span className="text-green-700 text-sm font-medium">
                                20% off first order
                            </span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 px-6 pb-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-xs"
                    >
                        Go Back
                    </button>
                    <CommonButton onClick={() => onClose()} variant="primary" className=" px-2 md:px-6 py-2">
                        <AiOutlineThunderbolt className=" h-5 w-5" />
                        <span className="!text-sm !font-normal">Continue to {deliveryProvider}</span>
                    </CommonButton>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;
