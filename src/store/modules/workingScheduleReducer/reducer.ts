import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ScheduleInterface } from '../../../assets/interfaces/interfaces';
import usersData from '../../../database/usersData';
import { WorkingScheduleReducerInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: WorkingScheduleReducerInterface = {
  customWorkingDaysSchedule: Array(7).fill(false),
  chosenDays: [...usersData.workingDates],
};

const workingScheduleSlice = createSlice({
  name: 'workingSchedule',
  initialState,
  reducers:{
    setCustomWorkingDaysSchedule: (state, action: PayloadAction<{i: number, value: boolean}>) => {
      const newState = {...state};
      newState.customWorkingDaysSchedule = state.customWorkingDaysSchedule.map((value, index) =>
        index === action.payload.i ? action.payload.value : value
      );
      return newState;
    },
    setWorkingDays: (state, action: PayloadAction<ScheduleInterface[]>) => {
      state.chosenDays = action.payload;
    }
  }
});
export const {setWorkingDays,setCustomWorkingDaysSchedule} = workingScheduleSlice.actions;

export default workingScheduleSlice.reducer;
