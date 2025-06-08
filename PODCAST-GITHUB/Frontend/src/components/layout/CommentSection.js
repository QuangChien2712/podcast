import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview, getContentReviews } from '../../actions/contentActions';
import { toast } from 'react-toastify';

const CommentSection = ({ comments }) => {
	const dispatch = useDispatch();
	const [commentList, setCommentList] = useState(comments);
	const [newComment, setNewComment] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [imageErrors, setImageErrors] = useState(new Set()); // Track failed image loads
	const vitri = window.location.pathname.split('/')[2].split("-").length - 1;
	const contentId = window.location.pathname.split('/')[2].split("-")[vitri];
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		console.log("listComments: ", comments);
		
		setCommentList(comments);
	}, [comments]);

	const reLoad = () => {
		window.location.reload();
	};

	const handleAddComment = async () => {
		if (!user) {
			toast.error('Vui lòng đăng nhập để bình luận!');
			return;
		}

		if (newComment.trim() === '') {
			toast.error('Nội dung bình luận không được để trống!');
			setNewComment('');
			return;
		}

		if (newComment.length > 500) {
			toast.error('Bình luận không được vượt quá 500 ký tự!');
			return;
		}

		setIsSubmitting(true);

		const newCommentData = {
			like: '0',
			comment: newComment.trim(),
			share: '0',
			idContent: contentId,
			email: user.email,
		};

		try {
			dispatch(newReview(newCommentData));
			setNewComment('');
			dispatch(getContentReviews(contentId));
			toast.success('Bình luận đã được thêm thành công!');
			setTimeout(reLoad, 1000);
		} catch (error) {
			toast.error('Có lỗi xảy ra, vui lòng thử lại!');
		} finally {
			setIsSubmitting(false);
		}
	};

	const chuyenNgay = (thoiGian) => {
		console.log("thowfig gian: ", thoiGian);
		
		const date = new Date(thoiGian);
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
		const diffMinutes = Math.floor(diffTime / (1000 * 60));

		if (diffMinutes < 1) return 'Vừa xong';
		if (diffMinutes < 60) return `${diffMinutes} phút trước`;
		if (diffHours < 24) return `${diffHours} giờ trước`;
		if (diffDays < 7) return `${diffDays} ngày trước`;

		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};

	const getInitials = (email) => {
		if (!email) return '?';
		// Lấy chữ cái đầu của email hoặc tên
		const name = email.split('@')[0];
		if (name.includes('.')) {
			// Nếu có dấu chấm, lấy chữ cái đầu của mỗi phần
			const parts = name.split('.');
			return parts
				.map((part) => part.charAt(0).toUpperCase())
				.slice(0, 2)
				.join('');
		}
		return name.charAt(0).toUpperCase();
	};

	const getRandomColor = (email) => {
		const colors = [
			'bg-blue-500',
			'bg-green-500',
			'bg-purple-500',
			'bg-pink-500',
			'bg-indigo-500',
			'bg-yellow-500',
			'bg-red-500',
			'bg-teal-500',
			'bg-orange-500',
			'bg-cyan-500',
		];
		const index = email ? email.charCodeAt(0) % colors.length : 0;
		return colors[index];
	};

	// Function to get user avatar URL
	const getUserAvatar = (userEmail) => {
		// Tìm user trong danh sách comments để lấy avatar
		if (userEmail === user?.email && user?.avatar) {
			return user.avatar;
		}

		// Tìm trong comment list nếu có avatar
		const userComment = commentList?.find((comment) => comment.email === userEmail);
		if (userComment?.avatar) {
			return userComment.avatar;
		}

		// Fallback: có thể tích hợp với Gravatar
		// const gravatarHash = md5(userEmail.toLowerCase().trim());
		// return `https://www.gravatar.com/avatar/${gravatarHash}?d=404&s=100`;

		return null;
	};

	// Handle image load error
	const handleImageError = (email) => {
		setImageErrors((prev) => new Set([...prev, email]));
	};

	// Avatar component
	const Avatar = ({ email, size = 'w-10 h-10 sm:w-12 sm:h-12' }) => {
		const avatarUrl = getUserAvatar(email);
		const hasImageError = imageErrors.has(email);

		if (avatarUrl && !hasImageError) {
			return (
				<div className={`flex-shrink-0 ${size} rounded-full overflow-hidden bg-gray-200`}>
					<img
						src={avatarUrl}
						alt={`Avatar của ${email}`}
						className="w-full h-full object-cover"
						onError={() => handleImageError(email)}
						onLoad={() => {
							// Remove from error set if image loads successfully
							setImageErrors((prev) => {
								const newSet = new Set([...prev]);
								newSet.delete(email);
								return newSet;
							});
						}}
					/>
				</div>
			);
		}

		// Fallback to initials
		return (
			<div
				className={`flex-shrink-0 ${size} rounded-full ${getRandomColor(
					email,
				)} flex items-center justify-center text-white font-semibold`}
			>
				{getInitials(email)}
			</div>
		);
	};

	return (
		<div className="w-full mt-8 bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
					<svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
					Bình luận
				</h2>
				<span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
					{commentList && commentList.length > 0 ? commentList.length : 0}
				</span>
			</div>

			{/* Form thêm bình luận */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
				<div className="flex items-start space-x-3 sm:space-x-4">
					{/* Avatar */}
					<Avatar email={user?.email} />

					{/* Comment input */}
					<div className="flex-1">
						<textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							rows="3"
							maxLength="500"
							className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
							placeholder={
								user ? 'Chia sẻ suy nghĩ của bạn về bài viết này...' : 'Vui lòng đăng nhập để bình luận'
							}
							disabled={!user || isSubmitting}
						/>

						{/* Character counter và submit button */}
						<div className="flex items-center justify-between mt-3">
							<span className={`text-sm ${newComment.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
								{newComment.length}/500
							</span>

							<button
								onClick={handleAddComment}
								disabled={!user || isSubmitting || newComment.trim() === ''}
								className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
									!user || isSubmitting || newComment.trim() === ''
										? 'bg-gray-300 text-gray-500 cursor-not-allowed'
										: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
								}`}
							>
								{isSubmitting ? (
									<div className="flex items-center">
										<svg
											className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Đang gửi...
									</div>
								) : (
									'Gửi bình luận'
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Danh sách bình luận */}
			<div className="space-y-4">
				{commentList && commentList.length > 0 ? (
					commentList.map((item, index) => (
						<div
							key={index}
							className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-md"
						>
							<div className="flex items-start space-x-3 sm:space-x-4">
								{/* Avatar */}
								<Avatar email={item.email} />

								{/* Comment content */}
								<div className="flex-1 min-w-0">
									{/* Header */}
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
										<h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
											{item.name || item.email?.split('@')[0] || item.email}
										</h4>
										<span className="text-xs sm:text-sm text-gray-500 flex items-center">
											<svg
												className="w-3 h-3 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											{chuyenNgay(item.createdAt)}
										</span>
									</div>

									{/* Comment text */}
									<p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
										{item.comment}
									</p>

									{/* Actions */}
									<div className="flex items-center space-x-4 mt-3 text-xs sm:text-sm">
										<button className="text-gray-500 hover:text-red-500 transition-colors flex items-center group">
											<svg
												className="w-4 h-4 mr-1 group-hover:fill-red-500"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
												/>
											</svg>
											<span>Thích</span>
										</button>
										<button className="text-gray-500 hover:text-blue-600 transition-colors flex items-center">
											<svg
												className="w-4 h-4 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
												/>
											</svg>
											<span>Trả lời</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="text-center py-12">
						<svg
							className="mx-auto h-16 w-16 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
						<h3 className="mt-4 text-lg font-medium text-gray-900">Chưa có bình luận nào</h3>
						<p className="mt-2 text-sm text-gray-500">
							Hãy là người đầu tiên chia sẻ suy nghĩ của bạn về bài viết này!
						</p>
					</div>
				)}
			</div>

			{/* Load more button (nếu cần) */}
			{commentList && commentList.length > 5 && (
				<div className="text-center mt-6">
					<button className="text-blue-600 hover:text-blue-800 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
						Xem thêm bình luận
					</button>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
