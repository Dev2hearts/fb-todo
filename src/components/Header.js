import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Header = ({
    fbName,
    fbEmail,
    fbUid,
    setFBName,
    setFBEmail,
    setFBUid,
}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        firebase.auth().signOut();
        setFBName("");
        setFBEmail("");
        setFBUid("");
        navigate("/");
    };
    return (
        <header className="p-6 bg-black">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-white hover:text-green-400">
                    Logo
                </Link>
                <ul className="flex items-center justify-center gap-4">
                    <li>
                        <Link
                            to="/home"
                            className="text-white hover:text-green-400"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={fbUid ? "/todo" : "/login"}
                            className="text-white hover:text-green-400"
                        >
                            Todo
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-white hover:text-green-400"
                        >
                            About
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center justify-center gap-4">
                    {fbUid ? (
                        <div className="text-white">
                            {fbName} {fbEmail} {fbUid}
                            <button onClick={handleLogout}>Logout</button>
                            <Link to="/mypage">마이페이지</Link>
                        </div>
                    ) : (
                        <Link to="/login" className="text-white">
                            Login
                        </Link>
                    )}

                    <Link to="/signup" className="text-white">
                        SignUp
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
