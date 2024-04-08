import { useSelector } from "react-redux";
import { IRoutine } from "@/interfaces/IRoutine";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Body from "@/components/Body";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoutines } from "@/reducers/routinesReducer";
import { AppDispatch } from "@/store/store";

function Muscle() {
  const param = useParams();
  const idPart = param.idPart;
  const dispatch: AppDispatch = useDispatch();
  const [routinesUI, setRoutinesUI] = useState<IRoutine[]>([]);
  const routines = useSelector(
    (state: { routines: IRoutine[] }) => state.routines
  );

  useEffect(() => {
    dispatch(setRoutines(parseInt(idPart!)));
  }, [idPart, dispatch]);

  useEffect(() => {
    setRoutinesUI(routines);
  }, [routines]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-row px-10 py-10 max-w-[70vw]">
      <div className="gap-10 flex flex-col">
        {routinesUI.map((routine, idx) => (
          <Card key={routine.id_routine} className="mx-auto w-full pb-4">
            <CardHeader className="bg-blue-700 rounded-md text-white">
              <CardTitle className="text-2xl">
                {capitalize(routine.name)}
              </CardTitle>
            </CardHeader>
            <section className="flex justify-around pt-4">
              <img
                src={routine.gif}
                className="w-2/5 rounded-md"
                loading={idx == 0 ? "eager" : "lazy"}
              />
              <img
                src={routine.gif}
                className="w-2/5 rounded-md"
                loading={idx == 0 ? "eager" : "lazy"}
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
      </div>
      <div className="my-10 fixed top-18 right-0 h-screen ">
        <Body setIdPart={null} />
      </div>
    </div>
  );
}

export default Muscle;
