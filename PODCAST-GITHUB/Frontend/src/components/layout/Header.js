import { Fragment, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import logo from '../../assets/images/background/TheoO_Background.webp';
import SearchInput from '../SearchInPut';
import './Header.css';
import UserDropdown from './UserDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CHON_GIAI_PHAP, BOOKING, CBCS, GIOI_THIEU, HOME, PODCAST, PTSN } from '../../constants/path';

const menuItems = [
	{ name: 'HOME', idSection: `${HOME}` },
	{ name: `TheO's BLOG`, idSection: `${GIOI_THIEU}` },
	{ name: 'PHÁT TRIỂN SỰ NGHIỆP', idSection: `${PTSN}` },
	{ name: 'CÂN BẰNG CUỘC SỐNG', idSection: `${CBCS}` },
	{ name: 'PODCAST', idSection: `${PODCAST}` },
	{ name: '1 GIỜ COACHING MIỄN PHÍ', idSection: `${BOOKING}` },
	{ name: 'CHỌN GIẢI PHÁP', idSection: `${CHON_GIAI_PHAP}` },
];

const searchPaths = [`/${PTSN}`, `/${CBCS}`];

const Header = () => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		window.scrollTo(0, 0); // Cuộn lên đầu trang khi URL thay đổi
	}, [location.pathname]);
	const dispatch = useDispatch();
	const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
	const [menuOpen, setMenuOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	useEffect(() => {
		setShowSearch(searchPaths.includes(location.pathname));
	}, [location.pathname]);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const logoutHandler = () => {
		dispatch(logout());
	};

	// Xử lý render logo hoặc avatar
	const renderLogoOrAvatar = () => {
		// Nếu user đã đăng nhập và có dữ liệu -> hiển thị UserDropdown
		if (isAuthenticated && user) {
			return <UserDropdown user={user} logoutHandler={logoutHandler} />;
		}

		// Tất cả các trường hợp khác (đang loading, chưa đăng nhập, vừa logout) -> hiển thị logo
		return (
			<img
				onClick={() => history.push('/')}
				src={logo}
				alt="TheO Logo"
				className="object-cover hover:scale-105 transition-transform duration-300 rounded-full h-10 w-10 cursor-pointer"
				onError={(e) => {
					// Fallback nếu ảnh logo không load được
					e.target.onerror = null;
					e.target.src = 'https://via.placeholder.com/40';
				}}
			/>
		);
	};

	return (
		<Fragment>
			<header className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white">
				<div className="container flex items-center justify-between py-3 px-4 min-h-[70px]">
					{/* Mobile Menu Button */}
					<button className="lg:hidden flex items-center focus:outline-none" onClick={toggleMenu}>
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
							className="lg:hidden fixed left-0 top-[70px] w-full h-[calc(100vh-70px)] bg-gray-900 px-5 z-50 overflow-y-auto"
							onClick={() => setMenuOpen(false)}
						>
							{menuItems.map((item, index) => (
								<Link
									key={index}
									to={`/${item.idSection}`}
									className="block text-lg font-medium mt-3 hover:text-gray-400 cursor-pointer"
								>
									{item.name}
								</Link>
							))}
						</div>
					)}

					{/* Navigation */}
					<nav className="hidden lg:flex items-center space-x-6">
						{menuItems.map((item, index) => (
							<Link
								key={index}
								to={`/${item.idSection}`}
								className="block text-lg font-medium lg:text-sm hover:text-gray-400 cursor-pointer"
							>
								{item.name}
							</Link>
						))}
					</nav>
					{/* Search Input */}
					{showSearch && !menuOpen && <SearchInput />}

					{/* Logo or User Avatar - Logic đã được tách riêng */}
					{renderLogoOrAvatar()}
				</div>
			</header>
		</Fragment>
	);
};

export default Header;
