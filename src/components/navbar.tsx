import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../redux/store";
import { logout } from "../redux/slices/loginSlice";

type RootState = ReturnType<typeof store.getState>;

const Navbar = () => {
    const currentUser = useSelector((state: RootState) => state.user.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("burger");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNavigation = (tab: string) => {
        setActiveTab(tab);
        setSidebarOpen(false); // close sidebar on navigation

        if (tab === "burger") {
            navigate("/");
        } else if (tab === "orders") {
            navigate("/orders");
        } else if (tab === "auth") {
            if (currentUser) {
                dispatch(logout());
            }
            navigate("/auth");
        }
    };

    const tabClasses = (tab: string) =>
        `h-16 px-2 flex justify-center items-center cursor-pointer ${
            activeTab === tab
                ? "bg-[#8f5c2c] border-b-4 border-blue-500"
                : "hover:bg-[#8f5c2c] hover:border-b-4 hover:border-blue-500"
        }`;

    return (
        <>
            <div className="sticky top-0 bg-[#703b09] h-16 flex justify-between items-center text-white px-6 z-50">
                <div className="md:hidden">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-white text-2xl focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {sidebarOpen ? "X" : "☰"}
                    </button>
                </div>
                <img
                    src="https://react-builder-burger.firebaseapp.com/static/media/burger-logo.b8503d26.png"
                    className="h-12 w-16 p-2 bg-white rounded-md ml-auto md:ml-0"
                    alt="logo"
                />
                <div className="hidden md:flex items-center text-lg space-x-4 ml-auto">
                    <div className={tabClasses("burger")} onClick={() => handleNavigation("burger")}>
                        Burger Builder
                    </div>
                    {currentUser && (
                        <div className={tabClasses("orders")} onClick={() => handleNavigation("orders")}>
                            Orders
                        </div>
                    )}
                    <div className={tabClasses("auth")} onClick={() => handleNavigation("auth")}>
                        {currentUser ? "Logout" : "Login"}
                    </div>
                </div>
            </div>

            {sidebarOpen && (
                <div className="fixed top-16 left-0 w-64 h-full bg-[#703b09] text-white shadow-lg z-40 p-4 flex flex-col space-y-4 transition-all">
                    <img
                        src="https://react-builder-burger.firebaseapp.com/static/media/burger-logo.b8503d26.png"
                        className="h-20 w-24 p-2 bg-white rounded-md"
                        alt="logo"
                    />
                    <div onClick={() => handleNavigation("burger")} className="cursor-pointer hover:text-blue-400 cursor-pointer">
                        Burger Builder
                    </div>
                    {currentUser && (
                        <div onClick={() => handleNavigation("orders")} className="cursor-pointer hover:text-blue-400 cursor-pointer">
                            Orders
                        </div>
                    )}
                    <div onClick={() => handleNavigation("auth")} className="cursor-pointer hover:text-blue-400 cursor-pointer">
                        {currentUser ? "Logout" : "Login"}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;