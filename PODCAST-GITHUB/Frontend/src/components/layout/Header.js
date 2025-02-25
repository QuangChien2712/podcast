import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import logo from "../../assets/images/background/TheoO_Background.webp";
import SearchInput from "../SearchInPut";
import "./Header.css";

const Header = ({ history }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi URL thay đổi
  }, [location.pathname]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Đã đăng xuất");
  };

  const menuItems = [
    { name: "THEO'O BLOG", idSection: "blog" },
    { name: "PHÁT TRIỂN SỰ NGHIỆP", idSection: "career" },
    { name: "CÂN BẰNG CUỘC SỐNG", idSection: "balance" },
    { name: "PODCAST", idSection: "podcast" },
    { name: "ĐẶT LỊCH HẸN 1-1", idSection: "appointment" },
    { name: "BỘ CÔNG CỤ", idSection: "tools" },
    { name: "LIÊN HỆ", idSection: "contact" },
  ];

  const searchPaths = ["/blog1", "/blog2", "/career", "/balance", "/podcast"];
  useEffect(() => {
    setShowSearch(searchPaths.includes(location.pathname));
  }, [location.pathname]);

  const handleOnClick = (item) => {
    setMenuOpen(false);

    const targetSection = document.getElementById(`section-${item.idSection}`);
    if (targetSection) {
      const offsetTop =
        targetSection.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else {
      console.error(`Section with id section-${item.idSection} not found`);
      window.location.href = "/";
    }
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
              className="fixed left-0 top-[70px] w-full h-[calc(100vh-70px)] bg-gray-900 px-5 z-50 overflow-y-auto"
              style={{
                position: "fixed",
                top: "70px",
                left: 0,
                width: "100%",
                height: "calc(100vh - 70px)",
              }}
            >
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleOnClick(item)}
                  className="text-lg font-medium mt-3 hover:text-gray-400 cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}

          {/* Search Input */}
          {showSearch && !menuOpen && <SearchInput />}

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOnClick(item)}
                className="text-sm font-medium hover:text-gray-400 transition-colors"
              >
                {item.name}
              </div>
            ))}
          </nav>

          {/* Logo */}
          <img
            onClick={() => (window.location.href = "/")}
            src={logo}
            alt="Logo"
            className="w-10 h-10 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
