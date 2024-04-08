import ICredential from "@/interfaces/ICredential";
import { IUserRegister } from "@/interfaces/IUserRegister";
import axios from "axios";

export const BASE_URL = "http://localhost:8888/auth";

export const login = async (credentials: ICredential) => {
  try {
    const result = await axios.post(`${BASE_URL}/login`, credentials);
    return result;
  } catch (err) {
    throw err;
  }
};

export const register = async (user: IUserRegister) => {
  const result = await axios.post(`${BASE_URL}/register`, user);
  return result;
};

export const validateToken = async (token: string) => {
  const config = { headers: { authorization: `Bearer ${token}` } };
  const result = await axios.post(`${BASE_URL}/valid/token`, {}, config);
  return result;
}
