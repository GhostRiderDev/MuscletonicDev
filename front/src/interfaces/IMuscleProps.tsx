export interface IMuscleProps {
  className?: string;
  idPart: number;
  namePart: string;
  handleOnClick: (name: string, idPart: number) => void;
}
