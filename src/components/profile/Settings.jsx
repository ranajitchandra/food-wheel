

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router";

export default function Settings() {

    return (
        <section className="bg-white shadow-md rounded-xl my-10 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-purple-50 via-orange-50 to-pink-50 border-b">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <MdLockOutline className="font-bold" size={20} />
                    Account & Security
                </div>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-100 my-12 mx-4 md:mx-6">
                <Link to="/profile/change-password" className="flex items-center gap-4 border border-gray-300 my-3 py-2 px-3 rounded-md text-sm hover:shadow-sm cursor-pointer">
                    <MdLockOutline size={22} />
                    <button>Change Password</button>
                </Link>
                <Link to="#" className="flex items-center gap-4 border border-gray-300 my-3 py-2 px-3 rounded-md text-sm hover:shadow-sm cursor-pointer text-red-500">
                    <RiDeleteBin6Line size={22} />
                    <button>Delete Account</button>
                </Link>
            </div>

        </section>
    );
}
