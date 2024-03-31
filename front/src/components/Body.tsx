import RestBody from "@/assets/bodyParts/RestBody";
import RestAbdominal from "@/assets/bodyParts/RestAbdominal";
import { muscles } from "@/data/bodyParts";
import { useNavigate } from "react-router";

function Body() {
  const navidate = useNavigate();
  const handleClick = (idPart: number, _name: string) => {
    navidate(`/muscle/${idPart}/routines/`);
  };
  return (
    <svg
      viewBox="0 0 673 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-1/2 lg:max-h-[30rem] lg:w-[400px]  sm:mx-auto  "
    >
      {muscles.map((muscle) => {
        return (
          <g key={muscle.area}>
            {muscle.childrens.map((child) => {
              const Component = child.component;
              return (
                <Component
                  handleOnClick={() => handleClick(child.id_part, child.name)}
                  key={child.id_part}
                  idPart={child.id_part}
                  namePart={child.name}
                  className="hover:fill-sky-500 hover:cursor-pointer fill-sky-50 z-10 absolute"
                />
              );
            })}
          </g>
        );
      })}
      <RestAbdominal />
      <RestBody />
    </svg>
  );
}

export default Body;
