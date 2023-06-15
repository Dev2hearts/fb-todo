import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

const App = () => {
    return (
        <div className="w-screen h-screen bg-blue-300">
            <Header />
            <div className="container h-full m-auto">
                <Routes>
                    {/* Navigate 를 이용한 강제 이동 */}
                    <Route path="/" element={<Navigate to="/home"/>}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/todo" element={<Todo />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </div>
    );
};
export default App;
