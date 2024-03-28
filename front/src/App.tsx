// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
//! viteLogo va en la propiedad asi: src={viteLogo}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./views/Landing";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <h1>Hola</h1>
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
