import { createContext, useReducer } from "react";

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
        default:
            // 그대로 돌려준다.
            return state;
    }
};
// Context 를 구독(Subscirbe) 하도록 Provider 를 생성
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        error: null,
    });
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
