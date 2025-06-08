// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// const nav = [
// 	{ id: 1, title: 'Quản lý bài viết', link: '/admin/contents', icon: 'fa fa-product-hunt mr-2' },
// 	{ id: 2, title: 'Quản lý tương tác', link: '/admin/reviews', icon: 'fa fa-star mr-2' },
// 	{ id: 3, title: 'Quản lý người dùng', link: '/admin/users', icon: 'fa fa-users mr-2' },
// 	{ id: 4, title: 'Quản lý thảo luận', link: '/admin/manage-booking-content', icon: 'fa fa-comment mr-2' },
// 	{ id: 5, title: 'Quản lý lịch hẹn', link: '/admin/manage-bookings', icon: 'fa fa-calendar mr-2' },
// ];
// const Sidebar = () => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	return (
// 		<div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
// 			<nav className="h-full flex flex-col justify-center">
// 				{/* Menu */}
// 				<ul className="space-y-2 p-4">
// 					{nav &&
// 						nav.map((item) => (
// 							<li key={item.id}>
// 								<Link
// 									to={item.link}
// 									className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
// 								>
// 									<i className={item.icon}></i>
// 									<span>{item.title}</span>
// 								</Link>
// 							</li>
// 						))}
// 				</ul>
// 			</nav>
// 		</div>
// 	);
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
	const location = useLocation();
	const [isMobile, setIsMobile] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);

	const nav = [
		{
			id: 1,
			title: 'Quản lý bài viết',
			link: '/admin/contents',
			icon: 'fa fa-file-text',
		},
		{
			id: 2,
			title: 'Quản lý tương tác',
			link: '/admin/reviews',
			icon: 'fa fa-star',
		},
		{
			id: 3,
			title: 'Quản lý người dùng',
			link: '/admin/users',
			icon: 'fa fa-users',
		},
		{
			id: 4,
			title: 'Quản lý thảo luận',
			link: '/admin/manage-booking-content',
			icon: 'fa fa-comment',
		},
		{
			id: 5,
			title: 'Quản lý lịch hẹn',
			link: '/admin/manage-bookings',
			icon: 'fa fa-calendar',
		},
	];

	// Theo dõi kích thước màn hình để điều chỉnh sidebar
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth < 768) {
				setIsCollapsed(true);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			{/* Overlay cho mobile khi sidebar mở */}
			{isMobile && !isCollapsed && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
					onClick={() => setIsCollapsed(true)}
				/>
			)}

			<div
				className={`fixed top-0 left-0 h-screen z-30 transition-all duration-300 transform mt-[76px]
                    ${isCollapsed && isMobile ? '-translate-x-full' : 'translate-x-0'}
                    ${isCollapsed && !isMobile ? 'w-20' : 'w-64'} 
                    bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl`}
			>
				{/* Toggle button */}
				<button
					className="absolute -right-3 top-12 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
					onClick={() => setIsCollapsed(!isCollapsed)}
					aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				>
					<svg
						className={`w-5 h-5 transition-transform duration-300 ${
							!isCollapsed ? 'transform rotate-180' : ''
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
						/>
					</svg>
				</button>

				{/* Header */}
				<div
					className={`flex items-center justify-center py-6 border-b border-gray-700 ${
						isCollapsed && !isMobile ? 'px-2' : 'px-4'
					}`}
				>
					{isCollapsed && !isMobile ? (
						<div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
							T
						</div>
					) : (
						<h1 className="text-xl font-bold text-blue-400">TheO Admin</h1>
					)}
				</div>

				{/* Menu */}
				<div className="py-4 px-2 h-[calc(100vh-74px)] overflow-y-auto">
					<nav>
						<ul className="space-y-1">
							{nav.map((item) => {
								const isActive = location.pathname === item.link;
								return (
									<li key={item.id}>
										<Link
											to={item.link}
											className={`flex items-center rounded-lg transition-colors duration-200 
                                                ${
													isActive
														? 'bg-blue-700 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white'
												}
                                                ${isCollapsed && !isMobile ? 'justify-center p-3' : 'p-3 space-x-3'}`}
										>
											<i
												className={`${item.icon} ${
													isCollapsed && !isMobile ? 'text-base' : 'text-lg'
												}`}
											></i>
											{(!isCollapsed || isMobile) && (
												<span className="font-medium">{item.title}</span>
											)}
											{isActive && (
												<span className="absolute left-0 w-1 h-8 bg-blue-400 rounded-r-md"></span>
											)}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>

				{/* Footer */}
				<div
					className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900 
                    ${isCollapsed && !isMobile ? 'flex justify-center' : ''}`}
				>
					{isCollapsed && !isMobile ? (
						<Link
							to="/"
							className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
						>
							<i className="fa fa-sign-out"></i>
						</Link>
					) : (
						<Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white">
							<i className="fa fa-sign-out"></i>
							<span>Về trang chủ</span>
						</Link>
					)}
				</div>
			</div>

			{/* Mobile toggle button (visible only on mobile) */}
			{isMobile && isCollapsed && (
				<button
					className="fixed z-20 bottom-6 left-6 p-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 focus:outline-none"
					onClick={() => setIsCollapsed(false)}
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
					</svg>
				</button>
			)}
		</>
	);
};

export default Sidebar;
