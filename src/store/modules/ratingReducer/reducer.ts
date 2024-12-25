import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RatingReducerInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: RatingReducerInterface = {
    rating: 0,
};

const ratingSlice = createSlice({
    name: 'review',
    initialState,
    reducers:{
        setRating: (state, action: PayloadAction<number>) => {
            state.rating = action.payload;
        }
    }
});
export const {setRating} = ratingSlice.actions;

export default ratingSlice.reducer;
