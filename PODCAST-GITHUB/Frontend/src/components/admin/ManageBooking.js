import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { getBookingDetails, deleteBooking, updateBooking } from '../../actions/bookingActions';
import { DELETE_BOOKING_RESET, UPDATE_BOOKING_RESET } from '../../constants/bookingConstants';

const ManageBooking = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { isDeleted, isUpdated } = useSelector((state) => state.booking);
	const bookingsGoc = useSelector((state) => state.bookings).bookings;

	// States
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [filteredBookings, setFilteredBookings] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// Hàm xử lý dữ liệu từ API
	const boDauDacBiet = (data) => {
		if (!data) return '';
		let result = [];
		let a1 = data.split(',').join('"');
		let a2 = a1.split('[').join('"');
		let a3 = a2.split(']').join('"');
		let a4 = a3.split('\\').join('"');
		let a5 = a4.split('"');
		if (a5.length > 0) {
			for (let index = 0; index < a5.length; index++) {
				const element = a5[index];
				if (element) {
					result.push(element);
				}
			}
		}
		return result.join(', ');
	};

	const setContentsTimes = (data) => {
		if (!data || !Array.isArray(data)) return [];
		let result = [];
		for (let index = 0; index < data.length; index++) {
			const element = data[index];
			let selectedContent = boDauDacBiet(element.selectedContent);
			let selectedTimes = boDauDacBiet(element.selectedTimes);
			result.push({
				...element,
				selectedContent: selectedContent,
				selectedTimes: selectedTimes,
			});
		}
		return result;
	};

	// Fetch dữ liệu từ API
	useEffect(() => {
		const fetchBookings = async () => {
			try {
				setLoading(true);
				dispatch(getBookingDetails('All'));
			} catch (error) {
				alert.error('Không thể tải danh sách đặt lịch');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchBookings();
	}, [dispatch]);

	// Cập nhật bookings khi có dữ liệu từ store
	useEffect(() => {
		if (bookingsGoc && bookingsGoc.length > 0) {
			const processedBookings = setContentsTimes(bookingsGoc);
			setBookings(processedBookings);
			setFilteredBookings(processedBookings);
		} else {
			setBookings([]);
			setFilteredBookings([]);
		}
	}, [bookingsGoc]);

	// Reset sau khi delete hoặc update
	useEffect(() => {
		if (isDeleted) {
			alert.success('Xóa lịch hẹn thành công');
			dispatch({ type: DELETE_BOOKING_RESET });
			dispatch(getBookingDetails('All')); // Reload data
		}

		if (isUpdated) {
			alert.success('Cập nhật trạng thái thành công');
			dispatch({ type: UPDATE_BOOKING_RESET });
			dispatch(getBookingDetails('All')); // Reload data
		}
	}, [dispatch, isDeleted, isUpdated, alert]);

	// Filter bookings
	useEffect(() => {
		filterBookings();
	}, [bookings, searchTerm, statusFilter, dateFilter]);

	const filterBookings = () => {
		let filtered = [...bookings];

		if (searchTerm) {
			filtered = filtered.filter(
				(booking) =>
					booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					booking.phone?.includes(searchTerm) ||
					booking.selectedContent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					booking.otherContent?.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		if (statusFilter) {
			filtered = filtered.filter((booking) => booking.trangThai === statusFilter);
		}

		if (dateFilter) {
			const today = new Date();
			const filterDate = new Date(today);

			switch (dateFilter) {
				case 'today':
					filtered = filtered.filter((booking) => {
						const bookingDate = new Date(booking.selectedDate);
						return bookingDate.toDateString() === today.toDateString();
					});
					break;
				case 'this_week':
					const firstDayOfWeek = new Date(today);
					firstDayOfWeek.setDate(today.getDate() - today.getDay());
					const lastDayOfWeek = new Date(firstDayOfWeek);
					lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

					filtered = filtered.filter((booking) => {
						const bookingDate = new Date(booking.selectedDate);
						return bookingDate >= firstDayOfWeek && bookingDate <= lastDayOfWeek;
					});
					break;
				case 'this_month':
					filtered = filtered.filter((booking) => {
						const bookingDate = new Date(booking.selectedDate);
						return (
							bookingDate.getMonth() === today.getMonth() &&
							bookingDate.getFullYear() === today.getFullYear()
						);
					});
					break;
			}
		}

		setFilteredBookings(filtered);
		setCurrentPage(1);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'approved':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'rejected':
				return 'bg-red-100 text-red-800 border-red-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case 'pending':
				return 'Chờ xử lý';
			case 'approved':
				return 'Đã duyệt';
			case 'rejected':
				return 'Từ chối';
			default:
				return 'Không xác định';
		}
	};

	const formatDate = (dateString) => {
		if (!dateString) return 'Không có';
		const date = new Date(dateString);
		const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
		return `${weekdays[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};

	const formatDateTime = (dateString) => {
		if (!dateString) return 'Không có';
		const date = new Date(dateString);
		return date.toLocaleString('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const updateBookingStatus = async (bookingId, newStatus) => {
		try {
			setLoading(true);
			const bookingToUpdate = bookings.find((b) => b.id === bookingId);
			if (bookingToUpdate) {
				dispatch(
					updateBooking({
						...bookingToUpdate,
						trangThai: newStatus,
					}),
				);
			}
			setIsUpdateModalOpen(false);
		} catch (error) {
			alert.error('Có lỗi xảy ra khi cập nhật');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (bookingId) => {
		try {
			setLoading(true);
			dispatch(deleteBooking(bookingId));
			setIsDeleteModalOpen(false);
		} catch (error) {
			alert.error('Không thể xóa lịch hẹn');
		} finally {
			setLoading(false);
		}
	};

	// Pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

	const clearFilters = () => {
		setSearchTerm('');
		setStatusFilter('');
		setDateFilter('');
	};

	const statsData = {
		total: bookings.length,
		pending: bookings.filter((b) => b.trangThai === 'pending').length,
		approved: bookings.filter((b) => b.trangThai === 'approved').length,
		rejected: bookings.filter((b) => b.trangThai === 'rejected').length,
	};

	return (
		<Fragment>
			<MetaData title="Quản lý lịch hẹn" />

			<div className="flex min-h-screen bg-gray-100">
				<Sidebar />

				{/* Main content */}
				<div className="flex-1 transition-all duration-300 md:ml-20 lg:ml-64">
					<div className="container mx-auto px-4 sm:px-6 py-8">
						{/* Header */}
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-8">
							<h1 className="text-3xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
							<div className="flex space-x-3">
								<button
									onClick={() => dispatch(getBookingDetails('All'))}
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
								<h3 className="text-gray-500 text-sm font-medium">Tổng số lịch hẹn</h3>
								<div className="text-2xl font-bold text-gray-900 mt-2">{statsData.total}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
								<h3 className="text-gray-500 text-sm font-medium">Chờ xử lý</h3>
								<div className="text-2xl font-bold text-yellow-600 mt-2">{statsData.pending}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
								<h3 className="text-gray-500 text-sm font-medium">Đã duyệt</h3>
								<div className="text-2xl font-bold text-green-600 mt-2">{statsData.approved}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
								<h3 className="text-gray-500 text-sm font-medium">Từ chối</h3>
								<div className="text-2xl font-bold text-red-600 mt-2">{statsData.rejected}</div>
							</div>
						</div>

						{/* Filters */}
						<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								{/* Search */}
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
									<input
										type="text"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Tìm theo email, SĐT, nội dung..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								{/* Status Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
									<select
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										value={statusFilter}
										onChange={(e) => setStatusFilter(e.target.value)}
									>
										<option value="">Tất cả trạng thái</option>
										<option value="pending">Chờ xử lý</option>
										<option value="approved">Đã duyệt</option>
										<option value="rejected">Từ chối</option>
									</select>
								</div>

								{/* Date Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
									<select
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										value={dateFilter}
										onChange={(e) => setDateFilter(e.target.value)}
									>
										<option value="">Tất cả thời gian</option>
										<option value="today">Hôm nay</option>
										<option value="this_week">Tuần này</option>
										<option value="this_month">Tháng này</option>
									</select>
								</div>
							</div>

							{/* Clear Filters */}
							{(searchTerm || statusFilter || dateFilter) && (
								<div className="mt-4">
									<button
										onClick={clearFilters}
										className="text-sm text-blue-600 hover:text-blue-800 font-medium"
									>
										Xóa bộ lọc
									</button>
								</div>
							)}
						</div>

						{/* Bookings Table */}
						<div className="bg-white rounded-lg shadow-sm overflow-hidden">
							{loading ? (
								<div className="flex justify-center items-center h-64">
									<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
								</div>
							) : filteredBookings.length === 0 ? (
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
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<h3 className="mt-4 text-lg font-medium text-gray-900">Không có lịch hẹn nào</h3>
									<p className="mt-2 text-sm text-gray-500">
										{searchTerm || statusFilter || dateFilter
											? 'Không tìm thấy lịch hẹn phù hợp với bộ lọc'
											: 'Chưa có lịch hẹn nào được tạo'}
									</p>
								</div>
							) : (
								<>
									<div className="overflow-x-auto">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Ngày đặt
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Thông tin liên hệ
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Nội dung
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Thời gian hẹn
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Trạng thái
													</th>
													<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
														Thao tác
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{currentBookings.map((booking) => (
													<tr key={booking.id} className="hover:bg-gray-50">
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="text-sm font-medium text-gray-900">
																{formatDate(booking.selectedDate)}
															</div>
															<div className="text-xs text-gray-500">
																{formatDateTime(booking.createdAt)}
															</div>
														</td>
														<td className="px-6 py-4">
															<div className="text-sm text-gray-900">
																{booking.email || 'Không có email'}
															</div>
															<div className="text-sm text-gray-500">
																{booking.phone || 'Không có SĐT'}
															</div>
														</td>
														<td className="px-6 py-4">
															<div className="text-sm text-gray-900 max-w-xs truncate">
																{booking.selectedContent || 'Không có nội dung'}
															</div>
															{booking.otherContent && (
																<div className="text-sm text-gray-500 max-w-xs truncate">
																	Khác: {booking.otherContent}
																</div>
															)}
														</td>
														<td className="px-6 py-4">
															<div className="text-sm text-gray-900">
																{booking.selectedTimes || 'Chưa chọn'}
															</div>
															{booking.otherTime && (
																<div className="text-sm text-gray-500">
																	Khác: {booking.otherTime}
																</div>
															)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<span
																className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
																	booking.trangThai,
																)}`}
															>
																{getStatusText(booking.trangThai)}
															</span>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
															<div className="flex justify-center space-x-2">
																<button
																	onClick={() => {
																		setSelectedBooking(booking);
																		setIsDetailModalOpen(true);
																	}}
																	className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-2 rounded-md transition-colors"
																	title="Xem chi tiết"
																>
																	<svg
																		className="w-4 h-4"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																		/>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
																		/>
																	</svg>
																</button>
																<button
																	onClick={() => {
																		setSelectedBooking(booking);
																		setIsUpdateModalOpen(true);
																	}}
																	className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 p-2 rounded-md transition-colors"
																	title="Cập nhật trạng thái"
																>
																	<svg
																		className="w-4 h-4"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
																		/>
																	</svg>
																</button>
																<button
																	onClick={() => {
																		setSelectedBooking(booking);
																		setIsDeleteModalOpen(true);
																	}}
																	className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-md transition-colors"
																	title="Xóa lịch hẹn"
																>
																	<svg
																		className="w-4 h-4"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																		/>
																	</svg>
																</button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Pagination */}
									{totalPages > 1 && (
										<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
											<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
												<div>
													<p className="text-sm text-gray-700">
														Hiển thị{' '}
														<span className="font-medium">{indexOfFirstItem + 1}</span> đến{' '}
														<span className="font-medium">
															{Math.min(indexOfLastItem, filteredBookings.length)}
														</span>{' '}
														trong tổng số{' '}
														<span className="font-medium">{filteredBookings.length}</span>{' '}
														lịch hẹn
													</p>
												</div>
												<div className="flex space-x-2">
													<button
														onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
														disabled={currentPage === 1}
														className={`px-3 py-2 rounded-md text-sm font-medium ${
															currentPage === 1
																? 'text-gray-300 cursor-not-allowed'
																: 'text-gray-700 hover:bg-gray-100'
														}`}
													>
														Trước
													</button>

													{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
														let pageNumber;
														if (totalPages <= 5) {
															pageNumber = i + 1;
														} else if (currentPage <= 3) {
															pageNumber = i + 1;
														} else if (currentPage >= totalPages - 2) {
															pageNumber = totalPages - 4 + i;
														} else {
															pageNumber = currentPage - 2 + i;
														}

														return (
															<button
																key={pageNumber}
																onClick={() => setCurrentPage(pageNumber)}
																className={`px-3 py-2 rounded-md text-sm font-medium ${
																	currentPage === pageNumber
																		? 'bg-blue-600 text-white'
																		: 'text-gray-700 hover:bg-gray-100'
																}`}
															>
																{pageNumber}
															</button>
														);
													})}

													<button
														onClick={() =>
															setCurrentPage(Math.min(totalPages, currentPage + 1))
														}
														disabled={currentPage === totalPages}
														className={`px-3 py-2 rounded-md text-sm font-medium ${
															currentPage === totalPages
																? 'text-gray-300 cursor-not-allowed'
																: 'text-gray-700 hover:bg-gray-100'
														}`}
													>
														Sau
													</button>
												</div>
											</div>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Detail Modal */}
			{isDetailModalOpen && selectedBooking && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="px-6 py-4 border-b border-gray-200">
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-semibold text-gray-900">Chi tiết lịch hẹn</h3>
								<button
									onClick={() => setIsDetailModalOpen(false)}
									className="text-gray-400 hover:text-gray-600"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className="px-6 py-4 space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">Email</label>
									<p className="mt-1 text-sm text-gray-900">{selectedBooking.email || 'Không có'}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
									<p className="mt-1 text-sm text-gray-900">{selectedBooking.phone || 'Không có'}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Ngày hẹn</label>
									<p className="mt-1 text-sm text-gray-900">
										{formatDate(selectedBooking.selectedDate)}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Thời gian hẹn</label>
									<p className="mt-1 text-sm text-gray-900">
										{selectedBooking.selectedTimes || 'Chưa chọn'}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Trạng thái</label>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
											selectedBooking.trangThai,
										)}`}
									>
										{getStatusText(selectedBooking.trangThai)}
									</span>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Ngày tạo</label>
									<p className="mt-1 text-sm text-gray-900">
										{formatDateTime(selectedBooking.createdAt)}
									</p>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">Nội dung đã chọn</label>
								<p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
									{selectedBooking.selectedContent || 'Không có nội dung'}
								</p>
							</div>

							{selectedBooking.otherContent && (
								<div>
									<label className="block text-sm font-medium text-gray-700">Nội dung khác</label>
									<p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
										{selectedBooking.otherContent}
									</p>
								</div>
							)}

							{selectedBooking.otherTime && (
								<div>
									<label className="block text-sm font-medium text-gray-700">Thời gian khác</label>
									<p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
										{selectedBooking.otherTime}
									</p>
								</div>
							)}
						</div>

						<div className="px-6 py-4 border-t border-gray-200 flex justify-end">
							<button
								onClick={() => setIsDetailModalOpen(false)}
								className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium"
							>
								Đóng
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Update Status Modal */}
			{isUpdateModalOpen && selectedBooking && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
						<div className="px-6 py-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900">Cập nhật trạng thái</h3>
						</div>

						<div className="px-6 py-4">
							<p className="text-sm text-gray-600 mb-4">
								Cập nhật trạng thái cho lịch hẹn của email: <strong>{selectedBooking.email}</strong>
							</p>

							<div className="space-y-3">
								{['pending', 'approved', 'rejected'].map((status) => (
									<button
										key={status}
										onClick={() => updateBookingStatus(selectedBooking.id, status)}
										disabled={selectedBooking.trangThai === status || loading}
										className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
											selectedBooking.trangThai === status
												? 'bg-gray-100 border-gray-300 cursor-not-allowed'
												: 'hover:bg-gray-50 border-gray-200'
										}`}
									>
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
												status,
											)}`}
										>
											{getStatusText(status)}
										</span>
										{selectedBooking.trangThai === status && (
											<span className="ml-2 text-xs text-gray-500">(Hiện tại)</span>
										)}
									</button>
								))}
							</div>
						</div>

						<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
							<button
								onClick={() => setIsUpdateModalOpen(false)}
								className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium"
								disabled={loading}
							>
								Hủy
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{isDeleteModalOpen && selectedBooking && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
						<div className="px-6 py-4">
							<div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
								<svg
									className="h-6 w-6 text-red-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>

							<h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-2">
								Xác nhận xóa
							</h3>
							<p className="text-sm text-gray-500 text-center mb-6">
								Bạn có chắc muốn xóa lịch hẹn của email "{selectedBooking.email}"?
								<br />
								Hành động này không thể hoàn tác.
							</p>

							<div className="flex justify-center space-x-4">
								<button
									onClick={() => setIsDeleteModalOpen(false)}
									className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
									disabled={loading}
								>
									Hủy
								</button>
								<button
									onClick={() => handleDelete(selectedBooking.id)}
									className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
									disabled={loading}
								>
									{loading ? 'Đang xóa...' : 'Xóa lịch hẹn'}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default ManageBooking;
