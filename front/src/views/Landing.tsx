import { Route, Routes } from "react-router-dom";
import Register from "@/components/Register";

function Landing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1> Hello</h1>} />
        <Route path="/home" element={<h1> Hello</h1>} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Landing;
