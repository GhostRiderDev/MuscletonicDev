import Abdominals from "@/assets/bodyParts/Abdominals";
import ArmLeftButtom from "@/assets/bodyParts/ArmLeftButtom";
import ArmRightButtom from "@/assets/bodyParts/ArmRightButtom";
import BicepsLeft from "@/assets/bodyParts/BicepsLeft";
import BicepsRight from "@/assets/bodyParts/BicepsRight";
import ObliqueLeft from "../assets/bodyParts/ObliqueLeft";
import ObliqueRight from "@/assets/bodyParts/ObliqueRight";
import ShoulderLeft from "@/assets/bodyParts/ShoulderLeft";
import ShoulderRight from "@/assets/bodyParts/ShoulderRight";
import TrapRight from "../assets/bodyParts/TrapRight";
import TrapLeft from "@/assets/bodyParts/TrapLeft";
import ChestLeft from "@/assets/bodyParts/ChestLeft";
import QuadRight from "@/assets/bodyParts/QuadRight";
import QuadLeft from "@/assets/bodyParts/QuadLeft";
import CalveLeftLeft from "@/assets/bodyParts/CalveLeftLeft";
import CalveRightRight from "@/assets/bodyParts/CalveRightRight";
import CalveRightLeft from "@/assets/bodyParts/CalveRightLeft";
import CalveLeftRight from "@/assets/bodyParts/CalveLeftRight";
import ChestRight from "@/assets/bodyParts/ChestRight";

export const muscles = [
  {
    area: "abdominal",
    childrens: [{ id_part: 1, name: "abdominal", component: Abdominals }],
  },
  {
    area: "obliques",
    childrens: [
      { id_part: 2, name: "obliqueLeft", component: ObliqueLeft },
      { id_part: 3, name: "obliqueRight", component: ObliqueRight },
    ],
  },
  {
    area: "forearms",
    childrens: [
      { id_part: 4, name: "forearmsLeft", component: ArmLeftButtom },
      { id_part: 5, name: "forearms", component: ArmRightButtom },
    ],
  },
  {
    area: "biceps",
    childrens: [
      { id_part: 6, name: "bicepLeft", component: BicepsLeft },
      { id_part: 7, name: "bicepRight", component: BicepsRight },
    ],
  },
  {
    area: "shoulders",
    childrens: [
      { id_part: 8, name: "shoulderLeft", component: ShoulderLeft },
      { id_part: 9, name: "shoulderRight", component: ShoulderRight },
    ],
  },
  {
    area: "traps",
    childrens: [
      { id_part: 10, name: "trapLeft", component: TrapLeft },
      { id_part: 11, name: "trapRight", component: TrapRight },
    ],
  },
  {
    area: "chest",
    childrens: [
      { id_part: 12, name: "chestLeft", component: ChestLeft },
      { id_part: 13, name: "chestRight", component: ChestRight },
    ],
  },
  {
    area: "quads",
    childrens: [
      { id_part: 14, name: "quadLeft", component: QuadLeft },
      { id_part: 15, name: "quadRight", component: QuadRight },
    ],
  },
  {
    area: "calves",
    childrens: [
      { id_part: 16, name: "calveLeftLeft", component: CalveLeftLeft },
      { id_part: 17, name: "calveRightRight", component: CalveRightRight },
      { id_part: 18, name: "calveRightLeft", component: CalveRightLeft },
      { id_part: 19, name: "calveLeftRight", component: CalveLeftRight },
    ],
  },
];
