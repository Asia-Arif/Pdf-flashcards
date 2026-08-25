import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);

        toast.success("Logged out successfully! 👋");

        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold text-gray-900"
                >
                    PDF<span className="text-blue-600">Cards</span>
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="text-sm text-gray-500 hover:text-[#437993]"
                    >
                        Smart PDF Flashcards
                    </Link>

                    {token && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
};

export default Navbar;