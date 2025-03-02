import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ user, logoutHandler }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className="relative flex items-center space-x-3 cursor-pointer">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center space-x-2 text-white focus:outline-none"
			>
				<figure className="w-10 h-10 rounded-full overflow-hidden">
					<img
						src={user.avatar && user.avatar.split('CHIEN')[1]}
						alt={user.name}
						className="w-full h-full object-cover"
					/>
				</figure>
				<span className="hidden md:inline-block">{user.name}</span>
			</button>

			{isOpen && (
				<div
					className="absolute right-0 top-full w-48 bg-white text-black shadow-lg rounded-md transition-all duration-200"
					style={{ top: '55px' }}
					onClick={() => setIsOpen(false)}
				>
					<Link className="dropdown-item" to="/">
						Trang chủ
					</Link>

					{user.typeRole === 'A' && (
						<Link className="dropdown-item" to="/admin/users">
							Trang quản trị
						</Link>
					)}

					<Link className="dropdown-item" to="/me">
						Thông tin tài khoản
					</Link>
					<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
						Đăng xuất
					</Link>
				</div>
			)}
		</div>
	);
};

export default UserDropdown;
