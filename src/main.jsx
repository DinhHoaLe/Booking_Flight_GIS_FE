import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TourSearchContextProvider } from "../src/context/TourSearchContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Tạo một instance của QueryClient
const queryClient = new QueryClient();
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId="1031104764261-5kcn6354nd1tai108r56gm38c9hqj0ec.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
  </React.StrictMode>
);
