import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteUser,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    FB_DELETE_USER,
    FB_IS_ERROR,
    FB_LOGIN,
    FB_LOGOUT,
    FB_UPDATE_EMAIL,
    FB_UPDATE_NAME,
} from "../modules/fbReducer";

// AuthContext Hook
// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     return context;
// };

// 사용자 로그인 훅
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    // const { dispatch } = useAuthContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (email, password) => {
        setError(null);
        setIsPending(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                appAuth,
                email,
                password,
            );
            const user = userCredential.user;
            dispatch({ type: FB_LOGIN, payload: user });
            navigate("/");
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
            dispatch({ type: FB_IS_ERROR, payload: errMessage });
        }
    };
    return { error, isPending, login };
};

// 로그아웃 훅
export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    // const { dispatch } = useAuthContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async () => {
        setError(null);
        setIsPending(true);
        // FB 로그아웃 API
        try {
            await signOut(appAuth);
            dispatch({ type: FB_LOGOUT });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    return { error, isPending, logout };
};

// 회원가입 훅
export const useSignup = () => {
    // authContext 데이터 전달
    // const { dispatch } = useAuthContext();
    const dispatch = useDispatch();
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
            dispatch({ type: FB_LOGIN, payload: user });
            setError(null);
            // 연결 후 작업 완료
            setIsPending(false);
            navigate("/login");
        } catch (err) {
            console.log(err);
            let errMessage = "";
            if (err.code == "auth/email-already-in-use") {
                errMessage = "The email address is already in use";
            } else if (err.code == "auth/invalid-email") {
                errMessage = "The email address is not valid.";
            } else if (err.code == "auth/operation-not-allowed") {
                errMessage = "Operation not allowed.";
            } else if (err.code == "auth/weak-password") {
                errMessage = "The password is too weak.";
            }
            dispatch({ type: FB_IS_ERROR, payload: errMessage });
        }
    };

    // 현재 err , isPending, signUp 을 리턴 한다.
    return { error, isPending, signUp };
};

// 이메일 변경 훅
export const useUpdateEmail = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    // const { dispatch } = useAuthContext();
    const dispatch = useDispatch();
    const updateEM = async email => {
        setError(null);
        setIspending(true);
        try {
            await updateEmail(appAuth.currentUser, email);
            dispatch({ type: FB_UPDATE_EMAIL, payload: appAuth.currentUser });
            setIspending(false);
        } catch (err) {
            setIspending(false);
            setError(err.message);
            console.log(err.message);
        }
    };
    return { error, isPending, updateEM };
};

// 닉네임 변경 훅
export const useUpdateNickName = () => {
    // const { dispatch } = useAuthContext();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const updateNickName = async displayName => {
        setError(null);
        setIspending(true);
        try {
            await updateProfile(appAuth.currentUser, {
                displayName: displayName,
            });
            setIspending(false);
            dispatch({ type: FB_UPDATE_NAME, payload: appAuth.currentUser });
        } catch (err) {
            setIspending(false);
            setError(err.message);
            console.log(err.message);
        }
    };
    return { error, isPending, updateNickName };
};

// 비밀번호 변경 훅
export const useUpdatePassword = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const updatePW = async pw => {
        setError(null);
        setIspending(true);
        try {
            await updatePassword(appAuth.currentUser, pw);
            console.log("비밀번호 업데이트 완료");
            setIspending(false);
        } catch (err) {
            setIspending(false);
            setError(err.message);
            console.log(err.message);
        }
    };
    return { error, isPending, updatePW };
};

// 회워탈퇴 훅
export const useDeleteUser = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteID = async () => {
        setError(null);
        setIspending(true);
        try {
            await deleteUser(appAuth.currentUser);
            setIspending(false);
            dispatch({ type: FB_DELETE_USER });
            navigate("/");
        } catch (err) {
            setIspending(false);
            setError(err);
            console.log(err);
        }
    };
    return { error, isPending, deleteID };
};
