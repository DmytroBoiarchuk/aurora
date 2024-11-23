import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
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
