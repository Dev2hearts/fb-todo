import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";

// 로그인 thunk 액션
export const asyncLoginFetch = createAsyncThunk(
    "fbAuthSlice/asyncLoginFetch", // action type
    async ({ email, password }) => {
        // action payload
        try {
            const userCredential = await signInWithEmailAndPassword(
                appAuth,
                email,
                password,
            );
            const user = userCredential.user;
            // return 을 실행해야 payload 에 담긴다.
            return {
                email: user.email,
                displayName: user.displayName,
                uid: user.uid,
            };
            // dispatch(
            //     loginFB({
            //         displayName: user.displayName,
            //         email: user.email,
            //         uid: user.uid,
            //     }),
            // );
            // navigate("/");
        } catch (err) {
            console.log(err.message);
            let errMessage = "";
            if (err.code === "auth/invalid-email") {
                errMessage = "올바른 이메일 형식이 아닙니다.";
            } else if (err.code === "auth/wrong-password") {
                errMessage = "올바르지 않은 비밀번호입니다.";
            } else if (err.code === "auth/user-not-found") {
                errMessage = "가입되지 않은 사용자 입니다.";
            } else if (err.code === "auth/missing-email") {
                errMessage = "이메일이 입력되지 않았습니다.";
            } else {
                errMessage = "로그인이 실패하였습니다.";
            }
            // dispatch(isErrorFB(errMessage));
            return { errMessage };
        }
    },
);
// 로그아웃 thunk dortus
export const asyncLogoutFetch = createAsyncThunk(
    "fbAuthSlice/asyncLogoutFetch",
    async () => {
        try {
            await signOut(appAuth);
            return null;
        } catch (err) {
            return { errMessage: "로그아웃 을 다시시도하세요" };
        }
    },
);
