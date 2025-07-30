// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// We don't need to import AuthProvider anymore

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* The <AuthProvider> wrapper is removed */}
    <App />
  </React.StrictMode>
);
