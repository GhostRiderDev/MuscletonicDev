export default interface IUser {
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
