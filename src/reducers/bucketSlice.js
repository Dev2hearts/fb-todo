import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goods: [],
};

const bucketSlice = createSlice({
    name: "bucketSlice",
    initialState,
    reducers: {
        addBucket: (state, action) => {
            state.goods.push(action.paylaod);
        },
        removeBucket: (state, action) => {
            state.goods.filter(item => item.id === action.payload.id);
            {
            }
        },
    },
});
export default bucketSlice;
export const { addBucket, removeBucket } = bucketSlice.actions;
