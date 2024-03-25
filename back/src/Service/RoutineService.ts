import { RoutineDAO } from "../DAO/DAOs";
import { RoutineDTO } from "../DTO/RoutineDTO";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";

export const findRoutines = async (): Promise<RoutineDTO[]> => {
  const routinesDB = await RoutineDAO.find();

  return routinesDB;
};

export const findRoutine = async (id: string): Promise<RoutineDTO> => {
  const routineDB = await RoutineDAO.findOneBy({ id_routine: id });
  if (!routineDB) {
    throw new ResourceNotFoundError("Routine not found");
  }
  return routineDB;
};

export const addRoutine = async (routine: RoutineDTO): Promise<RoutineDTO> => {
  const routineDB = await RoutineDAO.save(routine);
  return routineDB;
};

export const refreshRoutine = async (
  id: string,
  routine: RoutineDTO
): Promise<RoutineDTO> => {
  const routineDB = await RoutineDAO.findOneBy({ id_routine: id });
  if (!routineDB) {
    throw new ResourceNotFoundError("Routine not found");
  }
  const routineUpdated = await RoutineDAO.save(routine);
  return routineUpdated;
};

export const removeRoutine = async (id: string): Promise<void> => {
  const routineDB = await RoutineDAO.findOneBy({ id_routine: id });
  if (!routineDB) {
    throw new ResourceNotFoundError("Routine not found");
  }
  await RoutineDAO.delete(routineDB);
};
