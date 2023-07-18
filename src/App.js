import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
    // 추후에 Reudx&Recoil state 로 관리 필요
    const [fbName, setFBName] = useState("");
    const [fbEmail, setFBEmail] = useState("");
    const [fbUid, setFBUid] = useState("");
    const { isAuthReady, user } = useAuthContext();
    return (
        <>
            {" "}
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
                            <Route path="/todo" element={user ? <Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid}/> : <Navigate to="/login"/>}></Route>
                            <Route
                                path="/mypage"
                                element={
                                    user ? 
                                    <Mypage
                                        fbName={fbName}
                                        fbEmail={fbEmail}
                                        fbUid={fbUid}
                                        setFBName={setFBName}
                                        setFBEmail={setFBEmail}
                                        setFBUid={setFBUid}
                                    />
                                    : <Navigate to="/login"/>
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
