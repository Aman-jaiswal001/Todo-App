import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, CheckSquare } from "lucide-react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <CheckSquare size={28} />
          TodoApp
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-6">

          {token ? (
            <>
              <Link
                to="/"
                className={`font-medium hover:text-blue-600 ${
                  location.pathname === "/" ? "text-blue-600" : ""
                }`}
              >
                Home
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-medium hover:text-blue-600 ${
                  location.pathname === "/login" ? "text-blue-600" : ""
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden bg-white border-t">

          {token ? (
            <>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block px-5 py-4 hover:bg-gray-100"
              >
                Home
              </Link>

              <button
                onClick={logout}
                className="w-full text-left px-5 py-4 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block px-5 py-4 hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block px-5 py-4 hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;