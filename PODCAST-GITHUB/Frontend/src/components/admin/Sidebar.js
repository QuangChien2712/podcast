// import React from 'react'
// import { Link } from 'react-router-dom'

// const Sidebar = () => {
//     return (
//         <div className="sidebar-wrapper">
//             <nav id="sidebar">
//                 <ul className="list-unstyled components">

//                     <li>
//                         <Link to="/admin/contents"><i className="fa fa-product-hunt"></i> Quản lý bài viết</Link>
//                     </li>
//                     <li>
//                     <Link to="/admin/reviews"><i className="fa fa-star"></i> Quản lý tương tác</Link>
//                     </li>
//                     <li>
//                         <Link to="/admin/users"><i className="fa fa-users"></i> Quản lý người dùng</Link>
//                     </li>

//                 </ul>
//             </nav>
//         </div>
//     )
// }

// export default Sidebar

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const nav = [
	{ id: 1, title: 'Quản lý bài viết', link: '/admin/contents', icon: 'fa fa-product-hunt mr-2' },
	{ id: 2, title: 'Quản lý tương tác', link: '/admin/reviews', icon: 'fa fa-star mr-2' },
	{ id: 3, title: 'Quản lý người dùng', link: '/admin/users', icon: 'fa fa-users mr-2' },
];
const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
			<nav className="h-full flex flex-col justify-center">
				{/* Menu */}
				<ul className="space-y-2 p-4">
					{nav &&
						nav.map((item) => (
							<li key={item.id}>
								<Link
									to={item.link}
									className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
								>
									<i className={item.icon}></i>
									<span>{item.title}</span>
								</Link>
							</li>
						))}
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
