import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { updateEmail } from "firebase/auth";

export const useUpdateEmail = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const { dispatch } = useAuthContext();
    const updateEM = async email => {
        setError(null);
        setIspending(true);
        try {
            await updateEmail(appAuth.currentUser, email);
            dispatch({ type: "updateEmail", payload: appAuth.currentUser });
            setIspending(false);
        } catch (err) {
            setIspending(false);
            setError(err.message);
            console.log(err.message);
        }
    };
    return { error, isPending, updateEM };
};
