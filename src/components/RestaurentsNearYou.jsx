/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RestaurentCard from "./RestaurentCard";
import SidebarFilters from "./SidebarFilters";
import { useState } from "react";
import PriceCompareModal from "./PriceCompareModal";
import { FiFilter } from "react-icons/fi";
import { SlReload } from "react-icons/sl";
import { IoRestaurantSharp } from "react-icons/io5";



const RestaurentsNearYou = ({ spinValue }) => {

    const [selectedPrice, setSelectedPrice] = useState([]);
    const [selectedDistance, setSelectedDistance] = useState([]);
    const [minRating, setMinRating] = useState(3.0);
    const [isOpenNow, setIsOpenNow] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);


    const fetchRestaurantData = async (spinValue) => {
        const response = await axios.get("/dbData.json");
        const restaurantData = response.data.filter(
            (r) => r.restaurant.cuisine.toLowerCase() === spinValue.toLowerCase()
        );
        return restaurantData;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["restaurantData", spinValue],
        queryFn: () => fetchRestaurantData(spinValue),
        enabled: !!spinValue,
    });

    if (!spinValue) {
        return;
    }

    if (isLoading)
        return <p className="text-center text-gray-500 mt-10">Loading...</p>;
    if (isError)
        return <p className="text-center text-red-500 mt-10">
            Failed to fetch restaurant data
        </p>;


    const allRestaurants = data;
    console.log(allRestaurants?.restaurant?.cuisine);


    //filtering here
    const filteredRestaurants = allRestaurants.filter((r) => {
        const matchesPrice = selectedPrice.length === 0 || selectedPrice.includes(r.restaurant.price_range);
        const matchesDistance = selectedDistance.length === 0 || selectedDistance.includes(r.restaurant.distance);
        const matchesRating = r.restaurant.rating.score >= minRating;
        const matchesOpen = !isOpenNow || r.restaurant.isOnline === true;

        return matchesPrice && matchesDistance && matchesRating && matchesOpen;
    });

    const filterCount = filteredRestaurants.length;
    const restaurantCount = allRestaurants.length;
    console.log(selectedRestaurant);

    return (
        <div className="w-full py-10">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="px-4 text-center space-y-1 md:space-y-4">
                    <h1 className=" text-2xl lg:text-5xl font-bold">
                        <span className="text-[#FF6700]">{allRestaurants?.length > 0
                            ? allRestaurants[0]?.restaurant?.cuisine
                            : "No"}</span>{" "}
                        <span className="bg-gradient-to-r from-[#F57418] to-[#669F73] bg-clip-text text-transparent">
                            Restaurants
                        </span>{" "}
                        Near You
                    </h1>
                    <p className="text-md text-black/60">
                        Discover what others are loving in your area
                    </p>
                    {/* Floating Filter Button for lg and below */}
                    <button
                        onClick={() => setShowMobileFilter(true)}
                        className="flex items-start lg:hidden border rounded-md p-2 shadow-sm z-40  my-4"
                    >
                        <FiFilter className="w-5 h-5" />
                        <span className="hidden sm:inline font-semibold">Filter</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex gap-4">

                    {/* Desktop Sticky Sidebar */}
                    <div className="hidden xl:block">
                        <SidebarFilters
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            selectedDistance={selectedDistance}
                            setSelectedDistance={setSelectedDistance}
                            minRating={minRating}
                            setMinRating={setMinRating}
                            isOpenNow={isOpenNow}
                            setIsOpenNow={setIsOpenNow}
                            filterCount={filterCount}
                            restaurantCount={restaurantCount}
                        />
                    </div>

                    {/* Mobile Sliding Sidebar */}
                    {showMobileFilter && (
                        <SidebarFilters
                            isMobile
                            onClose={() => setShowMobileFilter(false)}
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            selectedDistance={selectedDistance}
                            setSelectedDistance={setSelectedDistance}
                            minRating={minRating}
                            setMinRating={setMinRating}
                            isOpenNow={isOpenNow}
                            setIsOpenNow={setIsOpenNow}
                            filterCount={filterCount}
                            restaurantCount={restaurantCount}
                        />
                    )}



                    {/* Right Content Section */}
                    <section className="flex-1 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 px-4">
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((r) => (
                                <RestaurentCard
                                    onCompareClick={() => {
                                        setSelectedRestaurant(r);
                                        setIsModalOpen(true);
                                    }}
                                    key={r.id}
                                    data={r}
                                />
                            ))
                        ) : (
                            <div className="col-span-full h-7/12 flex flex-col items-center gap-4 justify-between my-10">
                                <div className="flex flex-col items-center gap-4 justify-start">
                                    <IoRestaurantSharp size={60} color="#8A8A8A" />
                                    <h1 className=" text-xl lg:text-3xl">No restaurants match your filters</h1>
                                    <p className="text-gray-900/70">
                                        Try adjusting your filters to see more options
                                    </p>
                                    <button className="py-1 md:py-2 px-3 border border-gray-500/50 rounded-md hover:cursor-pointer">
                                        Clear All filter
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 items-center justify-center">
                                    <p>Don't see what you're looking for?</p>
                                    <button className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#FF6700] to-[#FB2F35] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:from-[#f72929] hover:to-[#ff6600] hover:shadow-lg py-2 px-6 text-white rounded-full">
                                        <SlReload />
                                        <span className="font-semibold">Spin Again!</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {isModalOpen && (
                <PriceCompareModal
                    restaurant={selectedRestaurant}
                    onClose={() => setIsModalOpen(false)}
                ></PriceCompareModal>
            )}
        </div>
    );
};

export default RestaurentsNearYou;
