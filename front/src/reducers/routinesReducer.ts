import { getRoutinesByMuscle } from "@/services/routines";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const routinesSlice = createSlice({
  name: "routinesMuscle",
  initialState: [],
  reducers: {
    setRoutinesMuscle(_state, action) {
      return action.payload;
    },
  },
});

export const setRoutines = createAsyncThunk(
  "routines/muscle",
  async (id_muscle: number, { dispatch, rejectWithValue }) => {
    try {
      const tokenStorage = window.localStorage.getItem("token");
      if (!tokenStorage) {
        return null;
      }
      const result = await getRoutinesByMuscle(id_muscle, tokenStorage);
      dispatch(setRoutinesMuscle(result.data.routines));
    } catch (err) {
      console.log(err);
    }
  }
);

export const { setRoutinesMuscle } = routinesSlice.actions;
export default routinesSlice.reducer;
