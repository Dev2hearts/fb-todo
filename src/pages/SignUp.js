import React, { useEffect, useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useFirebase";

const SignUp = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");

    // custom Hooks 을 활용
    const { signUp } = useSignup();

    const handleSignUp = e => {
        e.preventDefault();
        // 로그인을 시도한다.
        if (pw === pwConfirm) {
            try {
                signUp(email, pw, nickName);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("비밀번호를 확인해 주세요.");
        }
    };
    return (
        <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
            <h2>SignUp</h2>
            {/* 
      1. emotion 을 활용하여 tag 의 용도를 구분한다. 
      2. css 도 함께 적용한다
      */}
            <SignUpDiv>
                <form>
                    <label htmlFor="">NickName</label>
                    <input
                        minLength={2}
                        maxLength={10}
                        type="text"
                        required
                        value={nickName}
                        onChange={e => setNickName(e.target.value)}
                    />
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        minLength={6}
                        maxLength={16}
                        required
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                    />
                    <label htmlFor="">Password 확인</label>
                    <input
                        type="password"
                        minLength={6}
                        maxLength={16}
                        required
                        value={pwConfirm}
                        onChange={e => setPwConfirm(e.target.value)}
                    />
                    <div className="flex justify-center gap-5 w-full">
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={e => {
                                handleSignUp(e);
                            }}
                        >
                            SignUp
                        </button>
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={e => {
                                e.preventDefault();
                                navigate("/login");
                            }}
                        >
                            Cancle
                        </button>
                    </div>
                </form>
            </SignUpDiv>
        </div>
    );
};

export default SignUp;
