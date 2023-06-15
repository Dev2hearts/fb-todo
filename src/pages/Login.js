import { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
const Login = () => {
    // Link, NavLink, useNavigate = 페이지 이동
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 로그인 기능
    const handleLogin = e => {
        console.log(e.target);
        // FireBase 로그인 시도
    };
    return (
        <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
            <h2>Login</h2>
            {/* 
  1. emotion 을 활용하여 tag 의 용도를 구분한다. 
  2. css 도 함께 적용한다
  */}
            <LoginDiv>
                <form>
                    <label htmlFor="">email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label htmlFor="">password</label>
                    <input
                        type="password"
                        minLength={8}
                        maxLength={16}
                        required
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <div className="flex justify-center gap-5 w-full">
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={e => handleLogin(e)}
                        >
                            Login
                        </button>
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={e => {
                                e.preventDefault();
                                navigate("/signup");
                            }}
                        >
                            SignUp
                        </button>
                        <button
                            className="text-blue-500"
                            onClick={e => {
                                e.preventDefault();
                                console.log("password 찾기");
                                // navigate("/password")
                            }}
                        >
                            Forgot Password
                        </button>
                    </div>
                </form>
            </LoginDiv>
        </div>
    );
};
export default Login;
