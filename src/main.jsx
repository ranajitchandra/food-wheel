import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PreferenceProvider } from "./context/PreferenceProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PreferenceProvider>
        <RouterProvider router={router} />
      </PreferenceProvider>
    </QueryClientProvider>
  </StrictMode>
);
