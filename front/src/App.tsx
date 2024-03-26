// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
//! viteLogo va en la propiedad asi: src={viteLogo}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/*" element={<h1>Landing</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
