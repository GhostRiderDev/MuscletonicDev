import { Route, Routes } from "react-router-dom";
import Auth from "@/components/Auth";
import Body from "@/components/Body";

function Landing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/home" element={<h1> Hello</h1>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default Landing;
