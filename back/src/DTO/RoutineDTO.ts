import { StepDTO } from "./StepDTO";

export interface RoutineDTO {
  id_routine?: string;

  name: string;

  description: string;

  gif: string;

  id_part: number;

  steps: StepDTO[];
}
