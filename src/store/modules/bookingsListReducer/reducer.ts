import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingsReducerInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: BookingsReducerInterface = {
  pickedDate: '',
};

const bookingsListSlice = createSlice({
  name: "bookingsList",
  initialState,
  reducers: {
    setPickedDate: (state, action: PayloadAction<string>):void => {
      state.pickedDate = action.payload;
    }
  }
});
export const {setPickedDate} = bookingsListSlice.actions;

export default bookingsListSlice.reducer;
