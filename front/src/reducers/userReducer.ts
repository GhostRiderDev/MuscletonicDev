import ICredential from "@/interfaces/ICredential";
import ITokenUser from "@/interfaces/ITokenUser";
import { login } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const setLogedUser = createAsyncThunk(
  "user/setLogedUser",
  async (credential: ICredential, { dispatch, rejectWithValue }) => {
    try {
      const result = await login(credential);
      const { token } = result?.data;
      const decodedToken = jwtDecode(token);
      window.localStorage.setItem("token", token);
      const { firstName, dni, lastName, role }: ITokenUser =
        decodedToken as ITokenUser;
      dispatch(
        setUser({
          firstName,
          lastName,
          dni,
          role,
        })
      );
      return {
        firstName,
        lastName,
        dni,
        role,
      };
    } catch (err: AxiosError | any) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          return rejectWithValue("Network error");
        }
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
