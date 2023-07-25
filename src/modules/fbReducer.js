import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const FB_LOGIN = "fb/login"
const FB_LOGOUT = "fb/logout"
const FB_UPDATE_NAME = "fb/updateName"
const FB_UPDATE_EMAIL = "fb/updateEmail"
const FB_DELETE_USER = "fb/delteUser"
const FB_IS_AUTH_READY = "fb/isAuthReady"
const FB_IS_ERROR = "fb/isError"

// 1. Redux Store 에서 관리할 초기 객체
const initialState = {
    user: null, // 사용자 정보
    isAuthReady: false, // 로그인 상태 체크
    errMessage: "", //에러 메세지
};
// 2. Reducer 함수 작성
// dispatch 에 의해 전달된 action을 이용하여 state 를 업데이트
const authReducer = (state, action) => {
    switch (action.type) {
        case FB_LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case FB_LOGOUT:
            return {
                ...state,
                user: null,
            };
        case FB_UPDATE_NAME:
            return {
                ...state,
                user: action.payload,
            };
        case FB_UPDATE_EMAIL:
            return {
                ...state,
                user: action.payload,
            };
        case FB_DELETE_USER:
            return {
                ...state,
                user:null
            }
        case FB_IS_AUTH_READY:
            return {
                ...state,
                user: action.payload,
                isAuthReady: true,
            };
        case FB_IS_ERROR:
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
// 저장소 = createStore(리듀서함수, state 초기값, 개발 도구)
const store = createStore(authReducer, initialState, composeWithDevTools());

export { store, FB_DELETE_USER,FB_IS_AUTH_READY,FB_IS_ERROR,FB_LOGIN,FB_LOGOUT,FB_UPDATE_EMAIL,FB_UPDATE_NAME };
