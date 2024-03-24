import CredentialEntity from "../Entity/CredentialEntity";
import { PartEntity } from "../Entity/PartEntity";
import { RoutineEntity } from "../Entity/RoutineEntity";
import { StepEntity } from "../Entity/StepEntity";
import { UserEntity } from "../Entity/UserEntity";
import { AppDataSource } from "../data-source";

export const UserDAO = AppDataSource.getRepository(UserEntity);
export const CredentialDAO = AppDataSource.getRepository(CredentialEntity);
export const RoutineDAO = AppDataSource.getRepository(RoutineEntity);
export const StepDAO = AppDataSource.getRepository(StepEntity);
export const PartDAO = AppDataSource.getRepository(PartEntity);
