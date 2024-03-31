import { muscles } from "@/data/bodyParts";
import { useParams } from "react-router";

function Muscle() {
  const idPart = parseInt(useParams().idPart as string);
  const allMuscles = muscles
    .map((muscle) => muscle.childrens)
    .flatMap((muscle) => muscle);
  const muscle = allMuscles.find((muscle) => muscle.id_part == idPart);
  return (
    <div>
      <h1> Muscle: {muscle?.name}</h1>
    </div>
  );
}

export default Muscle;
