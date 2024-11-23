import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BookingCustomerDetailsProps, BookingProcedureProps} from "../../../assets/interfaces/interfaces";

const initialState = {
    name:'',
    surname: '',
    telephoneNumber: '',
    email:'',
    date:'',
    time:'',
    procedureName:'',
    duration: undefined
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers:{
        setProcedureDetails: (state, action:PayloadAction<BookingProcedureProps>) => {
            state.procedureName = action.payload.procedureName;
            if(action.payload.duration)
            state.duration = action.payload.duration;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        setBooking: (state, action: PayloadAction<BookingCustomerDetailsProps>) => {
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.telephoneNumber = action.payload.telephoneNumber;
            state.email = action.payload.email;
        }
    }
});
export const {setTime, setBooking, setDate, setProcedureDetails} = bookingSlice.actions;

export default bookingSlice.reducer;
