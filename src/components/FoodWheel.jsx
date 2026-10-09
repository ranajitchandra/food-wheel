import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
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
        textColor: "#ffffff",
    },
    {
        option: "French",
        color: "rgba(162, 155, 254, 1)",
        image: frenchImage,
        textColor: "#1a1a1a",
    },
    {
        option: "Thai",
        color: "rgba(253, 94, 94, 1)",
        image: thaiImage,
        textColor: "#ffffff",
    },
    {
        option: "Greek",
        color: "rgba(255, 188, 3, 1)",
        image: greekImage,
        textColor: "#1a1a1a",
    },
    {
        option: "Mexican",
        color: "rgba(240, 147, 43, 1)",
        image: mexicanImage,
        textColor: "#ffffff",
    },
    {
        option: "American",
        color: "rgba(230, 58, 55, 1)",
        image: americanImage,
        textColor: "#ffffff",
    },
];

const SEGMENT_COUNT = 6;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const MIN_SPINS = 10;
const SPIN_DURATION_MS = 5000;

const FoodWheel = ({ getValue }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState("");
    const [hasSpin, setHasSpin] = useState(false);

    useEffect(() => {
        if (prize && getValue) {
            getValue(prize);
        }
    }, [prize, getValue]);

    const handleSpin = () => {
        if (mustSpin) return;

        // Select winning segment index (0 to 5)
        const winningIndex = Math.floor(Math.random() * SEGMENT_COUNT);
        const winnerObj = data[winningIndex];

        // Target angle to align center of winning slice with TOP pointer (0deg / 12 o'clock)
        const sliceCenterAngle = winningIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
        const targetAngle = (360 - sliceCenterAngle) % 360;

        const currentNormalized = rotation % 360;
        let degreesNeeded = (targetAngle - currentNormalized + 360) % 360;
        if (degreesNeeded === 0) degreesNeeded = 360;

        const nextRotation = rotation + MIN_SPINS * 360 + degreesNeeded;

        setRotation(nextRotation);
        setMustSpin(true);
        setHasSpin(true);

        setTimeout(() => {
            setMustSpin(false);
            setPrize(winnerObj.option);
        }, SPIN_DURATION_MS);
    };

    const wheelStyle = useMemo(
        () => ({
            transform: `rotate(${rotation}deg)`,
            transition: mustSpin
                ? `transform ${SPIN_DURATION_MS / 1000}s cubic-bezier(0.15, 0.9, 0.2, 1)`
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
                    className="relative w-full h-full rounded-full overflow-hidden border-8 md:border-12 border-[#FFDCC3] shadow-2xl z-10"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(255, 103, 0, 0.1), rgba(251, 47, 53, 0.1) 100%)",
                    }}
                >
                    {/* Spinning Wheel */}
                    <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden" style={wheelStyle}>
                        {data.map((segment, index) => {
                            const angle = index * SEGMENT_ANGLE;
                            const centerAngle = angle + SEGMENT_ANGLE / 2;

                            return (
                                <div key={index}>
                                    {/* Colored segment slice */}
                                    <div
                                        className="absolute inset-0 origin-center"
                                        style={{
                                            transform: `rotate(${angle}deg)`,
                                            background: `conic-gradient(${segment.color} 0deg ${SEGMENT_ANGLE}deg, transparent ${SEGMENT_ANGLE}deg 360deg)`,
                                            clipPath: "circle(50% at 50% 50%)",
                                        }}
                                    />

                                    {/* Image & Label container centered in slice (always upright: top image, bottom name) */}
                                    <div
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                                        style={{
                                            transform: `rotate(${centerAngle}deg) translateY(-34%) rotate(-${centerAngle + rotation}deg)`,
                                            transition: mustSpin
                                                ? `transform ${SPIN_DURATION_MS / 1000}s cubic-bezier(0.15, 0.9, 0.2, 1)`
                                                : "none",
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <img
                                                src={segment.image}
                                                alt={segment.option}
                                                className="w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-md mb-1"
                                            />
                                            <span
                                                className="text-xs sm:text-sm font-extrabold tracking-wide drop-shadow-sm text-center"
                                                style={{ color: segment.textColor }}
                                            >
                                                {segment.option}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Center Logo / Pointer Pin */}
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
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
                className="mt-5 lg:mt-10 px-8 py-3 text-lg"
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
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mt-6 text-lg lg:text-2xl font-black text-orange-600 bg-orange-100/70 border border-orange-300 px-6 py-2 rounded-full shadow-sm"
                >
                    🎉 You got: <span>{prize}</span>!
                </motion.p>
            )}
        </div>
    );
};

export default FoodWheel;

