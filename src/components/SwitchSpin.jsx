
import { useNavigate } from "react-router";

const SwitchSpin = ({
  message,
  buttonText,
  navigateTo
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between p-2 md:p-4 mt-6 md:my-10 border rounded-lg max-w-md mx-auto bg-white/60 shadow-sm`}
    >
      <span className="text-sm md:text-lg text-gray-700">{message}</span>
      <button
        onClick={() => navigate(navigateTo)} 
        className={`text-sm md:text-lg px-2 py-0.5 md:px-4 md:py-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors duration-200 cursor-pointer`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SwitchSpin;
