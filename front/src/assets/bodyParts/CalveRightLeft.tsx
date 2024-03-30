import { IMuscleProps } from "@/interfaces/IMuscleProps";

function CalveRightLeft({
  className = "",
  idPart,
  namePart,
  handleOnClick,
}: IMuscleProps) {
  return (
    <path
      className={className}
      onClick={() => handleOnClick(namePart, idPart)}
      d="M419.322 902.906C418.618 902.747 417.894 902.558 417.19 902.32V902.3C412.25 900.74 407.39 897.7 402.91 893.4C403.53 898.32 402.73 906.81 400.35 927.92C394.241 972.272 398.539 978.278 402.688 984.077L402.69 984.08L402.759 984.178C404.278 986.317 405.847 988.527 406.95 992.28C406.99 992.4 407.02 992.53 407.07 992.65L407.819 992.047C418.013 983.845 426.766 976.803 425.38 954.81C424.524 941.224 422.33 925.11 420.55 912.034L420.546 912.01C420.104 908.758 419.687 905.695 419.322 902.906Z"
      fill="currentColor"
    ></path>
  );
}

export default CalveRightLeft;
