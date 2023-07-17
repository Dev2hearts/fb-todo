import React, { useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router-dom";
// firebase 연동
// import firebase from "../firebase";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");

    // custom Hooks 을 활용
    const { signUp } = useSignup();

    const handleSignUp = async e => {
        e.preventDefault();
        // 로그인을 시도한다.
        try {
            signUp(email, pw, nickName);
        } catch (error) {
            console.log(error);
        }
        // try {
        //     let createUser = await firebase
        //         .auth()
        //         .createUserWithEmailAndPassword(email, pw);
        //     // 회원 가입이 성공시 사용자 이름을 업데이트
        //     await createUser.user.updateProfile({
        //         displayName: nickName,
        //     });
        //     // 로그인 창으로 이동
        //     navigate("/login");

        //     console.log("등록된 정보 : ", createUser.user);
        // } catch (error) {
        //     // 회원가입 시 에러 처리
        //     console.log(error.errCode);
        //     if (error.code == "auth/email-already-in-use") {
        //         alert("이미 가입된 이메일 입니다.");
        //     } else if (error.code == "auth/invalid-email") {
        //         alert("이메일 형식에 맞지 않습니다.");
        //     } else if (error.code == "auth/operation-not-allowed") {
        //         alert("Operation not allowed.");
        //     } else if (error.code == "auth/weak-password") {
        //         alert("비밀번호가 너무 짧습니다.");
        //     }
        // }
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
                        minLength={6}
                        maxLength={16}
                        required
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                    />
                    <label
                        type="password"
                        minLength={6}
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
