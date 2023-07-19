import { useState } from "react";
import { appAuth } from "../firebase/config";
import { deleteUser } from "firebase/auth";

export const useDeleteUser = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const deleteID = async () => {
        setError(null);
        setIspending(true);
        try {
            await deleteUser(appAuth.currentUser);
            setIspending(false);
        } catch (err) {
            setIspending(false);
            setError(err);
            console.log(err);
        }
    };
    return { error, isPending, deleteID };
};
