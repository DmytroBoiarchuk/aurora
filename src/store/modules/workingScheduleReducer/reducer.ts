import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduleInterface } from '../../../assets/interfaces/interfaces';
import { WorkingScheduleReducerInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: WorkingScheduleReducerInterface = {
  customWorkingDaysSchedule: Array(7).fill(false),
  chosenDays: [
    { day: '2025-01-11', timeFrom: [14], timeTo: [22] },
    { day: '2025-01-28', timeFrom: [14, 15.5, 18, 20], timeTo: [15, 17, 19, 22] },
    { day: '2025-01-29', timeFrom: [9], timeTo: [23.5] },
  ],
};

const workingScheduleSlice = createSlice({
  name: 'workingSchedule',
  initialState,
  reducers: {
    setCustomWorkingDaysSchedule: (state, action: PayloadAction<{ i: number; value: boolean }>) => {
      const newState = { ...state };
      newState.customWorkingDaysSchedule = state.customWorkingDaysSchedule.map((value, index) =>
        index === action.payload.i ? action.payload.value : value
      );
      return newState;
    },
    setWorkingDays: (state, action: PayloadAction<ScheduleInterface[]>) => {
      state.chosenDays = action.payload;
    },
    deleteInterval(state, action: PayloadAction<{ day: string; intervalIndex: number }>) {
      state.chosenDays = state.chosenDays.map((day) =>
        day.day === action.payload.day
          ? {
              day: day.day,
              timeFrom: day.timeFrom.filter((_, i) => i !== action.payload.intervalIndex),
              timeTo: day.timeTo.filter((_, i) => i !== action.payload.intervalIndex),
            }
          : day
      );
    },
    addInterval(state, action: PayloadAction<{ day: string }>) {
      const theDay = state.chosenDays.find((day) => day.day === action.payload.day);
      theDay?.timeFrom.push(0);
      theDay?.timeTo.push(0);
    },
    setHoursFrom(state, action: PayloadAction<{ day: string; hour: string; intervalIndex: number }>) {
      state.chosenDays = state.chosenDays.map((day) =>
        day.day === action.payload.day
          ? {
              day: day.day,
              timeFrom: day.timeFrom.with(
                action.payload.intervalIndex,
                +action.payload.hour + (day.timeFrom[action.payload.intervalIndex] % 1)
              ),
              timeTo: day.timeTo,
            }
          : day
      );
    },
    setMinutesFrom(state, action: PayloadAction<{ day: string; minutes: string; intervalIndex: number }>) {
      state.chosenDays = state.chosenDays.map((day) =>
        day.day === action.payload.day
          ? {
              day: day.day,
              timeFrom: day.timeFrom.with(
                action.payload.intervalIndex,
                Math.floor(day.timeFrom[action.payload.intervalIndex]) + +action.payload.minutes / 60
              ),
              timeTo: day.timeTo,
            }
          : day
      );
    },
    setHoursTo(state, action: PayloadAction<{ day: string; hour: string; intervalIndex: number }>) {
      state.chosenDays = state.chosenDays.map((day) =>
        day.day === action.payload.day
          ? {
            day: day.day,
            timeFrom: day.timeFrom,
            timeTo: day.timeTo.with(
              action.payload.intervalIndex,
              +action.payload.hour + (day.timeTo[action.payload.intervalIndex] % 1)
            ),
          }
          : day
      );
    },
    setMinutesTo(state, action: PayloadAction<{ day: string; minutes: string; intervalIndex: number }>) {
      state.chosenDays = state.chosenDays.map((day) =>
        day.day === action.payload.day
          ? {
            day: day.day,
            timeFrom: day.timeFrom,
            timeTo: day.timeTo.with(
              action.payload.intervalIndex,
              Math.floor(day.timeTo[action.payload.intervalIndex]) + +action.payload.minutes / 60
            ),
          }
          : day
      );
    },
  },
});
export const {
  setWorkingDays,
  setCustomWorkingDaysSchedule,
  deleteInterval,
  addInterval,
  setHoursFrom,
  setMinutesFrom,
  setHoursTo,
  setMinutesTo,
} = workingScheduleSlice.actions;

export default workingScheduleSlice.reducer;
