import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Stats from "../components/Stats";
import CoreFeatures from "../components/CoreFeatures";
import Banner from "../components/Banner";
import Test from "../components/Test";

const MainLayout = () => {
  return (
    <div>
      {/* <ScrollRestoration/> */}
      <Navbar />
      <Outlet />
      <CoreFeatures/>
      <Stats/>
      <Footer />
    </div>
  );
};

export default MainLayout;
