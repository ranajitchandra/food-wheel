import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { Star } from "lucide-react";

export default function Stats() {
    const sectionRef = useRef(null);
    const [startCount, setStartCount] = useState(false);

    const statsData = [
        { end: 50, suffix: "K+", label: "Happy Users" },
        { end: 25, suffix: "K+", label: "Restaurants Listed" },
        { end: 100, suffix: "K+", label: "Spins This Month" },
        { end: 4.9, decimals: 1, icon: <Star className="w-5 h-5 fill-white text-white" />, label: "Average Rating" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCount(true);
                    observer.disconnect(); // stop observing after first trigger
                }
            },
            {
                threshold: 0.3, // trigger when 30% of section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full common text-white py-8 md:py-14 lg:py-20">
            <div className="container mx-auto text-center px-4 space-y-8 md:space-y-10 lg:space-y-20">
                <div className="w-full space-y-4">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                        FoodWheel by the Numbers
                    </h2>
                    <p className="text-sm sm:text-base text-white/90 px-2">
                        Join thousands of food lovers discovering amazing restaurants
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
                    {statsData.map((item, index) => (
                        <div key={index}>
                            <p className="text-2xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center gap-2">
                                {startCount ? (
                                    <CountUp
                                        end={item.end}
                                        duration={2.5}
                                        suffix={item.suffix || ""}
                                        decimals={item.decimals || 0}
                                    />
                                ) : (
                                    0
                                )}
                                {item.icon && item.icon}
                            </p>
                            <p className="text-sm md:text-md md:mt-2">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
