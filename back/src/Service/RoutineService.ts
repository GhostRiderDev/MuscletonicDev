import { RoutineDAO } from "../DAO/DAOs";
import { RoutineDTO } from "../DTO/RoutineDTO";
import { StepDTO } from "../DTO/StepDTO";
import { RoutineEntity } from "../Entity/RoutineEntity";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import { findStepsByRoutine } from "./StepService";

export const findRoutines = async (): Promise<RoutineDTO[]> => {
  const routinesDB: RoutineEntity[] = await RoutineDAO.find();
  const routines: RoutineDTO[] = routinesDB.map((routine) => {
    return convertRoutineEntityToDTO(routine);
  });
  const routinesWithSteps = await Promise.all(
    routines.map(async (routine) => {
      const steps = await findStepsByRoutine(routine.id_routine as string);
      return { ...routine, steps };
    })
  );
  return routinesWithSteps;
};

export const findRoutine = async (id: string): Promise<RoutineDTO> => {
  const routineDB: RoutineEntity | null = await RoutineDAO.findOneBy({
    id_routine: id,
  });
  console.log(routineDB, "ROUTINE POR ID");

  if (!routineDB) {
    throw new ResourceNotFoundError("Routine not found");
  }
  const routine: RoutineDTO = convertRoutineEntityToDTO(routineDB);
  const steps: StepDTO[] = await findStepsByRoutine(
    routine.id_routine as string
  );
  routine.steps = steps;
  return routine;
};

export const addRoutine = async (routine: RoutineDTO): Promise<RoutineDTO> => {
  const routineEntity: RoutineEntity = new RoutineEntity();
  routineEntity.name = routine.name;
  routineEntity.description = routine.description;
  routineEntity.gif = routine.gif;
  routineEntity.id_part = routine.id_part;

  const routineDB: RoutineEntity = await RoutineDAO.save(routineEntity);

  return routineDB;
};

export const refreshRoutine = async (
  id: string,
  routine: RoutineDTO
): Promise<RoutineDTO> => {
  const routineDB: RoutineEntity | null = await RoutineDAO.findOneBy({
    id_routine: id,
  });
  if (!routineDB) {
    throw new ResourceNotFoundError("Routine not found");
  }
  const routineUpdated: RoutineEntity = await RoutineDAO.save(
    routine as RoutineEntity
  );
  return routineUpdated;
};

export const removeRoutine = async (id: string): Promise<void> => {
  const routineDB: RoutineEntity | null = await RoutineDAO.findOneBy({
    id_routine: id,
  });
  if (!routineDB) {
    throw new ResourceNotFoundError("Routine not found");
  }
  await RoutineDAO.delete(routineDB);
};

const convertRoutineEntityToDTO = (routine: RoutineEntity): RoutineDTO => {
  return {
    id_routine: routine.id_routine,
    name: routine.name,
    description: routine.description,
    gif: routine.gif,
    id_part: routine.id_part,
    steps: routine.steps,
  };
};
