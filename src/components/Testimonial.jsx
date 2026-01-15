import { Star } from "lucide-react";
import avartar1 from "../assets/avatar/Rectangle_1.png";
import avartar2 from "../assets/avatar/Rectangle_2.png";
import avartar3 from "../assets/avatar/Rectangle_3.png";

const testimonials = [
  {
    id: 1,
    name: "Jenny Wilson",
    role: "Fashion Store Owner",
    avatar: avartar1,
    review:
      "FoodWheel turned our weekly dinner debates into a fun game! We've discovered so many amazing local spots we never would have tried otherwise.",
    rating: 5,
  },
  {
    id: 2,
    name: "Courtney Henry",
    role: "Marketing Executive",
    avatar: avartar2,
    review:
      "I love how quick and easy it is to find new restaurants! The design feels modern and intuitive.",
    rating: 5,
  },
  {
    id: 3,
    name: "Leslie Alexander",
    role: "Food Blogger",
    avatar: avartar3,
    review:
      "An absolute must-have for foodies. It saves me time deciding where to eat, and the comparison tool is genius!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-10 lg:py-20">
      <div className="space-y-8">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:tetx-3xl lg:text-5xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Real stories from real food lovers
          </p>
        </div>

        {/* Dynamic Cards */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-between h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-8 text-yellow-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    stroke="none"
                    className="w-4 h-4"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm text-gray-700 mb-8">"{t.review}"</p>

              {/* User Info */}
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
