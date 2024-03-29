import React from "react";
import { Link } from "react-router-dom";
// import { useLogout } from "../hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutFetch } from "../reducers/actions";

const Header = () => {
    // const { user } = useAuthContext();
    const { displayName, email, uid } = useSelector(state => state.fbAuth);
    // const { logout } = useLogout();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(asyncLogoutFetch());
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
                            to={uid ? "/todo" : "/login"}
                            className="text-white hover:text-green-400"
                        >
                            Todo
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/schedule"
                            className="text-white hover:text-green-400"
                        >
                            Schedule
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/chart"
                            className="text-white hover:text-green-400"
                        >
                            Chart
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/upload"
                            className="text-white hover:text-green-400"
                        >
                            Upload
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
                    {uid ? (
                        <div className="text-white flex items-center justify-center gap-4">
                            {displayName} {email}
                            <button onClick={handleLogout}>Logout</button>
                            <Link to="/mypage">마이페이지</Link>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-4">
                            <Link to="/login" className="text-white">
                                Login
                            </Link>
                            <Link to="/signup" className="text-white">
                                SignUp
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
