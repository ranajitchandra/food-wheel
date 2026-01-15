import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ProfileLayout from "../layouts/ProfileLayout";
import UserProfile from "../components/profile/UserProfile";
import SavedLocations from "../components/profile/Location";
import History from "../components/profile/History";
import Settings from "../components/profile/Settings";
import ChangePassword from "../components/profile/ChangePassword";
import WheelSpinPage from "../pages/wheelSpinPage/WheelSpinPage";
import SlotSpinPage from "../pages/SlotSpinPage/SlotSpinPage";
import UpdatePassword from "../pages/auth/UpdatePassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import VerifyOtp from "../pages/auth/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'wheel-spin',
        Component: WheelSpinPage
      },
      {
        path: 'slot-spin',
        Component: SlotSpinPage
      }
    ],
  },
  {
    path: "auth/signin",
    element: <Login />,
  },
  {
    path: "auth/signup",
    element: <SignUp />,
  },
  {
    path: "auth/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: 'auth/update-password',
    element: <UpdatePassword/>
  },
  {
    path: 'auth/verify-email',
    element: <VerifyEmail/>
  },
  {
    path: '/auth/verify-otp',
    element: <VerifyOtp/>
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
      {
        path: "/profile/locations",
        element: <SavedLocations />,
      },
      {
        path: "/profile/history",
        element: <History />,
      },
      {
        path: "/profile/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/profile/change-password",
    element: <ChangePassword />,
  },
]);

export default router;
