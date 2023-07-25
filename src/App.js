import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import Mypage from "./pages/Mypage";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";
import TodoChart from "./pages/TodoChart";
// import { useAuthContext } from "./hooks/useFirebase";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase/config";
import { FB_IS_AUTH_READY, FB_IS_ERROR } from "./modules/fbReducer";

const App = () => {
    // 1. store에 저장된 state를 읽어온다.
    const { isAuthReady, user, errMessage } = useSelector(state => state);
    // 2. store 에 저장된 state를 업데이트 (action 만들어서 전달)
    const dispatch = useDispatch();

    // FB 인증 웹브라우저 새로 고침 처리
    useEffect(() => {
        onAuthStateChanged(appAuth, user => {
            dispatch({ type: FB_IS_AUTH_READY, payload: user });
        });
    }, []);
    // 추후에 Reudx&Recoil state 로 관리 필요
    // const { isAuthReady, user, errMessage, dispatch } = useAuthContext();
    const error = msg => {
        Modal.error({
            title: "FireBase Error Modal",
            content: msg,
            onOk: handleOk,
            okButtonProps: { style: { background: "red" } },
        });
    };
    const handleOk = () => {
        dispatch({ type: FB_IS_ERROR, payload: "" });
    };
    useEffect(() => {
        if (errMessage !== "") {
            error(errMessage);
        }
    }, [errMessage]);

    return (
        <>
            {isAuthReady ? (
                <div className="w-screen h-screen bg-blue-300">
                    <Header />
                    <div className="container h-full m-auto">
                        <Routes>
                            {/* Navigate 를 이용한 강제 이동 */}
                            <Route
                                path="/"
                                element={<Navigate to="/home" />}
                            ></Route>
                            <Route path="/home" element={<Home />}></Route>
                            <Route path="/about" element={<About />}></Route>
                            <Route
                                path="/login"
                                element={
                                    user ? <Navigate to="/home" /> : <Login />
                                }
                            ></Route>
                            <Route path="/signup" element={<SignUp />}></Route>
                            <Route
                                path="/todo"
                                element={
                                    user ? <Todo /> : <Navigate to="/login" />
                                }
                            ></Route>
                            <Route
                                path="/mypage"
                                element={
                                    user ? <Mypage /> : <Navigate to="/login" />
                                }
                            ></Route>
                            <Route
                                path="/schedule"
                                element={<Schedule />}
                            ></Route>
                            <Route
                                path="/chart"
                                element={<TodoChart />}
                            ></Route>
                            <Route path="/upload" element={<Upload />}></Route>
                            <Route path="*" element={<NotFound />}></Route>
                        </Routes>
                    </div>
                </div>
            ) : (
                "Loading..."
            )}
        </>
    );
};
export default App;
