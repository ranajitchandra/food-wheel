import { motion } from "framer-motion"; //eslint-disable-line
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

// Example food items
const items = [
    { icon: "🥙", label: "Thai" },
    { icon: "🌮", label: "Mexican" },
    { icon: "🍔", label: "American" },
    { icon: "🍣", label: "French" },
    { icon: "🍕", label: "Italian" },
    { icon: "🥗", label: "Greek" },
];

export default function FoodSlot({ setSpinValue }) {
    const [spinning, setSpinning] = useState(false);
    const [y, setY] = useState(0);
    const [centerItem, setCenterItem] = useState(null);

    useEffect(() => {
        if (centerItem) {
            setSpinValue(centerItem);
        }
    }, [centerItem, setSpinValue]);


    const ITEM_HEIGHT = 120;
    const TOTAL_ITEMS = items.length;
    const CENTER_OFFSET = 1; // middle of 3 visible items

    const spin = () => {
        if (spinning) return;
        setSpinning(true);

        const randomIndex = Math.floor(Math.random() * TOTAL_ITEMS);
        const loops = 5;

        // Adjust for center offset so result ends up in the middle
        const finalOffset = (loops * TOTAL_ITEMS + randomIndex - CENTER_OFFSET) * ITEM_HEIGHT;

        console.log(centerItem);


        setY(-finalOffset);

        setTimeout(() => {
            setSpinning(false);
            const resultIndex = randomIndex % TOTAL_ITEMS;
            setCenterItem(items[resultIndex].label);
        }, 2500);
    };

    return (
        <>

            <div className="flex flex-col items-center justify-center space-y-6">
                {/* Outer frame */}
                <div className="bg-[#FCC600] p-3 rounded-xl">
                    <div className="relative h-[380px] w-[180px] overflow-hidden rounded-xl border-14 border-[#1e1e1e] bg-[#ffffff] shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
                        {/* Highlight center area */}
                        <div className="absolute top-1/2 left-0 w-full h-[120px] -translate-y-1/2 rounded-md border-4 border-[#FF6602] z-10 pointer-events-none" />

                        {/* Spinning content */}
                        <motion.div
                            animate={{ y }}
                            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                            classyxName="flex flex-col text-center"
                            onAnimationComplete={() => {
                                const remainder = y % (TOTAL_ITEMS * ITEM_HEIGHT);
                                console.log(remainder);

                                setY(remainder);
                            }}
                        >
                            {Array(8)
                                .fill(items)
                                .flat()
                                .map((item, i) => (
                                    <div
                                        key={i}
                                        className="h-[120px] flex flex-col justify-center items-center text-gray-800"
                                    >
                                        <div className="text-5xl mb-2">{item.icon}</div>
                                        <div className="text-lg font-semibold">{item.label}</div>
                                    </div>
                                ))}
                        </motion.div>
                    </div>
                </div>

                {/* Spin button */}
                <button
                    onClick={spin}
                    disabled={spinning}
                    className={`px-6 py-3 text-white font-semibold rounded-full text-sm shadow-md cursor-pointer ${spinning
                        ? "bg-[#ff5c35] cursor-not-allowed"
                        : "bg-[#ff5c35] hover:bg-[#ff3a00]"
                        } transition-all`}
                >
                    {spinning ? <div className="flex items-center gap-2 ">
                        <PulseLoader
                            color="#ffffff"
                            size={12}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className="p-0.5"
                        />
                    </div> : <div className="flex items-center gap-4 "><FaPlay /> Spin the Slot</div>}
                </button>

                {/* Result */}
                {centerItem && (
                    <div className="text-xl font-semibold mt-2 text-orange-600">
                        Center Item:{" "}
                        <span className="font-bold">{centerItem}</span>
                    </div>
                )}
            </div>
        </>
    );
}
