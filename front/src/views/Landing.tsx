import { Route, Routes } from "react-router-dom";
import Auth from "@/components/Auth";
import Muscle from "@/components/Muscle";
import Home from "@/components/Home";
import Header from "@/components/Header";

function Landing() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/muscle/:idPart/routines/" element={<Muscle />} />
      </Routes>
    </div>
  );
}

export default Landing;
