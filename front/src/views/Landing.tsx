import { Route, Routes } from "react-router-dom";
import Auth from "@/components/Auth";

function Landing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1> Hello</h1>} />
        <Route path="/home" element={<h1> Hello</h1>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default Landing;
