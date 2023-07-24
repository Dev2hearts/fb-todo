import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

// 1. Redux Store 에서 관리할 초기 객체
const initialState = {
    user: null, // 사용자 정보
    isAuthReadyt: false, // 로그인 상태 체크
    errMessage: "", //에러 메세지
};
// 2. Reducer 함수 작성
// dispatch 에 의해 전달된 action을 이용하여 state 를 업데이트
const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
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
        case "isError":
            return {
                ...state,
                errMessage: action.payload,
            };
        default:
            // 그대로 돌려준다.
            return state;
    }
};
// 3. store 생성
// 저장소 = createStore(리듀서함수, state 초기값)
const store = createStore(authReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // Provider 는 store의 state 에 접근 가능 한 영역을 지정
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
