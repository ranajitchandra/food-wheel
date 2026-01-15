"use client";
import { useState } from "react";
import { GiArcheryTarget } from "react-icons/gi";
import { PiDiceSix } from "react-icons/pi";
import { RxColorWheel } from "react-icons/rx";
import { motion } from "framer-motion"; //eslint-disable-line
import CommonButton from "../common/CommonButton";
import PreferenceModal from "./PreferenceModal";
import { usePreferences } from "../context/PreferenceProvider";

export default function Banner() {
  const [openModal, setOpenModal] = useState(false);
  const { modalType, setModalType } = usePreferences();

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  return (
    <>
      <motion.div
        className="py-8 md:py-0 md:min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 text-center space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <div className="bg-gradient-to-br from-[#FF6900] to-[#FB2C36] w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
            <GiArcheryTarget className="text-white text-3xl" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-4xl lg:max-w-3xl lg:text-7xl text-center font-bold text-gray-800 leading-8 lg:leading-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.25 },
            },
          }}
        >
          <motion.p
            className="bg-gradient-to-r from-[#FF6900] to-[#FB2C36] bg-clip-text text-transparent"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Not sure what to eat?
          </motion.p>
          <motion.p
            className="bg-gradient-to-r from-[#FB2C36] to-[#F6339A] bg-clip-text text-transparent"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Spin the Food Wheel!
          </motion.p>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-sm text-gray-600 max-w-md mx-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Let fate decide your next meal! Choose your style and discover amazing
          restaurants near you.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
        >
          <CommonButton
            onClick={() => handleOpenModal("wheel")}
            className="flex items-center"
          >
            <RxColorWheel className="text-lg" /> Spin the Wheel
          </CommonButton>

          <CommonButton
            onClick={() => handleOpenModal("slot")}
            variant="secondary"
            className="flex"
          >
            <PiDiceSix className="text-lg" />
            <span> Try Slot Spin</span>
          </CommonButton>
        </motion.div>
      </motion.div>

      {/* Single Modal */}
      {openModal && (
        <PreferenceModal type={modalType} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}
