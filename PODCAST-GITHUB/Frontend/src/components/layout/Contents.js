import React from 'react';

const Contents = ({ image, title, content }) => {
	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
			{/* Hình ảnh */}
			<img src={image} alt={title} className="w-full h-80 object-cover rounded-lg mb-6" />
			{/* Tiêu đề */}
			<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
			{/* Nội dung */}
			<div className="prose dark:prose-invert max-w-none">{content}</div>
		</div>
	);
};

export default Contents;
