// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
//! viteLogo va en la propiedad asi: src={viteLogo}
// This is a proof of concept for github actions on github

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./views/Landing";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./views/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Landing />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
