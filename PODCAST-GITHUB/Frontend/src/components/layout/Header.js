import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';
import logo from '../../assets/images/logo/TheoO2.svg';
import SearchInput from '../SearchInPut';
import Home from '../Home';
import { Link } from "react-router-dom";
import './Header.css';

const Header = ({history}) => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const location = useLocation();

	const { user, loading } = useSelector((state) => state.auth);
	const [menuOpen, setMenuOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const logoutHandler = () => {
		dispatch(logout());
		alert.success('Đã đăng xuất');
	};

	const menuItems = [
		{ name: "THEO'O BLOG", idSection: '/blog' },
		{ name: 'PHÁT TRIỂN SỰ NGHIỆP', idSection: 'career' },
		{ name: 'CÂN BẰNG CUỘC SỐNG', idSection: 'balance' },
		{ name: 'PODCAST', idSection: 'podcast' },
		{ name: 'ĐẶT LỊCH HẸN 1-1', idSection: 'appointment' },
		{ name: 'BỘ CÔNG CỤ', idSection: 'tools' },
		{ name: 'LIÊN HỆ', idSection: 'contact' },
	];

	const searchPaths = ['/blog1', '/blog2', '/career', '/balance', '/podcast'];

	useEffect(() => {
		if (searchPaths.some((path) => location.pathname.includes(path))) {
			setShowSearch(true);
		} else {
			setShowSearch(false);
		}
	}, [searchPaths, location.pathname]);

	const handleOnClick = (item) => {
			const targetSection = document.getElementById(`section-${item.idSection}`);
			if (targetSection) {
				const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 96; // Trừ chiều cao header (96px)
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth',
				});
			} else {
				console.error(`Section with id section-${item.idSection} not found`);
			}		
	};

	return (
		<Fragment>
			<header className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white">
				<div style={{height: "60px"}} className="container mx-auto flex items-center justify-between py-3 px-4">
					
				{/* Mobile Navigation */}
				{menuOpen && (
					<div className="md:hidden bg-gray-900 py-1 px-3 khoang_cach_tren">
						{menuItems.map((item, index) => (
							index === 0 ? (<Link to="/"><div className="thanh_menu block text-lg font-medium mt-3 hover:text-gray-400 cursor-pointer">{item.name}</div></Link>) : 
								<div								
								key={index}
								onClick={() => handleOnClick(item)}
								className="thanh_menu block text-lg font-medium mt-3 hover:text-gray-400 cursor-pointer"
							>
								{item.name}
							</div>
							
							
						))}
					</div>
				)}

				

					{/* Search Input */}
					{!showSearch && !menuOpen && <SearchInput/>}

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

					{/* Mobile Menu Button */}
					<button className="md:hidden flex items-center focus:outline-none" onClick={toggleMenu}>
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

					{/* Logo */}
					<img
						src={logo}
						alt="Logo"
						className="w-16 h-16 object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>

				
			</header>
		</Fragment>
	);
};

export default Header;
