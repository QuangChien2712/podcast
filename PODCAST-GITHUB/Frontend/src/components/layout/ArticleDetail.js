import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import { getContentReviews, newReview, deleteReview, clearErrors } from '../../actions/contentActions';
import CommentSection from './CommentSection';
import ContentSection from './NoiDungSection';
import { extractIdFromPath } from '../../utils/handlePathByTitle';

const ArticleDetail = ({ image, title, content, author, publishedAt, comments }) => {
	const { reviews } = useSelector((state) => state.contentReviews);
	const reLoad = () => {
		window.location.reload();
	};

	const alert = useAlert();
	const dispatch = useDispatch();
	const result = extractIdFromPath(window.location.pathname);
	const contentId = result.id;
	const { user } = useSelector((state) => state.auth);
	const [isLike, setIsLike] = useState(false);

	const { isDeleted } = useSelector((state) => state.review);
	const { error: reviewError, success } = useSelector((state) => state.newReview);

	useEffect(() => {
		if (reviews && reviews.length > 0 && user) {
			for (let index = 0; index < reviews.length; index++) {
				const element = reviews[index];
				if (element.email === user.email && element.like === '1' && element.idContent === contentId) {
					setIsLike(true);
					break;
				}
			}
		} else {
			setIsLike(false);
		}

		if (isDeleted) {
			setIsLike(false);
		}

		if (reviewError) {
			alert.error(reviewError);
			dispatch(clearErrors());
		}

		if (success) {
			dispatch(getContentReviews(contentId));
			setIsLike(true);
		}
	}, [dispatch, alert, reviewError, success, user, reviews, isDeleted, contentId]);

	const alertLike = () => {
		if (!user) {
			alert.show('Đăng nhập để Like, Share, Comment!');
			return;
		}
	};

	const createLike = () => {
		let dataparam = {
			like: '1',
			comment: null,
			share: '0',
			idContent: contentId,
			email: user.email,
		};
		dispatch(newReview(dataparam));
		setIsLike(true);
		dispatch(getContentReviews(contentId));
		setTimeout(reLoad, 100);
	};

	const deleteLike = () => {
		let dataparam = {
			like: '1',
			idContent: contentId,
			email: user.email,
		};
		dispatch(deleteReview(dataparam));
		setIsLike(false);
		dispatch(getContentReviews(contentId));
		setTimeout(reLoad, 100);
	};

	const shareMDN = async () => {
		try {
			await navigator.share({ url: window.location.href });
			console.log('Vào share');
		} catch (err) {
			console.log(err);
		}
	};

	// return (
	// 	<div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 md:rounded-lg shadow-md">
	// 		{/* Hình ảnh bài viết */}
	// 		<img src={image} alt={title} className="w-full h-full md:w-2/3 m-auto pb-8 object-cover rounded-lg" />

	// 		{/* Tiêu đề bài viết */}
	// 		<h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

	// 		{/* Thông tin bài viết */}
	// 		<div className="flex items-center justify-between text-sm text-gray-500">
	// 			<div className="flex items-center space-x-4">
	// 				<p>
	// 					By <span className="font-medium text-gray-900">{author}</span>
	// 				</p>
	// 				<div className="flex items-center space-x-2">
	// 					{/* Icon tym */}

	// 					{!user ? (
	// 						<button
	// 							onClick={() => {
	// 								alertLike();
	// 							}}
	// 							className="flex items-center text-gray-500"
	// 							aria-label="Like"
	// 						>
	// 							<svg
	// 								className="w-5 h-5"
	// 								xmlns="http://www.w3.org/2000/svg"
	// 								fill="currentColor"
	// 								viewBox="0 0 24 24"
	// 							>
	// 								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
	// 							</svg>
	// 							<span className="ml-1">Like</span>
	// 						</button>
	// 					) : isLike ? (
	// 						<button
	// 							onClick={() => {
	// 								deleteLike();
	// 							}}
	// 							className="flex items-center text-red-500"
	// 							aria-label="Like"
	// 						>
	// 							<svg
	// 								className="w-5 h-5"
	// 								xmlns="http://www.w3.org/2000/svg"
	// 								fill="currentColor"
	// 								viewBox="0 0 24 24"
	// 							>
	// 								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
	// 							</svg>
	// 							<span className="ml-1">Like</span>
	// 						</button>
	// 					) : (
	// 						<button
	// 							onClick={() => {
	// 								createLike();
	// 							}}
	// 							className="flex items-center text-gray-500"
	// 							aria-label="Like"
	// 						>
	// 							<svg
	// 								className="w-5 h-5"
	// 								xmlns="http://www.w3.org/2000/svg"
	// 								fill="currentColor"
	// 								viewBox="0 0 24 24"
	// 							>
	// 								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
	// 							</svg>
	// 							<span className="ml-1">Like</span>
	// 						</button>
	// 					)}

	// 					{/* Icon share */}
	// 					<button
	// 						onClick={() => {
	// 							shareMDN();
	// 						}}
	// 						className="flex items-center text-gray-500 hover:text-blue-500 ml-3"
	// 						aria-label="Share"
	// 					>
	// 						<svg
	// 							xmlns="http://www.w3.org/2000/svg"
	// 							viewBox="0 0 24 24"
	// 							fill="currentColor"
	// 							className="w-5 h-5"
	// 						>
	// 							<path
	// 								fillRule="evenodd"
	// 								d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
	// 								clipRule="evenodd"
	// 							/>
	// 						</svg>
	// 						<span className="ml-2">Share</span>
	// 					</button>
	// 				</div>
	// 			</div>
	// 			<p>{publishedAt}</p>
	// 		</div>

	// 		{/* Nội dung bài viết */}
	// 		{/*<div className="prose max-w-none text-gray-700 leading-7 mt-4 mb-8">{content}</div>*/}

	// 		<div className="mt-2 mb-20">{content ? <ContentSection contents={content} /> : <span></span>}</div>

	// 		<div className="mb-8">
	// 			{/* Phần bình luận */}
	// 			<CommentSection comments={comments} />
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white border border-gray-200 md:rounded-lg shadow-md">
			{/* Hình ảnh bài viết */}
			<img
				src={image}
				alt={title}
				className="w-full h-auto md:w-2/3 mx-auto pb-6 sm:pb-8 object-cover rounded-lg"
			/>

			{/* Tiêu đề bài viết */}
			<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
				{title}
			</h1>

			{/* Thông tin bài viết */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500 pb-4 sm:pb-6 border-b border-gray-200">
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
					<p className="flex items-center">
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						Tác giả: <span className="font-medium text-gray-900 ml-1">{author}</span>
					</p>

					{/* Like và Share buttons */}
					<div className="flex items-center space-x-4">
						{/* Like button */}
						{!user ? (
							<button
								onClick={() => alertLike()}
								className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
								aria-label="Like"
							>
								<svg
									className="w-5 h-5 mr-1"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
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
						) : isLike ? (
							<button
								onClick={() => deleteLike()}
								className="flex items-center text-red-500 hover:text-red-600 transition-colors"
								aria-label="Unlike"
							>
								<svg
									className="w-5 h-5 mr-1"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
								</svg>
								<span>Đã thích</span>
							</button>
						) : (
							<button
								onClick={() => createLike()}
								className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
								aria-label="Like"
							>
								<svg
									className="w-5 h-5 mr-1"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
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
						)}

						{/* Share button */}
						<button
							onClick={() => shareMDN()}
							className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
							aria-label="Share"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
								/>
							</svg>
							<span>Chia sẻ</span>
						</button>
					</div>
				</div>

				<p className="flex items-center text-gray-500">
					<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{publishedAt}
				</p>
			</div>

			{/* Nội dung bài viết */}
			<div className="mt-6 sm:mt-8 mb-8 sm:mb-12">
				{content ? <ContentSection contents={content} /> : <span></span>}
			</div>

			{/* Phần bình luận */}
			<CommentSection comments={comments} />
		</div>
	);
};

export default ArticleDetail;
