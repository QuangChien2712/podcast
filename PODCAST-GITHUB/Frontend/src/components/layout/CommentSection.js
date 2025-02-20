import React, {useEffect, useState } from 'react';

const CommentSection = ({ comments }) => {
	
	const [commentList, setCommentList] = useState(comments);
	const [newComment, setNewComment] = useState('');
	
	useEffect(() => {
		setCommentList(comments);
	  }, [comments]);
	
	const handleAddComment = () => {
		if (newComment.trim() === '') return;

		const newCommentData = {
			id: commentList.length + 1,
			name: 'User',
			text: newComment,
			date: new Date().toLocaleString(),
		};

		setCommentList([...commentList, newCommentData]);
		setNewComment('');
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
			<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comments ({(commentList && commentList.length > 0) ? commentList.length : 0})</h2>

			{/* Form thêm bình luận */}
			<div className="mb-6">
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					rows="4"
					className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					placeholder="Viết bình luận của bạn tại đây..."
				></textarea>
				<button
					onClick={handleAddComment}
					className="mt-3 px-4 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-400 focus:outline-none"
				>
					Nhập
				</button>
			</div>

			{/* Danh sách bình luận */}
			<ul className="space-y-4">
				{commentList && commentList.length > 0 && commentList.map((item, index) => {return (
					<li key={index} className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
						<div className="flex items-center justify-between mb-2">
							<h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.email}</h4>
							{/*<span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>*/}
						</div>
						<p className="text-sm text-gray-700 dark:text-gray-300">{item.comment}</p>
					</li>
				)})}
			</ul>
		</div>
	);
};

export default CommentSection;
