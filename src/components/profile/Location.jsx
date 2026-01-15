import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaHome, FaRegStar  } from "react-icons/fa";
import { IoHomeOutline, IoBagOutline  } from "react-icons/io5";

import { IoLocationOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const initialLocations = [
    {
        id: 1,
        label: "Home",
        type: "home",
        address: "123 Main St, San Francisco, CA 94102",
        icon: <IoHomeOutline size={22} />
    },
    {
        id: 2,
        label: "Work",
        type: "work",
        address: "456 Market St, San Francisco, CA 94103",
        icon: <IoBagOutline size={22} />
    },
    {
        id: 3,
        label: "Favorite Spot",
        type: "favorite",
        address: "Fisherman's Wharf, San Francisco, CA",
        icon: <FaRegStar size={22} />
    },
];


export default function SavedLocations() {
    const [locations, setLocations] = useState(initialLocations);
    const [showModal, setShowModal] = useState(false);
    const [newLocation, setNewLocation] = useState({ label: "", type: "", address: "", icon: "" });

    const handleAddLocation = () => {
        if (!newLocation.label || !newLocation.type || !newLocation.address) {
            alert("Please fill all fields");
            return;
        }
        const nextId = locations.length ? locations[locations.length - 1].id + 1 : 1;
        setLocations([...locations, { id: nextId, ...newLocation }]);
        setNewLocation({ label: "", type: "", address: "", icon: "" });
        setShowModal(false);
    };

    return (
        <section className="bg-white shadow-md rounded-md my-10 relative">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#FEF3F1] rounded-t-md p-4 md:p-8 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-700">
                    <IoLocationOutline color="#ff6900" size={22} /> Saved Locations
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-white border border-[#ffc9c9] text-sm py-1 px-2 md:py-1 md:px-4 rounded-md cursor-pointer hover:bg-white/10 transition-all"
                >
                    Add Location
                </button>
            </div>

            {/* Locations List */}
            <div className="px-4 py-8 md:p-6 space-y-4">
                {locations.map((loc) => (
                    <div
                        key={loc.id}
                        className="w-full flex justify-between xs:!items-center items-start gap-4 md:gap-6 p-2 md:p-4 border rounded-lg hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 text-orange-500 !w-10 !h-10 p-2 flex items-center justify-center rounded-full">
                                <div className="flex items-center justify-center w-6 h-8 overflow-hidden">
                                    {loc.icon}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700 text-md md:text-lg">{loc.label}</span>
                                    <span className="text-xs text-gray-400 px-2 py-0.5 rounded bg-gray-100">
                                        {loc.type}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-xs">{loc.address}</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-3 text-gray-400">
                            <button className="hover:text-orange-500 transition-all cursor-pointer">
                                <FiEdit2 className="w-4 md:w-5 h-4 md:h-5" />
                            </button>
                            <button
                                onClick={() =>
                                    setLocations(locations.filter((l) => l.id !== loc.id))
                                }
                                className="hover:text-red-500 transition-all cursor-pointer"
                            >
                                <FiTrash2 className="w-4 md:w-5 h-4 md:h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-md w-full max-w-md shadow-lg m-4"
                            initial={{ y: -50, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -50, opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <h2 className="text-lg font-semibold mb-4">Add New Location</h2>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Label"
                                    value={newLocation.label}
                                    onChange={(e) =>
                                        setNewLocation({ ...newLocation, label: e.target.value })
                                    }
                                    className="border rounded-md px-3 py-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Type"
                                    value={newLocation.type}
                                    onChange={(e) =>
                                        setNewLocation({ ...newLocation, type: e.target.value })
                                    }
                                    className="border rounded-md px-3 py-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={newLocation.address}
                                    onChange={(e) =>
                                        setNewLocation({ ...newLocation, address: e.target.value })
                                    }
                                    className="border rounded-md px-3 py-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Icon (emoji)"
                                    value={newLocation.icon}
                                    onChange={(e) =>
                                        setNewLocation({ ...newLocation, icon: e.target.value })
                                    }
                                    className="border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-md border hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddLocation}
                                    className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-all"
                                >
                                    Add
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
