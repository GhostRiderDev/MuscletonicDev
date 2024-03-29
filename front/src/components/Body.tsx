import Abdominals from "@/assets/bodyParts/Abdominals";
import ArmLeftButtom from "@/assets/bodyParts/ArmLeftButtom";
import ArmRightButtom from "@/assets/bodyParts/ArmRightButtom";
import BicepsLeft from "@/assets/bodyParts/BicepsLeft";
import BicepsRight from "@/assets/bodyParts/BicepsRight";
import ObliqueLeft from "./ObliqueLeft";
import ObliqueRight from "@/assets/bodyParts/ObliqueRight";
import ShoulderLeft from "@/assets/bodyParts/ShoulderLeft";
import ShoulderRight from "@/assets/bodyParts/ShoulderRight";
import TrapRight from "./TrapRight";
import TrapLeft from "@/assets/bodyParts/TrapLeft";
import ChestLeft from "@/assets/bodyParts/ChestLeft";
import ChestRight from "@/assets/bodyParts/ChestRight";
import RestBody from "@/assets/bodyParts/RestBody";
import QuadRight from "@/assets/bodyParts/QuadRight";
import QuadLeft from "@/assets/bodyParts/QuadLeft";
import CalveLeftLeft from "@/assets/bodyParts/CalveLeftLeft";
import CalveRightRight from "@/assets/bodyParts/CalveRightRight";
import CalveRightLeft from "@/assets/bodyParts/CalveRightLeft";
import CalveLeftRight from "@/assets/bodyParts/CalveLeftRight";
import RestAbdominal from "@/assets/bodyParts/RestAbdominal";

function Body() {
  return (
    <svg
      viewBox="0 0 673 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full lg:w-[400px]  sm:mx-auto "
    >
      <g id="abdominals">
        <Abdominals />
      </g>
      <g id="obliques">
        <ObliqueLeft />
        <ObliqueRight />
      </g>
      <g id="forearms">
        <ArmLeftButtom />
        <ArmRightButtom />
      </g>
      <g id="biceps">
        <BicepsLeft />
        <BicepsRight />
      </g>
      <g id="shoulders">
        <ShoulderLeft />
        <ShoulderRight />
      </g>
      <g id="traps">
        <TrapRight />
        <TrapLeft />
      </g>
      <g id="chest">
        <ChestLeft />
        <ChestRight />
      </g>
      <g id="quads">
        <QuadRight />
        <QuadLeft />
      </g>
      <g id="calves">
        <CalveLeftLeft />
        <CalveRightRight />
        <CalveRightLeft />
        <CalveLeftRight />
      </g>
      <RestAbdominal />
      <RestBody />
    </svg>
  );
}

export default Body;
