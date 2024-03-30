import { IMuscleProps } from "@/interfaces/IMuscleProps";

function CalveLeftLeft({
  className = "",
  idPart,
  namePart,
  handleOnClick,
}: IMuscleProps) {
  return (
    <path
      className={className}
      onClick={() => handleOnClick(namePart, idPart)}
      d="M213.13 880.79C213.65 879.35 214.06 878.18 214.36 877.22C219.58 878.81 222.24 881.96 226.36 889.29C225.671 901.305 223.421 919.666 221.458 935.675C220.998 939.426 220.554 943.049 220.15 946.43C218.66 958.9 213.28 974.49 201.61 983.81C201.488 983.915 201.362 984.013 201.237 984.104C201.147 984.169 201.058 984.231 200.97 984.29C196.03 928.87 208.12 894.82 213.13 880.79Z"
      fill="currentColor"
    ></path>
  );
}

export default CalveLeftLeft;
