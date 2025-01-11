import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { timeFrom: [0], timeTo: [0] };

const setForAllDaysModalSlice = createSlice({
  name: 'setTimeForAllDaysModal',
  initialState,
  reducers: {
    addAllDaysNewInterval(state) {
      state.timeFrom.push(0);
      state.timeTo.push(0);
    },
    deleteAllDaysNewInterval(state, action: PayloadAction<number>) {
      state.timeFrom = state.timeFrom.filter((_, index) => index !== action.payload);
      state.timeTo = state.timeTo.filter((_, index) => index !== action.payload);
    },
    setForAllHoursFrom(state, action: PayloadAction<{ hour: string; intervalIndex: number }>) {
      state.timeFrom = state.timeFrom.with(
        action.payload.intervalIndex,
        +action.payload.hour + (state.timeFrom[action.payload.intervalIndex] % 1)
      );
    },
    setForAllHoursTo(state, action: PayloadAction<{ hour: string; intervalIndex: number }>) {
      state.timeTo = state.timeTo.with(
        action.payload.intervalIndex,
        +action.payload.hour + (state.timeTo[action.payload.intervalIndex] % 1)
      );
    },
    setForAllMinutesFrom(state, action: PayloadAction<{ minute: string; intervalIndex: number }>) {
      state.timeFrom = state.timeFrom.with(
        action.payload.intervalIndex,
        Math.floor(state.timeFrom[action.payload.intervalIndex]) + +action.payload.minute / 60
      );
    },
    setForAllMinutesTo(state, action: PayloadAction<{ minute: string; intervalIndex: number }>) {
      state.timeTo = state.timeTo.with(
        action.payload.intervalIndex,
        Math.floor(state.timeTo[action.payload.intervalIndex]) + +action.payload.minute / 60
      );
    },
  },
});

export const {
  addAllDaysNewInterval,
  deleteAllDaysNewInterval,
  setForAllHoursFrom,
  setForAllHoursTo,
  setForAllMinutesFrom,
  setForAllMinutesTo,
} = setForAllDaysModalSlice.actions;

export default setForAllDaysModalSlice.reducer;
