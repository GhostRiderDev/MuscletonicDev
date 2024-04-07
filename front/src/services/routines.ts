const BASE_URL = "http://localhost:8888/routines";
import axios, { AxiosResponse } from "axios";

export const getRoutinesByMuscle = async (
  id_muscle: number,
  token: string
): Promise<AxiosResponse> => {
  const reqData = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${BASE_URL}/part/${id_muscle}`, reqData);
  return response;
};

export const getRoutine = async (id_routine: string) => {
  const response = await axios.get(`${BASE_URL}/${id_routine}`);
  return response;
};
