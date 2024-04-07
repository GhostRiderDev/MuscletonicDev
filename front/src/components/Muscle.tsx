import { useSelector } from "react-redux";
import { IRoutine } from "@/interfaces/IRoutine";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";

function Muscle() {
  const routines = useSelector(
    (state: { routines: IRoutine[] }) => state.routines
  );

  // const idPart = parseInt(useParams().idPart as string);
  // const allMuscles = muscles
  //   .map((muscle) => muscle.childrens)
  //   .flatMap((muscle) => muscle);

  console.log("", routines);
  return (
    <div>
      {routines.map((routine) => (
        <Card key={routine.id_routine} className="mx-auto my-6 w-7/12">
          <CardHeader className="bg-blue-700 rounded-md text-white">
            <CardTitle className="text-2xl">{routine.name}</CardTitle>
          </CardHeader>
          <section className="flex justify-around">
            <img src={routine.gif} className="w-2/5 rounded-md"></img>
            <img src={routine.gif} className="w-2/5 rounded-md"></img>
          </section>
          <p>{routine.description}</p>
          {routine.steps.map((step) => (
            <div key={step.id_step}>
              <h4>{step.name}</h4>
              <p>{step.content}</p>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

export default Muscle;
