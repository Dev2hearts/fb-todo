import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
                            to="/todo"
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
                    <Link to="/login" className="text-white">
                        Login
                    </Link>
                    <Link to="/signup" className="text-white">
                        SignUp
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
