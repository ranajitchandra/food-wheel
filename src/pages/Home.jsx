import { useEffect } from "react";
import { useNavigate } from "react-router";
import Banner from "../components/Banner";
import { usePreferences } from "../context/PreferenceProvider";

const Home = () => {
  const { selectedView } = usePreferences();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedView === "wheel") {
      navigate("/wheel-spin");
    } else if (selectedView === "slot") {
      navigate("/slot-spin");
    }
  }, [selectedView, navigate]);

  return (
    <div className="w-full">
      <Banner />
    </div>
  );
};

export default Home;
