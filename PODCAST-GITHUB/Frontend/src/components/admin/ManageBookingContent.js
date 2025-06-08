import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import {
	newDiscussionContent,
	getAdminDiscussionContents,
	updateDiscussionContent,
	deleteDiscussionContent,
	newDiscussionTime,
	getAdminDiscussionTimes,
	updateDiscussionTime,
	deleteDiscussionTime,
} from '../../actions/bookingActions';

import {
	ADMIN_DISCUSSIONCONTENTS_SUCCESS,
	NEW_DISCUSSIONCONTENT_SUCCESS,
	UPDATE_DISCUSSIONCONTENT_SUCCESS,
	DELETE_DISCUSSIONCONTENT_SUCCESS,
	NEW_DISCUSSIONCONTENT_RESET,
	UPDATE_DISCUSSIONCONTENT_RESET,
	DELETE_DISCUSSIONCONTENT_RESET,
	ADMIN_DISCUSSIONTIMES_SUCCESS,
	NEW_DISCUSSIONTIME_SUCCESS,
	UPDATE_DISCUSSIONTIME_SUCCESS,
	DELETE_DISCUSSIONTIME_SUCCESS,
	NEW_DISCUSSIONTIME_RESET,
	UPDATE_DISCUSSIONTIME_RESET,
	DELETE_DISCUSSIONTIME_RESET,
} from '../../constants/bookingConstants';

import { useCallback, memo } from 'react';
import ManageBookingContentItem from './ManageBookingContentItem';
import ManageBookingTimeItem from './ManageBookingTimeItem';

// Memoize để tối ưu hiệu suất
const ContentItem = memo(ManageBookingContentItem);
const TimeItem = memo(ManageBookingTimeItem);

// Component chính
const ManageBookingContent = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const { error, success } = useSelector((state) => state.newDiscussionContent);
	const { discussioncontents } = useSelector((state) => state.discussioncontents);
	const { isUpdated, isDeleted } = useSelector((state) => state.discussioncontent);

	const { errorT, successT } = useSelector((state) => state.newDiscussionTime);
	const { discussiontimes } = useSelector((state) => state.discussiontimes);
	const { isUpdatedT, isDeletedT } = useSelector((state) => state.discussiontime);

	const [contents, setContents] = useState([]);
	const [times, setTimes] = useState([]);
	const [newContent, setNewContent] = useState('');
	const [newTime, setNewTime] = useState('');
	const [editingContent, setEditingContent] = useState(null);
	const [editingTime, setEditingTime] = useState(null);
	const [loading, setLoading] = useState(false);

	// State để theo dõi mục đang được xử lý
	const [processingItems, setProcessingItems] = useState({
		contents: new Set(),
		times: new Set(),
	});

	// State cho modal xác nhận
	const [confirmDelete, setConfirmDelete] = useState({
		show: false,
		id: null,
		type: null, // 'content' hoặc 'time'
	});

	useEffect(() => {
		dispatch(getAdminDiscussionContents());
		dispatch(getAdminDiscussionTimes());
	}, []);

	useEffect(() => {
		dispatch(getAdminDiscussionContents());
		dispatch({ type: NEW_DISCUSSIONCONTENT_RESET });
		dispatch({ type: UPDATE_DISCUSSIONCONTENT_RESET });
		dispatch({ type: DELETE_DISCUSSIONCONTENT_RESET });
	}, [success, isUpdated, isDeleted]);

	useEffect(() => {
		setContents(discussioncontents);
	}, [discussioncontents]);

	useEffect(() => {
		dispatch(getAdminDiscussionTimes());
		dispatch({ type: NEW_DISCUSSIONTIME_RESET });
		dispatch({ type: UPDATE_DISCUSSIONTIME_RESET });
		dispatch({ type: DELETE_DISCUSSIONTIME_RESET });
	}, [successT, isUpdatedT, isDeletedT]);

	useEffect(() => {
		setTimes(discussiontimes);
	}, [discussiontimes]);

	// Content handlers
	const handleAddContent = async () => {
		if (!newContent.trim()) {
			toast.error('Vui lòng nhập nội dung');
			return;
		}

		try {
			setLoading(true);
			const newContentItem = {
				noiDungThaoLuan: newContent,
				trangThai: 'Hiện',
			};

			dispatch(newDiscussionContent(newContentItem));
			dispatch({ type: NEW_DISCUSSIONCONTENT_SUCCESS });

			setNewContent('');
			toast.success('Thêm nội dung thành công');
		} catch (error) {
			console.error('Error adding content:', error);
			toast.error('Không thể thêm nội dung');
		} finally {
			setLoading(false);
		}
	};

	const handleToggleContent = useCallback(
		async (id) => {
			try {
				setProcessingItems((prev) => ({
					...prev,
					contents: new Set([...prev.contents, id]),
				}));

				const contentToToggle = contents.find((item) => item.id === id);
				const contentupdate = {
					...contentToToggle,
					trangThai: contentToToggle.trangThai === 'Hiện' ? 'Ẩn' : 'Hiện',
				};

				dispatch(updateDiscussionContent(contentupdate));
				dispatch({ type: UPDATE_DISCUSSIONCONTENT_SUCCESS });

				toast.success('Cập nhật trạng thái thành công');
			} catch (error) {
				console.error('Error toggling content:', error);
				toast.error('Không thể cập nhật trạng thái');
			} finally {
				setProcessingItems((prev) => {
					const updatedContents = new Set(prev.contents);
					updatedContents.delete(id);
					return { ...prev, contents: updatedContents };
				});
			}
		},
		[contents],
	);

	const handleUpdateContent = async (id) => {
		if (!editingContent.noiDungThaoLuan.trim()) {
			toast.error('Vui lòng nhập nội dung');
			return;
		}

		try {
			setLoading(true);
			const contentupdate = {
				id: editingContent.id,
				noiDungThaoLuan: editingContent.noiDungThaoLuan,
				trangThai: editingContent.trangThai,
			};

			dispatch(updateDiscussionContent(contentupdate));
			dispatch({ type: UPDATE_DISCUSSIONCONTENT_SUCCESS });

			setEditingContent(null);
			toast.success('Cập nhật thành công');
		} catch (error) {
			console.error('Error updating content:', error);
			toast.error('Không thể cập nhật');
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteContent = (id) => {
		setConfirmDelete({ show: true, id, type: 'content' });
	};

	const handleDeleteContentConfirmed = async (id) => {
		try {
			setLoading(true);

			dispatch(deleteDiscussionContent(id));
			dispatch({ type: DELETE_DISCUSSIONCONTENT_SUCCESS });

			toast.success('Xóa thành công');
		} catch (error) {
			console.error('Error deleting content:', error);
			toast.error('Không thể xóa');
		} finally {
			setLoading(false);
		}
	};

	// Tương tự cho các hàm xử lý Time
	const handleAddTime = async () => {
		if (!newTime.trim()) {
			toast.error('Vui lòng nhập thời gian');
			return;
		}

		try {
			setLoading(true);

			const newTimeItem = {
				thoiGianThaoLuan: newTime,
				trangThai: 'Hiện',
			};

			dispatch(newDiscussionTime(newTimeItem));
			dispatch({ type: NEW_DISCUSSIONTIME_SUCCESS });

			setNewTime('');
			toast.success('Thêm thời gian thành công');
		} catch (error) {
			console.error('Error adding time:', error);
			toast.error('Không thể thêm thời gian');
		} finally {
			setLoading(false);
		}
	};

	const handleToggleTime = useCallback(
		async (id) => {
			try {
				setProcessingItems((prev) => ({
					...prev,
					times: new Set([...prev.times, id]),
				}));

				const timeToToggle = times.find((item) => item.id === id);

				const timeupdate = { ...timeToToggle, trangThai: timeToToggle.trangThai === 'Hiện' ? 'Ẩn' : 'Hiện' };

				dispatch(updateDiscussionTime(timeupdate));
				dispatch({ type: UPDATE_DISCUSSIONTIME_SUCCESS });

				toast.success('Cập nhật trạng thái thành công');
			} catch (error) {
				console.error('Error toggling time:', error);
				toast.error('Không thể cập nhật trạng thái');
			} finally {
				setProcessingItems((prev) => {
					const updatedTimes = new Set(prev.times);
					updatedTimes.delete(id);
					return { ...prev, times: updatedTimes };
				});
			}
		},
		[times],
	);

	const handleDeleteTime = (id) => {
		setConfirmDelete({ show: true, id, type: 'time' });
	};

	const handleDeleteTimeConfirmed = async (id) => {
		try {
			setLoading(true);

			dispatch(deleteDiscussionTime(id));
			dispatch({ type: DELETE_DISCUSSIONTIME_SUCCESS });

			toast.success('Xóa thành công');
		} catch (error) {
			console.error('Error deleting time:', error);
			toast.error('Không thể xóa');
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateTime = async (id) => {
		if (!editingTime.thoiGianThaoLuan.trim()) {
			toast.error('Vui lòng nhập thời gian');
			return;
		}

		try {
			setLoading(true);

			const timeupdate = {
				id: editingTime.id,
				thoiGianThaoLuan: editingTime.thoiGianThaoLuan,
				trangThai: editingTime.trangThai,
			};

			dispatch(updateDiscussionTime(timeupdate));
			dispatch({ type: UPDATE_DISCUSSIONTIME_SUCCESS });

			setEditingTime(null);
			toast.success('Cập nhật thành công');
		} catch (error) {
			console.error('Error updating time:', error);
			toast.error('Không thể cập nhật');
		} finally {
			setLoading(false);
		}
	};

	// Stats data
	const statsData = {
		totalContents: contents?.length || 0,
		activeContents: contents?.filter((c) => c.trangThai === 'Hiện')?.length || 0,
		totalTimes: times?.length || 0,
		activeTimes: times?.filter((t) => t.trangThai === 'Hiện')?.length || 0,
	};

	// Component xác nhận xóa
	const ConfirmDeleteModal = () => (
		<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
				<div className="px-6 py-4">
					<div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
						<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>

					<h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-2">Xác nhận xóa</h3>
					<p className="text-sm text-gray-500 text-center mb-6">
						Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.
					</p>

					<div className="flex justify-center space-x-4">
						<button
							onClick={() => setConfirmDelete({ show: false, id: null, type: null })}
							className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
						>
							Hủy
						</button>
						<button
							onClick={() => {
								if (confirmDelete.type === 'content') {
									handleDeleteContentConfirmed(confirmDelete.id);
								} else {
									handleDeleteTimeConfirmed(confirmDelete.id);
								}
								setConfirmDelete({ show: false, id: null, type: null });
							}}
							className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
						>
							Xóa
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Fragment>
			<MetaData title="Quản lý nội dung đặt lịch" />

			{confirmDelete.show && <ConfirmDeleteModal />}

			<div className="flex min-h-screen bg-gray-100">
				<Sidebar />

				{/* Main content */}
				<div className="flex-1 transition-all duration-300 md:ml-20 lg:ml-64">
					<div className="container mx-auto px-4 sm:px-6 py-8">
						{/* Header */}
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-8">
							<h1 className="text-3xl font-bold text-gray-900">Quản lý nội dung đặt lịch</h1>
							<div className="flex space-x-3">
								<button
									onClick={() => {
										dispatch(getAdminDiscussionContents());
										dispatch(getAdminDiscussionTimes());
									}}
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center"
									disabled={loading}
								>
									<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									Làm mới
								</button>
							</div>
						</div>

						{/* Stats Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
								<h3 className="text-gray-500 text-sm font-medium">Tổng nội dung</h3>
								<div className="text-2xl font-bold text-gray-900 mt-2">{statsData.totalContents}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
								<h3 className="text-gray-500 text-sm font-medium">Nội dung hiển thị</h3>
								<div className="text-2xl font-bold text-green-600 mt-2">{statsData.activeContents}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
								<h3 className="text-gray-500 text-sm font-medium">Tổng thời gian</h3>
								<div className="text-2xl font-bold text-gray-900 mt-2">{statsData.totalTimes}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
								<h3 className="text-gray-500 text-sm font-medium">Thời gian hiển thị</h3>
								<div className="text-2xl font-bold text-yellow-600 mt-2">{statsData.activeTimes}</div>
							</div>
						</div>

						{/* Quản lý Content */}
						<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-6">Nội dung thảo luận</h2>

							{/* Form thêm mới */}
							<div className="flex flex-col sm:flex-row gap-3 mb-6">
								<input
									type="text"
									value={newContent}
									onChange={(e) => setNewContent(e.target.value)}
									placeholder="Nhập nội dung mới"
									className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									onKeyPress={(e) => e.key === 'Enter' && handleAddContent()}
								/>
								<button
									onClick={handleAddContent}
									disabled={loading}
									className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
										loading
											? 'bg-gray-400 cursor-not-allowed text-white'
											: 'bg-green-600 text-white hover:bg-green-700'
									}`}
								>
									{loading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
											Đang xử lý...
										</>
									) : (
										<>
											<svg
												className="w-4 h-4 mr-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
											Thêm
										</>
									)}
								</button>
							</div>

							{/* Danh sách content */}
							{loading && contents && contents.length === 0 ? (
								<div className="text-center py-12">
									<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
									<p className="text-gray-500">Đang tải dữ liệu...</p>
								</div>
							) : contents && contents.length === 0 ? (
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
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									<h3 className="mt-4 text-lg font-medium text-gray-900">Chưa có nội dung nào</h3>
									<p className="mt-2 text-sm text-gray-500">
										Hãy thêm nội dung đầu tiên cho danh sách thảo luận
									</p>
								</div>
							) : (
								<div className="space-y-3">
									{contents &&
										contents.length > 0 &&
										contents.map((item, index) => (
											<ContentItem
												key={index}
												item={item}
												isEditing={editingContent?.id === item.id}
												editingValue={editingContent?.noiDungThaoLuan}
												onEditChange={(e) =>
													setEditingContent({
														...editingContent,
														noiDungThaoLuan: e.target.value,
													})
												}
												onToggle={handleToggleContent}
												onEdit={() =>
													setEditingContent({
														id: item.id,
														noiDungThaoLuan: item.noiDungThaoLuan,
													})
												}
												onUpdate={() => handleUpdateContent(item.id)}
												onCancelEdit={() => setEditingContent(null)}
												onDelete={handleDeleteContent}
												isProcessing={processingItems.contents.has(item.id)}
											/>
										))}
								</div>
							)}
						</div>

						{/* Quản lý Time */}
						<div className="bg-white rounded-lg shadow-sm p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-6">Thời gian thảo luận</h2>

							{/* Form thêm mới */}
							<div className="flex flex-col sm:flex-row gap-3 mb-6">
								<input
									type="text"
									value={newTime}
									onChange={(e) => setNewTime(e.target.value)}
									placeholder="Nhập thời gian mới (VD: 14:00 - 16:00)"
									className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									onKeyPress={(e) => e.key === 'Enter' && handleAddTime()}
								/>
								<button
									onClick={handleAddTime}
									disabled={loading}
									className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
										loading
											? 'bg-gray-400 cursor-not-allowed text-white'
											: 'bg-green-600 text-white hover:bg-green-700'
									}`}
								>
									{loading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
											Đang xử lý...
										</>
									) : (
										<>
											<svg
												className="w-4 h-4 mr-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
											Thêm
										</>
									)}
								</button>
							</div>

							{/* Danh sách time */}
							{loading && times && times.length === 0 ? (
								<div className="text-center py-12">
									<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
									<p className="text-gray-500">Đang tải dữ liệu...</p>
								</div>
							) : times && times.length === 0 ? (
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
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<h3 className="mt-4 text-lg font-medium text-gray-900">Chưa có thời gian nào</h3>
									<p className="mt-2 text-sm text-gray-500">
										Hãy thêm khung thời gian đầu tiên cho danh sách
									</p>
								</div>
							) : (
								<div className="space-y-3">
									{times &&
										times.length > 0 &&
										times.map((item, index) => (
											<TimeItem
												key={index}
												item={item}
												isEditing={editingTime?.id === item.id}
												editingValue={editingTime?.thoiGianThaoLuan}
												onEditChange={(e) =>
													setEditingTime({
														...editingTime,
														thoiGianThaoLuan: e.target.value,
													})
												}
												onToggle={handleToggleTime}
												onEdit={() =>
													setEditingTime({
														id: item.id,
														thoiGianThaoLuan: item.thoiGianThaoLuan,
													})
												}
												onUpdate={() => handleUpdateTime(item.id)}
												onCancelEdit={() => setEditingTime(null)}
												onDelete={handleDeleteTime}
												isProcessing={processingItems.times.has(item.id)}
											/>
										))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ManageBookingContent;
