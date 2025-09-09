import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Home, History, BadgeDollarSign, Goal, UserCircle, SlidersVertical
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppProvider";
import SkeletonLoader from "../components/SkeletonLoader";

export default function UserLayout() {
  const { setSearch, logout, navigate, user, loading } = useAppContext();
  const location = useLocation();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      return null;
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, href: "/" },
    { name: "Add Transactions", icon: <BadgeDollarSign size={18} />, href: "/add-transactions" },
    { name: "Budgets", icon: <Goal size={18} />, href: "/budgets" },
    { name: "Set Budgets", icon: <SlidersVertical size={18} />, href: "/set-budgets" },
    { name: "Transactions", icon: <History size={18} />, href: "/transactions" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserDropdown && !userDropdownRef.current?.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => navigate("/")}
          className="text-lg font-extrabold flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          <img src="./logo.png" alt="Logo" className="size-8" /> CashFlowX
        </div>

        {/* Menu Items */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map(({ name, icon, href }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-all
              ${location.pathname === href
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                }`}
            >
              {icon} {name}
            </Link>
          ))}
        </nav>

        {/* Right Section: Search + User */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center px-3 gap-2 bg-gray-50 border border-gray-300 h-[40px] rounded-lg shadow-inner">
            <input
              type="text"
              placeholder="Search..."
              className="w-40 text-sm text-gray-600 bg-transparent outline-none"
              onChange={(e) => {
                setSearch(e.target.value);
                navigate("/transactions");
              }}
            />
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button onClick={() => setShowUserDropdown(prev => !prev)} className="cursor-pointer">
              <UserCircle size={32} className="text-gray-700 hover:text-purple-600 transition" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-4 z-50">
                <p className="text-sm font-semibold text-gray-800 mb-3">{user?.email}</p>
                <button
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:opacity-90 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {loading ? <SkeletonLoader /> : <Outlet />}
      </main>
    </div>
  );
}
