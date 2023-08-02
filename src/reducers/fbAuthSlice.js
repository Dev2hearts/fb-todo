// import { signInWithEmailAndPassword } from "firebase/auth";
// import { appAuth } from "../firebase/config";

import { asyncLoginFetch, asyncLogoutFetch } from "./actions";

const { createSlice } = require("@reduxjs/toolkit");

// 추후에 actions.js 파일로 작성 권장.
// thunk 액션 크리에이터는 많아질 소지가 있다.
// dispatch( asyncLoginFeth() )
// login action
// const asyncLoginFetch = createAsyncThunk(
//     "fbAuthSlice/asyncLoginFetch", // action type
//     async ({ email, password }) => {
//         // action payload
//         try {
//             const userCredential = await signInWithEmailAndPassword(
//                 appAuth,
//                 email,
//                 password,
//             );
//             const user = userCredential.user;
//             // return 을 실행해야 payload 에 담긴다.
//             return {
//                 email: user.email,
//                 displayName: user.displayName,
//                 uid: user.uid,
//             };
//             // dispatch(
//             //     loginFB({
//             //         displayName: user.displayName,
//             //         email: user.email,
//             //         uid: user.uid,
//             //     }),
//             // );
//             // navigate("/");
//         } catch (err) {
//             console.log(err.message);
//             let errMessage = "";
//             if (err.code === "auth/invalid-email") {
//                 errMessage = "올바른 이메일 형식이 아닙니다.";
//             } else if (err.code === "auth/wrong-password") {
//                 errMessage = "올바르지 않은 비밀번호입니다.";
//             } else if (err.code === "auth/user-not-found") {
//                 errMessage = "가입되지 않은 사용자 입니다.";
//             } else if (err.code === "auth/missing-email") {
//                 errMessage = "이메일이 입력되지 않았습니다.";
//             } else {
//                 errMessage = "로그인이 실패하였습니다.";
//             }
//             // dispatch(isErrorFB(errMessage));
//             return { errMessage };
//         }
//     },
// );

// slice 초기 값 (변수명 = 관례상 initialState)
const initialState = {
    uid: null,
    displayName: null,
    email: null,
    isAuthReady: false,
    errMessage: "",
    isLoading: false,
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
    // 비동기 업데이트 체크(미들웨어) 코드
    // axios 또는 fetch 를 이용
    // 비동기 action(thunk)에 따른 action 처리
    // Pending(호출중), fulfilled(결과리턴), rejected(호출 실패)
    extraReducers: builder => {
        builder.addCase(asyncLoginFetch.pending, (state, action) => {
            console.log("로그인 연결 시도 중");
            state.isLoading = true;
        });
        builder.addCase(asyncLoginFetch.fulfilled, (state, action) => {
            console.log("결과를 돌려받음", action);
            state.uid = action.payload.uid && action.payload.uid;
            state.displayName = action.payload.displayName
                ? action.payload.displayName
                : null;
            state.email = action.payload.email ? action.payload.email : null;
            state.errMessage = action.payload.errMessage ? action.payload.errMessage : "";
            state.isLoading = false;
        });
        builder.addCase(asyncLoginFetch.rejected, (state, action) => {
            console.log("네트워크 에러");
            state.isLoading = false;
            state.errMessage = "네트워크 연결 오류";
        });
        // logout 케이스
        builder.addCase(asyncLogoutFetch.fulfilled, (state, action) => {
            console.log("로그아웃 결과를 돌려받음", action);
            state.uid = action.payload;
            state.displayName = action.payload;
            state.email = action.payload.payload;
            state.errMessage = action.payload.errMessage ? action.payload.errMessage : "";
        });
    },
});

// export default fbAuthSlice.reducer 로 export 가능
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

// 비동기 액션크리에이터 (dispatch 로 호출)
// export { asyncLoginFetch };
