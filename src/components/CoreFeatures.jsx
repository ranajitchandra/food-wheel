import React from "react";
import { CiMobile1 } from "react-icons/ci";
import { FaHeart, FaMap } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { LiaCcDiscover } from "react-icons/lia";
import { TbFilters } from "react-icons/tb";
import { motion } from "framer-motion"; //eslint-disable-line

const CoreFeatures = () => {
  const features = [
    {
      title: "Fun Discovery",
      description:
        "Turn meal decisions into an exciting game. Spin the wheel and let serendipity guide your taste buds to new culinary adventures.",
      Icon: <LiaCcDiscover />,
      gradient: "linear-gradient(90deg, rgba(248,136,52,1), rgba(236,94,17,1) 100%)",
    },
    {
      title: "Location-Based",
      description:
        "Find amazing restaurants near you with real-time location data, ratings, and reviews from verified diners.",
      Icon: <FaMap />,
      gradient: "linear-gradient(90deg, rgba(38,198,179,1), rgba(17,156,143,1) 100%)",
    },
    {
      title: "Easy Booking",
      description:
        "Seamlessly connect to reservation platforms, delivery services, and navigation apps with one-click integration.",
      Icon: <IoIosLink />,
      gradient: "linear-gradient(90deg, rgba(83,150,247,1), rgba(45,108,237,1) 100%)",
    },
    {
      title: "Smart Filters",
      description:
        "Customize your search with intelligent filters for cuisine type, price range, dietary restrictions, and distance.",
      Icon: <TbFilters />,
      gradient: "linear-gradient(90deg, rgba(186,122,249,1), rgba(153,62,236,1) 100%)",
    },
    {
      title: "Save Favorites",
      description:
        "Build your personal collection of favorite restaurants and share your discoveries with friends and family.",
      Icon: <FaHeart />,
      gradient: "linear-gradient(90deg, rgba(240,103,173,1), rgba(222,48,127,1) 100%)",
    },
    {
      title: "Mobile Optimized",
      description:
        "Perfectly designed for on-the-go discovery with responsive design and touch-friendly interactions.",
      Icon: <CiMobile1 />,
      gradient: "linear-gradient(90deg, rgba(68,215,122,1), rgba(27,169,80,1) 100%)",
    },
  ];

  return (
    <div className="bg-[#EFFCFA] py-6 md:py-10 lg:py-20">
      <div className="container mx-auto text-center py-4 px-4 sm:px-6 md:px-10 lg:px-10">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl md:tetx-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#FF6700] to-[#FB2F35] bg-clip-text text-transparent">
              FoodWheel
            </span>
          </h1>
          <p className="md:mt-6 max-w-10/12 mx-auto text-black/70 text-md md:text-lg">
            Discover your next favorite meal with our innovative spin to discover
            platform
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg px-10 py-6 md:py-14 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="p-4 rounded-full mb-4 text-white text-2xl flex items-center justify-center"
                style={{
                  background: feature.gradient,
                }}
              >
                {feature.Icon}
              </div>
              <h3 className="font-bold text-md md:text-xl mb-4">{feature.title}</h3>
              <p className="text-black/60 text-xs md:text-md lg:text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreFeatures;
