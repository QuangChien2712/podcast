import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BottomNav = () => {
	const history = useHistory();
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const [isHovered, setIsHovered] = useState(false);
	const menuRef = useRef(null);

	const footerItems = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-7 h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-500"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
					/>
				</svg>
			),
			subTitle: 'Giỏ Hàng',
			link: '/gio-hang',
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-7 h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-500"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
					/>
				</svg>
			),
			subTitle: 'Đặt Lịch Hẹn',
			link: '/booking',
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-7 h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-500"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
			),
			subTitle: isAuthenticated ? (
				<>
					Thông Tin <br className="md:hidden" /> Cá Nhân
				</>
			) : (
				<>
					Đăng Ký <br className="md:hidden" /> Thành Viên
				</>
			),
			link: isAuthenticated ? '/me' : '/register',
		},
	];

	// Xử lý keyboard accessibility
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape' && isHovered) {
				setIsHovered(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isHovered]);

	// Xử lý click outside để đóng menu
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target) && isHovered) {
				setIsHovered(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isHovered]);

	const handleClick = (item) => {
		if (item.subTitle === 'Giỏ Hàng') {
			toast.success('Tính năng đang cập nhật');
			return history.push('/');
		} else {
			history.push(item.link);
		}
		setIsHovered(false); // Đóng menu sau khi click
	};

	return (
		<>
			{/* Mobile layout */}
			<div className="fixed md:hidden bottom-0 z-50 left-0 w-full bg-gray-800 shadow-md border-t border-gray-200">
				<div className="grid grid-cols-3 text-center h-20 items-center">
					{footerItems.map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition h-full"
							onClick={() => handleClick(item)}
						>
							{item.icon}
							<span
								className="text-xs sm:text-sm font-bold text-white mt-1"
								onClick={(e) => {
									e.stopPropagation();
									handleClick(item);
								}}
							>
								{item.subTitle}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Tablet/Desktop circular floating button */}
			<div
				ref={menuRef}
				className="hidden md:block fixed z-50 md:bottom-10 lg:bottom-16 md:right-4 lg:right-10"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Main circular button with animation */}
				<div
					className={`relative bg-gray-800 rounded-full md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out
                    ${isHovered ? 'scale-110 rotate-90' : 'scale-100 rotate-0'}`}
					onClick={() => setIsHovered(!isHovered)}
					role="button"
					tabIndex="0"
					aria-label="Menu"
					aria-expanded={isHovered}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						className={`w-8 h-8 text-orange-500 transition-transform duration-300 ease-in-out ${
							isHovered ? 'rotate-45' : 'rotate-0'
						}`}
					>
						{isHovered ? (
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						)}
					</svg>
				</div>

				{/* Expanded menu panel with staggered animation */}
				<div
					className={`absolute bottom-0 right-0 overflow-hidden transition-all duration-300 ease-in-out
                    ${
						isHovered
							? 'opacity-100 max-h-[500px] max-w-[300px]'
							: 'opacity-0 max-h-0 max-w-0 pointer-events-none'
					}`}
					style={{
						transformOrigin: 'bottom right',
						perspective: '1000px',
					}}
				>
					<div className="flex flex-col-reverse space-y-reverse space-y-2 pt-2 pr-2">
						{footerItems.map((item, index) => (
							<div
								key={index}
								className="flex flex-row items-center justify-start cursor-pointer bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg
                                md:py-3 md:px-5 lg:px-6 shadow-md w-auto min-w-[180px] md:min-w-[200px] lg:min-w-[240px] transform"
								onClick={() => handleClick(item)}
								style={{
									animation: isHovered ? `slideIn 0.3s ease-out ${index * 0.1}s forwards` : '',
									opacity: 0,
									transform: 'translateX(20px) translateY(10px)',
								}}
							>
								<div className="text-orange-500 transition-transform duration-200 group-hover:scale-110 flex-shrink-0">
									{item.icon}
								</div>
								<span
									className="text-base lg:text-lg font-bold text-white ml-3 whitespace-nowrap group-hover:text-orange-200 transition-colors duration-200"
									onClick={(e) => {
										e.stopPropagation();
										handleClick(item);
									}}
								>
									{item.subTitle}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CSS Animation Keyframes */}
			<style jsx>{`
				@keyframes slideIn {
					from {
						opacity: 0;
						transform: translateX(20px) translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateX(0) translateY(0);
					}
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes scaleIn {
					from {
						transform: scale(0.8);
					}
					to {
						transform: scale(1);
					}
				}
			`}</style>
		</>
	);
};

export default BottomNav;
