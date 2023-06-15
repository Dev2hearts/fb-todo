import React, { useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router-dom";
// firebase 연동
import firebase from "../firebase";

const SignUp = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const handleSignUp = async e => {
        e.preventDefault();
        try {
            let createUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pw);

            await createUser.user.updateProfile({
                name: nickName,
            });
            console.log("등록된 정보 : ", createUser.user);
        } catch (err) {
            console.log(err);
        }
        // firebase 에 회원가입 하기
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
                        minLength={8}
                        maxLength={16}
                        required
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                    />
                    <label
                        type="password"
                        minLength={8}
                        maxLength={16}
                        htmlFor=""
                        required
                        value={pwConfirm}
                        onChange={e => setPwConfirm(e.target.value)}
                    >
                        Password 확인
                    </label>
                    <input type="password" />
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
