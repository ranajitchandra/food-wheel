import { X, Clock, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import { useState } from "react";
import DeliveryTimeModal from "./DeliveryTimeModal";
import CommonButton from "../common/CommonButton";

const PriceCompareModal = ({ restaurant, onClose }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isDeliveryTimeModalOpen, setIsDeliveryTimeModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleDeliveryModal = (provider, fee, time) => {
    setSelectedProvider({ provider, fee, time });
    setIsDeliveryTimeModalOpen(true);
  };

  const closeDeliveryModal = () => {
    setIsDeliveryTimeModalOpen(false);
    setSelectedProvider(null);
  };

  if (!restaurant) return null;

  const { menu_comparison, delivery_options, delivery_fees } = restaurant;
  const providers = menu_comparison.providers || [];

  const deliveryData = providers.map((provider) => {
    const option = delivery_options.find((opt) => opt.provider === provider);
    const feeData = delivery_fees.find((fee) => fee.provider === provider);
    return {
      provider,
      available: option?.available,
      time: option?.delivery_time,
      fee: feeData?.fee,
    };
  });

  const providerIcons = {
    DoorDash: "🚗",
    "Uber Eats": "🚲",
    Grubhub: "🍔",
    Wolt: "⚡",
    Caviar: "🎩",
  };

  const handleItemSelect = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      return exists
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item];
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-16"
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start p-4 border-b">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                🌮
              </div>
              <div>
                <h2 className="text-lg text-[#FF6700] flex items-center gap-2">
                  Compare Menus & Prices 📋
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.restaurant.name}
                </p>
                <p className="text-xs text-black px-2 py-1 bg-[#ECEEF2] rounded-md w-30">
                  {providers.length} delivery options
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Delivery Options Bar */}
          <div className="overflow-x-auto">
            <div
              className={`grid gap-4 p-4 min-w-[1024px] border-b`}
              style={{
                gridTemplateColumns: `200px repeat(${providers.length}, 1fr)`,
              }}
            >
              <div className="text-sm font-semibold text-gray-600">
                Menu Items
              </div>
              {deliveryData.map((option, index) => (
                <div
                  key={`${option.provider || "provider"}-${index}`}
                  className="text-center bg-gray-50 p-2 rounded-md border border-gray-200"
                >
                  <div className="text-2xl mb-1">
                    {providerIcons[option.provider] || "🚚"}
                  </div>
                  <div className="text-xs font-semibold">
                    {option.provider}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Clock size={10} />
                    {option.time}
                  </div>

                  <CommonButton
                    className="w-full rounded-lg !py-2 !text-xs mt-2"
                    onClick={() =>
                      handleDeliveryModal(option.provider, option.fee, option.time)
                    }
                  >
                    Choose
                  </CommonButton>

                  <div className="text-xs text-gray-600 mt-1">
                    Fee: {option.fee}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[500px] min-w-[1024px]">
              {menu_comparison.menu_items.map((item, itemIdx) => {
                const isSelected = selectedItems.some(
                  (i) => i.name === item.name
                );

                return (
                  <div
                    key={`${item.name || "item"}-${itemIdx}`}
                    onClick={() => handleItemSelect(item)}
                    className={`grid gap-2 p-4 border-b cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#FFF7ED] border-orange-400"
                        : "hover:bg-[#FFF7ED4D]"
                    }`}
                    style={{
                      gridTemplateColumns: `200px repeat(${providers.length}, 1fr)`,
                    }}
                  >
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                      <div className="text-xs text-black mt-2 px-2 border border-black/30 inline-block rounded-lg">
                        {item.category}
                      </div>
                    </div>

                    {providers.map((provider, priceIdx) => {
                      const price = item.prices[provider];
                      const offer = item.offers?.[provider];
                      const isUnavailable =
                        !price || price === "Unavailable";

                      return (
                        <div
                          key={`${provider}-${item.name}-${priceIdx}`}
                          className="text-center"
                        >
                          {isUnavailable ? (
                            <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                              <span className="text-gray-300">ⓘ</span>
                              Unavailable
                            </div>
                          ) : (
                            <>
                              <div className="text-sm">{price}</div>
                              {offer && (
                                <div className="mt-1 inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  <Tag size={10} />
                                  {offer}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* DeliveryModal */}
      <DeliveryTimeModal
        isOpen={isDeliveryTimeModalOpen}
        onClose={closeDeliveryModal}
        provider={selectedProvider?.provider}
        fee={selectedProvider?.fee}
        time={selectedProvider?.time}
        item={selectedItems}
      />
    </AnimatePresence>
  );
};

export default PriceCompareModal;
