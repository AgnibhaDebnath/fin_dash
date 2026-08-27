import React from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";
import AuthProvider from "./context/AuthContext.jsx";
import FilterProvider from "./context/FilterContext";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <FilterProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FilterProvider>
        </AuthProvider>
    </StrictMode>,
);
