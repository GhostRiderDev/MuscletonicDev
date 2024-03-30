import { IMuscleProps } from "@/interfaces/IMuscleProps";

function CalveRightRight({
  className = "",
  idPart,
  namePart,
  handleOnClick,
}: IMuscleProps) {
  return (
    <path
      className={className}
      onClick={() => handleOnClick(namePart, idPart)}
      d="M446.26 889.29C450.38 881.96 453.04 878.82 458.26 877.22C458.57 878.18 458.97 879.35 459.49 880.79C464.49 894.82 476.59 928.87 471.65 984.29C471.44 984.15 471.22 983.99 471.01 983.81C459.34 974.48 453.96 958.9 452.47 946.43C452.066 943.049 451.622 939.427 451.162 935.676C449.199 919.667 446.949 901.305 446.26 889.29Z"
      fill="currentColor"
    ></path>
  );
}

export default CalveRightRight;
