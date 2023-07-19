import { useState } from "react";
import { appAuth } from "../firebase/config";
import { updatePassword } from "firebase/auth";

export const useUpdatePassword = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const updatePW = async pw => {
        setError(null);
        setIspending(true);
        try {
            await updatePassword(appAuth.currentUser, pw);
            console.log("비밀번호 업데이트 완료");
            setIspending(false);
        } catch (err) {
            setIspending(false);
            setError(err.message);
            console.log(err.message);
        }
    };
    return { error, isPending, updatePW };
};
