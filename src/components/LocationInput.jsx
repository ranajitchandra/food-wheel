import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import CommonButton from '../common/CommonButton';


export default function LocationInput() {
    return (
        <div className='bg-[#FAE7DA] mt-6 p-2 md:p-2 lg:p-4 rounded-md '>
            <div className="relative">
                <IoLocationOutline size={18} className="absolute left-3 top-3 text-orange-400" />
                <input
                    type="text"
                    placeholder="Enter Address or Use Location"
                    className="w-full pl-9 pr-42 py-3 bg-gray-50 border text-xs border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
                />
                <CommonButton className='!text-xs !md:text-md !px-2 !md:px-6 !py-3 !md:py-2 absolute top-1/2 right-0 -translate-y-1/2'>Confirm Location</CommonButton>
            </div>

        </div>
    )
}
