import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BookingCustomerDetailsProps, BookingProcedureProps} from "../../../assets/interfaces/interfaces";
import { BookingInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: BookingInterface = {
    name:'',
    surname: '',
    telephoneNumber: '',
    email:'',
    date:'',
    time:'',
    procedureName:'',
    duration: 0,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers:{
        setProcedureDetails: (state, action:PayloadAction<BookingProcedureProps>):void => {
            state.procedureName = action.payload.procedureName;
            if(action.payload.duration)
            state.duration = action.payload.duration;
        },
        setDate: (state, action: PayloadAction<string>):void => {
            state.date = action.payload;
        },
        setTime: (state, action: PayloadAction<string>):void => {
            state.time = action.payload;
        },
        setBooking: (state, action: PayloadAction<BookingCustomerDetailsProps>):void => {
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.telephoneNumber = action.payload.telephoneNumber;
            state.email = action.payload.email;
        },
        clearBooking: ():BookingInterface => ({...initialState}),
    }
});
export const {setTime, setBooking, setDate, setProcedureDetails, clearBooking} = bookingSlice.actions;

export default bookingSlice.reducer;
