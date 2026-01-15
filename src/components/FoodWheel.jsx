console.clear();


import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion"; //eslint-disable-line
import frenchImage from "../assets/wheelImages/French.png";
import indianImage from "../assets/wheelImages/indian.png";
import thaiImage from "../assets/wheelImages/Thai.png";
import greekImage from "../assets/wheelImages/Greek.png";
import mexicanImage from "../assets/wheelImages/mexican.png";
import americanImage from "../assets/wheelImages/American.png";
import { FaPlay, FaRedo } from "react-icons/fa";
import CommonButton from "../common/CommonButton";
import pointer from "../assets/pointer/pointer.png";


const data = [
    {
        option: "Indian",
        color: "rgba(108, 92, 231, 1)",
        image: indianImage,
        textColor: "rgba(34, 34, 34, 1)",
    },
    {
        option: "French",
        color: "rgba(162, 155, 254, 1)",
        image: frenchImage,
        textColor: "rgba(34, 34, 34, 1)",
    },
    {
        option: "Thai",
        color: "rgba(253, 94, 94, 1)",
        image: thaiImage,
        textColor: "rgba(34, 34, 34, 1)",
    },
    {
        option: "Greek",
        color: "rgba(255, 188, 3, 1)",
        image: greekImage,
        textColor: "rgba(34, 34, 34, 1)",
    },
    {
        option: "Mexican",
        color: "rgba(240, 147, 43, 1)",
        image: mexicanImage,
        textColor: "rgba(34, 34, 34, 1)",
    },
    {
        option: "American",
        color: "rgba(230, 58, 55, 1)",
        image: americanImage,
        textColor: "rgba(34, 34, 34, 1)",
    },
];

const SEGMENT_COUNT = 6;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const MIN_SPINS = 12;
const SPIN_DURATION_MS = 8000;


const FoodWheel = ({ getValue }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState("");
    const [hasSpin, setHasSpin] = useState(false);
    const [translateYValue, setTranslateYValue] = useState(getTranslateY());


    useEffect(() => {
        if (prize) {
            getValue(prize);
        }
    }, [prize, getValue]);




    function getTranslateY() {
        if (window.innerWidth >= 1024) return 210;
        if (window.innerWidth >= 768) return 200;
        if (window.innerWidth >= 425) return 120;
        if (window.innerWidth >= 375) return 140;
        return 165;
    }

    // Update translateY when window resizes
    useEffect(() => {

        const handleResize = () => setTranslateYValue(getTranslateY());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [spinCount, setSpinCount] = useState(0);

    const handleSpin = () => {
        if (mustSpin) return;

        const winnerIndex = Math.floor(Math.random() * SEGMENT_COUNT);
        let rotateTo = MIN_SPINS * 360 + (360 - (winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2));



        setRotation((prev) => prev + rotateTo);
        setMustSpin(true);
        setHasSpin(true);

        setTimeout(() => {
            setMustSpin(false);
            const finalRotation = (rotation + rotateTo) % 360;

            const actualWinnerIndex =
                SEGMENT_COUNT - 1 - Math.floor(finalRotation / SEGMENT_ANGLE);
            setPrize(data[actualWinnerIndex].option);

        }, SPIN_DURATION_MS);

    };

    const wheelStyle = useMemo(
        () => ({
            transform: `rotate(${rotation}deg)`,
            transition: mustSpin
                ? `transform ${SPIN_DURATION_MS / 1000}s cubic-bezier(0.1,0.7,0.4,1)`
                : "none",
        }),
        [rotation, mustSpin]
    );

    return (
        <div className="flex flex-col items-center sm:p-8 font-sans">
            {/* Wheel Container */}
            <div className="relative w-full max-w-lg aspect-square">
                {/* Wheel Background */}
                <div
                    className="relative w-full h-full rounded-full overflow-hidden md:border-8 lg:border-14 border-[#FFDCC3] z-10"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(255, 103, 0, 0.1), rgba(251, 47, 53, 0.1) 100%)",
                    }}
                >
                    {/* Spinning Wheel */}
                    <div className="absolute inset-0" style={wheelStyle}>
                        {data?.map((segment, index) => (
                            <div
                                key={index}
                                className="absolute inset-0 origin-center"
                                style={{ transform: `rotate(${index * SEGMENT_ANGLE}deg)` }}
                            >
                                {/* Colored segment */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `conic-gradient(${segment.color} 0deg ${SEGMENT_ANGLE}deg, transparent ${SEGMENT_ANGLE}deg 360deg)`,
                                        clipPath: "circle(50% at 50% 50%)",
                                    }}
                                ></div>

                                {/* Image & Label */}
                                <div
                                    className="absolute sm:top-52 top-40 sm:right-56 2xs:right-45 3xs:right-42 right-42 md:right-1/2 md:top-1/2 flex flex-col items-center"
                                    style={{
                                        transform: `rotate(${SEGMENT_ANGLE / 2 + 2}deg)
                                                    translateY(${-translateYValue}px)
                                                    rotate(-${index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}deg)
                                                    rotate(-${rotation + 2}deg)`,
                                    }}
                                >
                                    <img
                                        src={segment?.image}
                                        alt={segment?.option}
                                        className="w-10 h-10 md:w-16 md:h-16 lg:w-16 lg:h-16 object-contain rounded-lg mb-2"
                                    />
                                    <span
                                        className="text-xs sm:text-sm font-bold"
                                        style={{ color: segment.textColor }}
                                    >
                                        {segment?.option}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                        <img
                            src={pointer}
                            alt="Pointer"
                            className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain"
                        />
                    </div>

                </div>
            </div>

            {/* Spin Button */}
            <CommonButton
                onClick={handleSpin}
                disabled={mustSpin}
                isLoading={mustSpin}
                className="mt-5 lg:mt-12"
            >
                {mustSpin ? (
                    "Spinning..."
                ) : hasSpin ? (
                    <>
                        <FaRedo /> Spin Again
                    </>
                ) : (
                    <>
                        <FaPlay /> Spin the Wheel
                    </>
                )}
            </CommonButton>

            {/* Prize Display with Animation */}
            {prize && (
                <motion.p
                    key={prize}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mt-6 text-base lg:text-2xl font-bold text-orange-500"
                >
                    {`You got: ${prize}`}
                </motion.p>
            )}
        </div>
    );
};

export default FoodWheel;
