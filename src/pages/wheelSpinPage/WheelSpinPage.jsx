import customizePng from "../../assets/customize-button/🎨.png";
import FoodWheel from "../../components/FoodWheel";
import { FaPlus } from "react-icons/fa";
import CuisineCustomizer from "../../components/CuisineCustomizer";
import { useState } from "react";
import LocationInput from "../../components/LocationInput";
import CommonButton from "../../common/CommonButton";
import SwitchSpin from "../../components/SwitchSpin";
import RestaurentsNearYou from "../../components/RestaurentsNearYou";

const WheelSpinPage = () => {
    const [openWindow, setOpenWindow] = useState(true);
    const [spinValue, setSpinValue] = useState("");
    console.log(spinValue);
    

    return (
        <>
            <div className="bg-[#FFF2E2] w-full">
                <div className="container mx-auto py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-6 lg:px-6">
                    <div className="flex flex-col md:flex-col justify-center items-center lg:items-start lg:flex-row gap-6 lg:justify-between">
                        {/* hero left text and wheel spin */}
                        <div className="text-center">
                            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold max-w-[950px] mx-auto">
                                Not sure what to eat?{" "}
                                <span className="text-[#FF6700]">Spin the Food</span>{" "}
                                <span className="text-[#48A885]">Wheel</span>
                            </h1>

                            <p className="text-sm md:text-md xl:text-xl mt-4 mb-8 text-black/60">
                                Discover amazing restaurants near you with a fun spin! Let fate
                                decide your <br />
                                next delicious adventure.
                            </p>
                            {/* Food Wheel */}
                            <FoodWheel getValue={setSpinValue} />

                            <SwitchSpin
                                message="Prefer spinning the Slot?"
                                buttonText="Switch to Slot"
                                navigateTo="/slot-spin"
                            />
                        </div>

                        {/* Customize btn */}
                        <div className="w-full md:w-md">
                            <CommonButton
                                onClick={() => setOpenWindow(prev => !prev)}
                                className="w-full flex justify-between items-center gap-4"
                            >
                                <span className="flex items-center gap-2 text-xl">
                                    <img
                                        src={customizePng}
                                        alt="Customize icon"
                                        className="w-6 h-6"
                                    />
                                    Customize
                                </span>
                                <span className="text-xl">
                                    <FaPlus />
                                </span>
                            </CommonButton>

                            <div className={openWindow ? "hidden" : "block"}>
                                <CuisineCustomizer setOpenWindow={setOpenWindow} />
                            </div>
                            <LocationInput />
                        </div>
                    </div>
                </div>
            </div>

            {/* Pass spinValue or setSpinValue depending on your logic */}
            <RestaurentsNearYou spinValue={spinValue} />
        </>
    );
};

export default WheelSpinPage;
