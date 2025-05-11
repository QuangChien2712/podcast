import React, { Fragment, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import logo from "../../assets/images/background/TheoO_Background.webp";
import SearchInput from "../SearchInPut";
import "./Header.css";
import UserDropdown from "./UserDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const menuItems = [
  { name: "THEO BLOG", idSection: "/bio" },
  { name: "PHÁT TRIỂN SỰ NGHIỆP", idSection: "/blog1" },
  { name: "CÂN BẰNG CUỘC SỐNG", idSection: "/blog2" },
  { name: "PODCAST", idSection: "/" },
  { name: "ĐẶT LỊCH HẸN 1-1", idSection: "/booking" },
  { name: "BỘ CÔNG CỤ", idSection: "/" },
];

const searchPaths = ["/blog1", "/blog2", "/booking", "/career", "/balance", "/podcast"];

const Header = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi URL thay đổi
  }, [location.pathname]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setShowSearch(searchPaths.includes(location.pathname));
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Đã đăng xuất");
  };

  return (
    <Fragment>
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white">
        <div
          style={{ height: "70px" }}
          className="container flex items-center justify-between py-3 px-4"
        >
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div
              className="md:hidden fixed left-0 top-[70px] w-full h-[calc(100vh-70px)] bg-gray-900 px-5 z-50 overflow-y-auto"
              onClick={() => setMenuOpen(false)}
            >
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.idSection}
                  className="block text-lg font-medium mt-3 hover:text-gray-400 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Search Input */}
          {showSearch && !menuOpen && <SearchInput />}

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.idSection}
                className="block text-lg font-medium hover:text-gray-400 cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          {user ? (
            <UserDropdown user={user} logoutHandler={logoutHandler} />
          ) : (
            !loading && (
              <img
                onClick={() => history.push("/")}
                src={logo}
                alt="Logo"
                className="object-cover hover:scale-105 transition-transform duration-300 rounded-full"
                style={{ width: "42px", height: "42px" }}
              />
            )
          )}
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
