import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { updateProfile } from "firebase/auth";

export const useUpdateNickName = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const updateNickName = async displayName => {
        setError(null);
        setIspending(true);
        try {
            await updateProfile(appAuth.currentUser, {
                displayName: displayName,
            });
            setIspending(false);
            dispatch({ type: "updateName", payload: appAuth.currentUser });
        } catch (err) {
            setIspending(false);
            setError(err.message);
            console.log(err.message);
        }
    };
    return { error, isPending, updateNickName };
};
