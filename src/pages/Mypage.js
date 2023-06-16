import React, { useEffect, useState } from "react";
import { MyPageDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase.js";
// firebase 연동

const Mypage = ({ fbName, fbEmail, fbUid, setFBName, setFBEmail,setFBUid }) => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState(fbName);
    const [email, setEmail] = useState(fbEmail);
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");

    // FireBase의 사용자 정보 객체
    const user = firebase.auth().currentUser;

    const handlerNickName = async e => {
        e.preventDefault();
        await user.updateProfile({ displayName: nickName });
        setNickName(nickName);
        setFBName(nickName);
        alert("NicName 정보를 변경하였습니다.");
    };
    const handlerEmail = async e => {
        e.preventDefault();
        try {
            await user.updateEmail(email);
            setEmail(email);
            setFBEmail(email);
            alert("NicEmail 정보를 변경하였습니다.");
        } catch (error) {
            if (error.code == "auth/email-already-in-use") {
                alert("이미 존재하는 email 입니다.");
            } else if (error.code == "auth/invalid-email") {
                alert("email 형식이 맞지 않습니다.");
            } else {
                alert("이메일을 확인해 주세요.");
            }
        }
    };
    const handlerPassword = async e => {
        e.preventDefault();
        try {
            await user.updatePassword(pw);
            setPw(pw)
            alert("NicName 정보를 변경하였습니다.");
        } catch (error) {
            if (error.code === "auto/weak-password") {
                alert("비밀번호가 너무 짧습니다.");
            } else {
                alert("비밀번호를 다시 입력해 주세요.");
            }
        }
    };
    const handlerDelete = async e => {
        e.preventDefault();
        try {
            await user.delete();
            alert("탈퇴를 완료 하였습니다.");
            setFBEmail("");
            setFBName("");
            setFBUid("");
            navigate("/");
        } catch (error) {
            console.log(error.code);
        }
    };

    useEffect(() => {
        if (!fbUid) {
            navigate("/");
        }
    });

    return (
        <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
            <h2>Mypage</h2>
            {/* 
      1. emotion 을 활용하여 tag 의 용도를 구분한다. 
      2. css 도 함께 적용한다
      */}
            <MyPageDiv>
                <form>
                    <div>
                        <label htmlFor="">NickName</label>
                        <input
                            minLength={2}
                            maxLength={10}
                            type="text"
                            required
                            value={nickName}
                            onChange={e => setNickName(e.target.value)}
                        />
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={handlerNickName}
                        >
                            NickName Edit
                        </button>
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={handlerEmail}
                        >
                            Email Edit
                        </button>
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            value={pw}
                            onChange={e => setPw(e.target.value)}
                            required
                            minLength={8}
                            maxLength={16}
                        />
                        <label htmlFor="">Password 확인</label>
                        <input
                            type="password"
                            value={pwConfirm}
                            onChange={e => setPwConfirm(e.target.value)}
                            required
                            minLength={8}
                            maxLength={16}
                        />
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={handlerPassword}
                        >
                            Password 변경
                        </button>
                    </div>
                    <div className="flex justify-center gap-5 w-full">
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={handlerDelete}
                        >
                            회원탈퇴
                        </button>
                        <button
                            className="border rounded px-3 py-2 shadow"
                            onClick={e => {
                                e.preventDefault();
                                navigate("/");
                            }}
                        >
                            Cancle
                        </button>
                    </div>
                </form>
            </MyPageDiv>
        </div>
    );
};

export default Mypage;
