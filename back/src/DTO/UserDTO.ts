import { RoutineEntity } from "../Entity/RoutineEntity";
import { Role } from "../Interface/IUser";

interface UserDTO {
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  id_credential?: string;
  routines?: RoutineEntity[];
}

export default UserDTO;
