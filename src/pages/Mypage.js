import React, { useEffect, useState } from "react";
import { MyPageDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUpdateNickName } from "../hooks/useUpdateNickName";
import { useUpdateEmail } from "../hooks/useUpdateEmail";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { useDeleteUser } from "../hooks/useDeleteUser";
// firebase 연동

const Mypage = () => {
    const { user } = useAuthContext();
    const { updateNickName } = useUpdateNickName();
    const { updateEM } = useUpdateEmail();
    const { updatePW } = useUpdatePassword();
    const { deleteID } = useDeleteUser();
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    // AuthContex 에 state 의 user 를 출력
    useEffect(() => {
        setNickName(user.displayName);
        setEmail(user.email);
    }, []);

    const handlerNickName = e => {
        e.preventDefault();
        updateNickName(nickName);
    };
    const handlerEmail = e => {
        e.preventDefault();
        updateEM(email);
    };
    const handlerPassword = e => {
        e.preventDefault();
        if (pw === pwConfirm) {
            updatePW(pw);
        } else {
            alert("비밀번호를 확인 해주세요");
        }
    };
    const handlerDelete = e => {
        e.preventDefault();
        deleteID();
        navigate("/");
    };
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
