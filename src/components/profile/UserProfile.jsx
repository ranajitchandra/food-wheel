import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiEdit2 } from "react-icons/fi";
import { MdOutlineEditNote } from "react-icons/md";

export default function UserProfile() {
  const [editable, setEditable] = useState(false);

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Foodie",
      email: "user@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "",
    },
  });

  // On submit
  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    setEditable(false);
  };

  return (
    <section className="bg-white shadow-md rounded-md my-10">
      <div className="bg-white rounded-md shadow-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#FEF3F1] rounded-t-md p-4 md:p-8 border-b border-b-gray-200">
          <div className="flex items-center gap-3 text-gray-700">
            <FiUser color="#ff6900" /> Personal Information
          </div>
          <button
            onClick={() => setEditable(!editable)}
            className="bg-white border border-[#ffc9c9] py-1 px-4 rounded-md cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2 text-gray-700">
              {editable ? (
                <>
                  <MdOutlineEditNote size={19} /> Save
                </>
              ) : (
                <>
                  <FiEdit2 size={19} /> Edit
                </>
              )}
            </div>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 "
        >
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              readOnly={!editable}
              className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                errors.firstName ? "border-red-400" : "border-gray-200"
              } ${editable ? "bg-white focus:ring-orange-400" : "bg-gray-50"}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              readOnly={!editable}
              className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                editable
                  ? "bg-white focus:ring-orange-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              readOnly={!editable}
              className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-400" : "border-gray-200"
              } ${editable ? "bg-white focus:ring-orange-400" : "bg-gray-50"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              readOnly={!editable}
              className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                editable
                  ? "bg-white focus:ring-orange-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-500 mb-1">
              Default Location
            </label>
            <input
              type="text"
              {...register("location")}
              readOnly={!editable}
              className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                editable
                  ? "bg-white focus:ring-orange-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-500 mb-1">Bio</label>
            <textarea
              rows="4"
              {...register("bio")}
              readOnly={!editable}
              className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                editable
                  ? "bg-white focus:ring-orange-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            ></textarea>
          </div>

          {/* Save Button (only visible in edit mode) */}
          {editable && (
            <div className="md:col-span-2 flex justify-end mt-2">
              <button
                type="submit"
                className="bg-[linear-gradient(90deg,rgba(255,104,0,1),rgba(250,44,54,1)100%)] text-white py-1 px-7 rounded-md hover:opacity-90 transition-all"
              >
                Update
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
