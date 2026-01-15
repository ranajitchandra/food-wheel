import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const historyData = [
  { id: 1, title: "Italian", subtitle: "Mario's Authentic Pasta", date: "Oct 10, 2025", icon: "🍝" },
  { id: 2, title: "Asian", subtitle: "Sakura Sushi Bar", date: "Oct 8, 2025", icon: "🍜" },
  { id: 3, title: "Maxican ", subtitle: "El Corazón Tacos", date: "Oct 5, 2025", icon: "🌮" },
  { id: 4, title: "Indian", subtitle: "Spice Garden", date: "Oct 3, 2025", icon: "🍛" },
  { id: 5, title: "Thai", subtitle: "Bangkok Express", date: "Sep 30, 2025", icon: "🍤" },
];

export default function History() {
  const [historys, setHistorys] = useState(historyData);

  return (
    <section className="bg-white shadow-md rounded-xl my-10 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-8 bg-gradient-to-r from-purple-50 via-orange-50 to-pink-50 border-b">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <IoLocationOutline color="#ff6900" size={20} />
          Recent Spins
        </div>
        <p className="text-sm px-3 py-1.5 rounded-md bg-[#F3E8FF] border-gray-200">
          {historys.length} Spins
        </p>
      </div>

      {/* List */}
      <div className="w-full py-4 md:py-6 lg:py-8">
        {historys.map((loc) => (
          <div
            key={loc.id}
            className="flex justify-between items-center gap-4 md:gap-6 m-4 md:m-6 px-2 py-4 border rounded-lg hover:shadow-sm hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center text-2xl">
                {loc.icon}
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 text-md md:text-lg">
                  {loc.title}
                  <span className="text-xs text-yellow-500">★★★★★</span>
                </h3>
                <p className=" text-xs md:text-sm text-gray-500">{loc.subtitle}</p>
                <p className="text-xs text-gray-400 mt-0.5">{loc.date}</p>
              </div>
            </div>
            <button className=" py-1 px-3 md:px-4 md:py-1.5 text-xs md:text-sm border border-gray-200 rounded-md hover:bg-gray-100 transition-all cursor-pointer">
              View
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
