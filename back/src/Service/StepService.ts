import { StepDAO } from "../DAO/DAOs";
import { StepDTO } from "../DTO/StepDTO";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";

export const findSteps = async (): Promise<StepDTO[]> => {
  const stepsDB = await StepDAO.find();

  return stepsDB;
};

export const findStepsByRoutine = async (
  id_routine: string
): Promise<StepDTO[]> => {
  const stepsDB = await StepDAO.findBy({ id_routine });
  return stepsDB;
};

export const findStep = async (id: string): Promise<StepDTO> => {
  const stepDB = await StepDAO.findOneBy({ id_step: id });

  if (!stepDB) {
    throw new ResourceNotFoundError("Step not found");
  }

  return stepDB;
};

export const addStep = async (step: StepDTO): Promise<StepDTO> => {
  const stepDB = await StepDAO.save(step);
  return stepDB;
};

export const addSteps = async (steps: StepDTO[]): Promise<StepDTO[]> => {
  const stepsDB = await StepDAO.save(steps);
  return stepsDB;
};

export const refreshStep = async (
  id: string,
  step: StepDTO
): Promise<StepDTO> => {
  const stepDB = await StepDAO.findOneBy({ id_step: id });
  if (!stepDB) {
    throw new ResourceNotFoundError("Step not found");
  }
  const stepUpdated = await StepDAO.save(step);
  return stepUpdated;
};

export const removeStep = async (id: string): Promise<void> => {
  const stepDB = await StepDAO.findOneBy({ id_step: id });
  if (!stepDB) {
    throw new ResourceNotFoundError("Step not found");
  }
  await StepDAO.delete(stepDB);
};
