export interface IUserRegister {
  user: {
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
  };
  credentials: string;
}
