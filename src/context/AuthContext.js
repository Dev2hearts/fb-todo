import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
// FireBase 인증 Context 를 생성
const AuthContext = createContext();

// Context 관리 리듀서함수
const authReducer = (state, action) => {
    console.log("리듀서 함수: ", action);
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
            };
        case "error":
            return {
                ...state,
                error: action.payload,
            };
        case "logout":
            return {
                ...state,
                user: null,
            };
        case "updateName":
            return {
                ...state,
                user: action.payload,
            };
        case "updateEmail":
            return {
                ...state,
                user: action.payload,
            };
        case "isAuthReady":
            return {
                ...state,
                user: action.payload,
                isAuthReady: true,
            };
        default:
            // 그대로 돌려준다.
            return state;
    }
};
// Context 를 구독(Subscirbe) 하도록 Provider 를 생성
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null, // 사용자 정보
        error: null,
        isAuthReady: false, // 로그인 상태 체크
    });
    // FB 인증 웹브라우저 새로 고침 처리
    useEffect(() => {
        onAuthStateChanged(appAuth, user => {
            dispatch({ type: "isAuthReady", payload: user });
        });
    }, []);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
