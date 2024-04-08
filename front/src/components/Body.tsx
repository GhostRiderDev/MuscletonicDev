import RestBody from "@/assets/bodyParts/RestBody";
import RestAbdominal from "@/assets/bodyParts/RestAbdominal";
import { muscles } from "@/data/bodyParts";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setRoutines } from "@/reducers/routinesReducer";
import { AppDispatch } from "@/store/store";
import { validateToken } from "@/services/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, Dispatch, SetStateAction } from "react";

interface BodyProps {
  setIdPart: Dispatch<SetStateAction<number>> | null;
}

function Body({ setIdPart }: BodyProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleClick = async (idPart: number, _name: string) => {
    const token = localStorage.getItem("token");
    validateToken(token!)
      .then(() => {
        navigate(`/muscle/${idPart}/routines/`);
        dispatch(setRoutines(idPart));
      })
      .catch(() => {
        window.localStorage.removeItem("token");
        setIsOpen(true);
      });
  };
  return (
    <>
      {isOpen && (
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿No has iniciado session?</AlertDialogTitle>
              <AlertDialogDescription>
                <img src="woman-doing.jpg" />
                Por favor inicia session o registrate para poder ver los
                ejercicios
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-red-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-green-700"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <svg
        viewBox="0 0 673 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/2 lg:max-h-[28rem] lg:w-[400px]  sm:mx-auto  "
      >
        {muscles.map((muscle) => {
          return (
            <g key={muscle.area}>
              {muscle.childrens.map((child) => {
                const Component = child.component;
                return (
                  <Component
                    handleOnClick={() => {
                      !setIdPart
                        ? handleClick(child.id_part, child.name)
                        : setIdPart(child.id_part);
                    }}
                    key={child.id_part}
                    idPart={child.id_part}
                    namePart={child.name}
                    className="hover:fill-sky-500 hover:cursor-pointer fill-sky-200 z-10 absolute"
                  />
                );
              })}
            </g>
          );
        })}
        <RestAbdominal />
        <RestBody />
      </svg>
    </>
  );
}

export default Body;
