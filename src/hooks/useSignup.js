// 사용자 로그인, 로그아웃, 회원가입 처리 상태를 위한 Custom Hook

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    // authContext 데이터 전달
    const { dispatch } = useAuthContext();

    // 사용자의 상태의 따라 웹브라우저 라우터 이동
    const navigate = useNavigate();
    // 서버의 에러 상태를 보관
    const [error, setError] = useState(null);
    // 서버의 연결 시도 및 연결,연결 후 상태를 보관
    const [isPending, setIsPending] = useState(false);
    // 실제 연결을 실행 할 함수
    // signUp(이메일,비밀번호,닉네임)을 전달 받는다.
    const signUp = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                appAuth,
                email,
                password,
            );
            const user = userCredential.user;
            console.log(user);
            if (!user) {
                console.log("회원가입에 실패했습니다.");
                return;
            }
            // 성공시에는 사용자 닉네임을 설정한다.
            await updateProfile(appAuth.currentUser, {
                displayName: displayName,
                // photoURL: "https://example.com/jane-q-user/profile.jpg",
            });
            // 프로필 업데이트 성공
            // AuthContext 업데이트
            // dispatch(action)
            dispatch({ type: "login", payload: user });
            setError(null);
            // 연결 후 작업 완료
            setIsPending(false);
            navigate("/login");
        } catch (err) {
            console.log("에러", err);
            dispatch({ type: "error", payload: err.message });
        }
    };

    // 현재 err , isPending, signUp 을 리턴 한다.
    return { error, isPending, signUp };
};
