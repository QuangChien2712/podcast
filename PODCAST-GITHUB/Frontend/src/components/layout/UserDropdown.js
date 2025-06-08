import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ user, logoutHandler }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const timeoutRef = useRef(null);

	// Xử lý click outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Xử lý cuộn trang để đóng dropdown
	useEffect(() => {
		function handleScroll() {
			if (isOpen) {
				setIsOpen(false);
			}
		}
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isOpen]);

	// Xử lý thay đổi focus
	useEffect(() => {
		function handleFocusChange(event) {
			if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('focusin', handleFocusChange);
		return () => document.removeEventListener('focusin', handleFocusChange);
	}, [isOpen]);

	// Tự động đóng sau khoảng thời gian không tương tác
	useEffect(() => {
		if (isOpen) {
			// Xóa timeout cũ nếu có
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			// Tạo timeout mới để tự động đóng sau 3 giây
			timeoutRef.current = setTimeout(() => {
				setIsOpen(false);
			}, 3000);
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [isOpen]);

	// Reset timeout khi user tương tác với dropdown
	const handleDropdownInteraction = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 3000);
	};

	return (
		<div ref={dropdownRef} className="relative flex items-center space-x-3 cursor-pointer">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center space-x-2 text-white focus:outline-none"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				<figure className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all duration-300">
					<img
						src={user.avatar && user.avatar.split('CHIEN')[1]}
						alt={user.name}
						className="w-full h-full object-cover"
					/>
				</figure>
				<span className="hidden md:inline-block font-medium">{user.name}</span>
			</button>

			<div
				className={`absolute right-0 top-14 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform origin-top-right
                ${
					isOpen
						? 'opacity-100 scale-100 translate-y-0'
						: 'opacity-0 scale-95 translate-y-2 pointer-events-none'
				}`}
				onMouseMove={handleDropdownInteraction}
				onMouseEnter={handleDropdownInteraction}
				onClick={() => setIsOpen(false)}
			>
				<div className="">
					<Link
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white transition-colors duration-200"
						to="/"
					>
						Trang chủ
					</Link>

					{user.typeRole === 'A' && (
						<Link
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white transition-colors duration-200"
							to="/admin/users"
						>
							Trang quản trị
						</Link>
					)}

					<Link
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white transition-colors duration-200"
						to="/me"
					>
						Thông tin tài khoản
					</Link>

					<Link
						className="block px-4 py-2 text-sm text-red-600 hover:bg-red-400 hover:text-white transition-colors duration-200"
						to="/"
						onClick={logoutHandler}
					>
						Đăng xuất
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserDropdown;
