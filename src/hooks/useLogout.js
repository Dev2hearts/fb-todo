import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";

// firebase logout
export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const logout = async () => {
        setError(null);
        setIsPending(true);
        // FB 로그아웃 API
        await signOut(appAuth);
        try {
            dispatch({ type: "logout" });
        } catch (err) {
            console.log(err);
        }
    };
    return { error, isPending, logout };
};
