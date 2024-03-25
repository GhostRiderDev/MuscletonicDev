import UserDTO from "../DTO/UserDTO";
import { TdataLogin } from "../Interface/ICredential";
import { validateCredential } from "./CredentialService";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../Entity/UserEntity";
import { UUID } from "crypto";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import { UserDAO } from "../DAO/DAOs";
import jwt from "jsonwebtoken";
import { SECRET } from "../Config/envs";

export const findUsers = async (): Promise<UserDTO[]> => {
  const usersDB: UserEntity[] = await UserDAO.find();

  const usersDTO: UserDTO[] = await Promise.all(
    usersDB.map((userDB: UserEntity) => {
      const userDTO = convertUserToDTO(userDB);
      return userDTO;
    })
  );
  return usersDTO;
};

export const findUser = async (id: UUID): Promise<UserDTO> => {
  const userFound: UserEntity | null = await UserDAO.findOneBy({
    dni: id,
  });

  if (!userFound) {
    throw new ResourceNotFoundError("User not found");
  } else {
    const userDTO: UserDTO = convertUserToDTO(userFound);

    return userDTO;
  }
};

export const addUser = async ({
  email,
  id_credential,
  lastName,
  firstName,
  role,
  dni,
}: UserDTO): Promise<UserDTO> => {
  const userFromEntity = new UserEntity();

  userFromEntity.email = email;
  userFromEntity.id_credential = id_credential as string;
  userFromEntity.lastName = lastName;
  userFromEntity.firstName = firstName;
  userFromEntity.role = role;
  userFromEntity.dni = dni as string;

  const userDB: UserEntity = await UserDAO.save(userFromEntity);

  const userDTO: UserDTO = convertUserToDTO(userDB);
  return userDTO;
};

export const refreshUser = async (
  id: string,
  userToUpdate: UserDTO
): Promise<UserDTO> => {
  const userDB = await UserDAO.findOneBy({ dni: id });
  if (!userDB) {
    throw new ResourceNotFoundError(`Not found User with id: ${id}`);
  }
  userToUpdate.dni = id;

  await UserDAO.update(
    {
      dni: id,
    },
    { ...userToUpdate }
  );

  const userUpdated = await findUser(id as UUID);

  const userDTO: UserDTO = convertUserToDTO(userUpdated as UserEntity);
  return userDTO;
};

export const removeUser = async (id: UUID): Promise<void> => {
  const userDB = await UserDAO.findOneBy({ dni: id });
  if (!userDB) {
    throw new ResourceNotFoundError(`User not found with id: ${id}`);
  }
  await UserDAO.delete({ dni: id });
};

export const validLogin = async (
  dataLogin: TdataLogin
): Promise<string | void> => {
  const userFound = await AppDataSource.manager.findOneBy(UserEntity, {
    email: dataLogin.username,
  });
  if (!userFound) {
    throw new ResourceNotFoundError("User not found");
  }

  if (
    await validateCredential(
      userFound.id_credential as UUID,
      dataLogin.password
    )
  ) {
    return userFound.id_credential;
  }
};

export const generateToken = async (email: string): Promise<object> => {
  const user = await UserDAO.findOneBy({ email });

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id_credential, ...userToSend } = user;
  const userForToken = {
    ...userToSend,
  };
  const token = jwt.sign(userForToken, SECRET as string, {
    expiresIn: 60 * 60 * 2,
  });
  return { token };
};

const convertUserToDTO = ({
  email,
  firstName,
  lastName,
  role,
  dni,
}: UserEntity): UserDTO => {
  const userDTO: UserDTO = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: role,
    dni: dni,
  };
  return userDTO;
};

export const isValidCredentials = async (
  email: string,
  password: string
): Promise<boolean> => {
  const userFound = await UserDAO.findOneBy({
    email,
  });
  if (!userFound) {
    throw new ResourceNotFoundError("User not found");
  }
  const isValidCredential = await validateCredential(
    userFound.id_credential as UUID,
    password
  );
  if (userFound && isValidCredential) {
    return true;
  }
  return false;
};
