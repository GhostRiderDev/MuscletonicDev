import { StepEntity } from "../Entity/StepEntity";

export interface RoutineDTO {
  id_routine: string;

  name: string;

  description: string;

  gif: string;

  id_part: string;

  steps?: StepEntity[];
}
