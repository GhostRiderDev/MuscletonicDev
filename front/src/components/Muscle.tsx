import { useSelector } from "react-redux";
import { IRoutine } from "@/interfaces/IRoutine";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";

function Muscle() {
  const routines = useSelector(
    (state: { routines: IRoutine[] }) => state.routines
  );

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="gap-10">
      {routines.map((routine, idx) => (
        <Card key={routine.id_routine} className="mx-auto my-6 w-7/12 pb-4">
          <CardHeader className="bg-blue-700 rounded-md text-white">
            <CardTitle className="text-2xl">
              {capitalize(routine.name)}
            </CardTitle>
          </CardHeader>
          <section className="flex justify-around pt-4">
            <img
              src={routine.gif}
              className="w-2/5 rounded-md"
              loading={idx !== 0 ? "eager" : "lazy"}
            />
            <img
              src={routine.gif}
              className="w-2/5 rounded-md"
              loading={idx !== 0 ? "eager" : "lazy"}
            />
          </section>
          <p className="px-10 pt-6">{routine.description}</p>
          {[...routine.steps]
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <div
                key={step.id_step}
                className="flex mt-7 gap-6 items-center px-4"
              >
                <div className="w-14 h-14 rounded-full bg-blue-700 flex justify-center items-center text-white">
                  <p>{step.order - 1}</p>
                </div>
                <p>{step.content}</p>
              </div>
            ))}
        </Card>
      ))}
      <Body />
    </div>
  );
}

export default Muscle;
