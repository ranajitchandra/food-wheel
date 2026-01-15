import React, { useState } from "react";
import { LiaRandomSolid } from "react-icons/lia";
import customizePng from "../assets/customize-button/🎨.png";
import { RxCross2 } from "react-icons/rx";
import { FaMinus, FaPlus } from "react-icons/fa";
import CommonButton from "../common/CommonButton";


const initialCuisines = [
    { name: "Italian", emoji: "🍝", color: "border-red-400" },
    { name: "Asian", emoji: "🍜", color: "border-teal-400" },
    { name: "Mexican", emoji: "🌮", color: "border-yellow-400" },
    { name: "American", emoji: "🍔", color: "border-amber-400" },
    { name: "Indian", emoji: "🍛", color: "border-orange-400" },
    { name: "French", emoji: "🥐", color: "border-pink-400" },
    { name: "Thai", emoji: "🍤", color: "border-purple-400" },
    { name: "Greek", emoji: "🥗", color: "border-indigo-400" },
];

export default function CuisineCustomizer({ setOpenWindow }) {
    const [cuisines, setCuisines] = useState(initialCuisines);
    const [input, setInput] = useState("");

    const addCuisine = () => {

        if (!input.trim()) return;

        const newCuisine = {
            name: input.trim(),
            emoji: "🍽️",
            color: "border-gray-400",
        };
        setCuisines([...cuisines, newCuisine]);
        setInput("");
    };

    const removeCuisine = (name) => {
        setCuisines(cuisines.filter((c) => c.name !== name));
    };

    function simpleShuffle(array) {
        const copy = [...array];
        const shuffled = [];

        while (copy.length > 0) {
            const randomIndex = Math.floor(Math.random() * copy.length);
            shuffled.push(copy[randomIndex]);
            copy.splice(randomIndex, 1);
        }

        return shuffled;
    }


    const shuffleCuisines = () => {
        const shuffled = simpleShuffle(cuisines);
        setCuisines(shuffled);
    };

    return (
        <div className="bg-white p-6 mt-4 rounded-lg shadow-md border border-orange-300">
            {/* close btn */}
            <button className="w-full flex justify-between items-center gap-4 px-2 py-7 text-black">
                <span className="flex items-center gap-2 text-md">
                    <img
                        src={customizePng}
                        alt="Customize icon"
                        className="w-5 h-5"
                    />
                    Customize
                </span>
                <span onClick={() => setOpenWindow(true)} className="text-lg cursor-pointer"><FaMinus /></span>
            </button>
            {/* Add Input */}
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="e.g., Thai, French..."
                    defaultValue={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-4 py-2	 bg-gray-100 border border-none rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
                />
                <CommonButton onClick={addCuisine} className="!p-3"><FaPlus size={18} /></CommonButton>
            </div>

            {/* Cuisines */}
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                    Current Cuisines
                </span>
                <button
                    onClick={shuffleCuisines}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-600 cursor-pointer"
                >
                    <LiaRandomSolid size={22} /> Shuffle
                </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                {cuisines.map((cuisine) => (
                    <span
                        key={cuisine.name}
                        className={`flex items-center gap-1 border ${cuisine.color} rounded-full px-3 py-1 text-sm bg-white shadow-sm`}
                    >
                        {cuisine.emoji} {cuisine.name}
                        <button
                            onClick={() => removeCuisine(cuisine.name)}
                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                        >
                            <RxCross2 size={18}/>
                        </button>
                    </span>
                ))}
            </div>

            <p className="text-xs text-gray-500">Minimum 3 cuisines required</p>
        </div>
    );
}
