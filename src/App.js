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

const App = () => {
    // 추후에 Reudx&Recoil state 로 관리 필요
    const [fbName, setFBName] = useState("");
    const [fbEmail, setFBEmail] = useState("");
    const [fbUid, setFBUid] = useState("");

    return (
        <div className="w-screen h-screen bg-blue-300">
            <Header
                fbName={fbName}
                fbEmail={fbEmail}
                fbUid={fbUid}
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
            />
            <div className="container h-full m-auto">
                <Routes>
                    {/* Navigate 를 이용한 강제 이동 */}
                    <Route path="/" element={<Navigate to="/home" />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route
                        path="/login"
                        element={
                            <Login
                                setFBName={setFBName}
                                setFBUid={setFBUid}
                                setFBEmail={setFBEmail}
                            />
                        }
                    ></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route
                        path="/todo"
                        element={
                            <Todo
                                fbName={fbName}
                                fbUid={fbUid}
                                fbEmial={fbEmail}
                            />
                        }
                    ></Route>
                    <Route
                        path="/mypage"
                        element={
                            <Mypage
                                fbName={fbName}
                                fbEmail={fbEmail}
                                fbUid={fbUid}
                                setFBName={setFBName}
                                setFBEmail={setFBEmail}
                                setFBUid={setFBUid}
                            />
                        }
                    ></Route>
                    <Route path="/schedule" element={<Schedule />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </div>
    );
};
export default App;
