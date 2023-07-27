import { configureStore } from "@reduxjs/toolkit";
import fbAuthSlice from "../reducers/fbAuthSlice";

// reducer 들을 모아줌.
export const store = configureStore({
    reducer: {
        fbAuth: fbAuthSlice.reducer
    }
});
