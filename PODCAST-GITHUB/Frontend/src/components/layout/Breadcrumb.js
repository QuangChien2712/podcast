import React from 'react';

const Breadcrumb = ({ items }) => {
	return (
		<nav className="flex py-3 flex-wrap" aria-label="Breadcrumb">
			<ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
				{items.map((item, index) => (
					<li
						key={index}
						className={`inline-flex items-center ${index === items.length - 1 ? 'text-gray-500' : ''}`}
					>
						{/* Mũi tên chia cách */}
						{index !== 0 && (
							<svg
								className="rtl:rotate-180 w-4 h-4 text-orange-500 mx-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						)}

						{/* Link hoặc label */}
						{item.href ? (
							<a
								href={item.href}
								className="inline-flex leading-7 items-center text-sm font-medium text-gray-700 hover:text-orange-600"
							>
								{/* Icon nếu có */}
								{item.icon && (
									<svg
										className={`w-4 h-4 me-2.5 ${
											item.color ? `text-${item.color}-500` : 'text-gray-700'
										}`}
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d={item.icon} />
									</svg>
								)}
								{item.label}
							</a>
						) : (
							<span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
