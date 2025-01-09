import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RatingReducerInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: RatingReducerInterface = {
    rating: 0,
};

const ratingSlice = createSlice({
    name: 'reviewingRating',
    initialState,
    reducers:{
        setReviewingRating: (state, action: PayloadAction<number>) => {
            state.rating = action.payload;
        }
    }
});
export const {setReviewingRating} = ratingSlice.actions;

export default ratingSlice.reducer;
