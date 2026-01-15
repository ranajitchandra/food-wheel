import { createContext, useContext, useState } from "react";

const PreferencesContext = createContext();

export const PreferenceProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [preferences, setPreferences] = useState({
    location: "",
    budget: "",
    distance: "",
    rating: 0,
  });
   const [selectedView, setSelectedView] = useState("main");

  const [showRestaurants, setShowRestaurants] = useState(false);

  return (
    <PreferencesContext.Provider
      value={{
        modalType,
        setModalType,
        preferences,
        setPreferences,
        showRestaurants,
        setShowRestaurants,
        selectedView,
        setSelectedView
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePreferences = () => useContext(PreferencesContext);
