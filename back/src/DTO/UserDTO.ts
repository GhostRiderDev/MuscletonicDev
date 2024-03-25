import { Role } from "../Interface/IUser";

interface UserDTO {
  id_user?: string;
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  id_credential?: string;
}

export default UserDTO;
