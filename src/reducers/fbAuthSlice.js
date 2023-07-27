const { createSlice } = require("@reduxjs/toolkit");

// slice 초기 값
const initialState = {
    uid: null,
    displayName: null,
    email: null,
    isAuthReady: false,
    errMessage: "",
};

const fbAuthSlice = createSlice({
    name: "fbAuthSlice",
    initialState,
    // 액션 크리에이터 함수 모음
    // 상태를 즉시 업데이트 (동기 코드)
    reducers: {
        loginFB: (state, action) => {
            // state.user = action.payload;
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
        },
        logoutFB: state => {
            // state.user = null;
            state.displayName = null;
            state.uid = null;
            state.email = null;
        },
        updateNameFB: (state, action) => {
            state.displayName = action.payload.displayName;
        },
        updateEmailFB: (state, action) => {
            state.email = action.payload.email;
        },
        deleteUserFB: state => {
            // state.user = null;
            state.displayName = null;
            state.uid = null;
            state.email = null;
        },
        isAuthReadyFB: (state, action) => {
            // state.user = action.payload;
            state.displayName = action.payload && action.payload.displayName;
            state.uid = action.payload && action.payload.uid;
            state.email = action.payload && action.payload.email;
            state.isAuthReady = true;
        },
        isErrorFB: (state, action) => {
            state.errMessage = action.payload;
        },
    },
});

export default fbAuthSlice;
// dispatch 활용 (action 함수 들)
export const {
    loginFB,
    logoutFB,
    isErrorFB,
    deleteUserFB,
    updateNameFB,
    isAuthReadyFB,
    updateEmailFB,
} = fbAuthSlice.actions;
