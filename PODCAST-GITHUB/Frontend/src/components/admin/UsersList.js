// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAlert } from 'react-alert';
// import { useDispatch, useSelector } from 'react-redux';
// import { allUsers, clearErrors, deleteUser } from '../../actions/userActions';
// import { DELETE_USER_RESET } from '../../constants/userConstants';
// import MetaData from '../layout/MetaData';
// import Loader from '../layout/Loader';
// import Sidebar from './Sidebar';

// const UsersList = ({ history }) => {
// 	const alert = useAlert();
// 	const dispatch = useDispatch();

// 	const { loading, error, users } = useSelector((state) => state.allUsers);
// 	const { isDeleted } = useSelector((state) => state.user);
// 	const [selectedUser, setSelectedUser] = useState(null);

// 	const reLoad = ()=>{
//         window.location.reload();
//      }

// 	useEffect(() => {
// 		dispatch(allUsers());
// 	}, [dispatch]);

// 	useEffect(() => {
// 		if (error) {
// 			alert.error(error);
// 			dispatch(clearErrors());
// 		}

// 		if (isDeleted) {
// 			alert.success('Đã xóa tài khoản');
// 			history.push('/admin/users');
// 			dispatch({ type: DELETE_USER_RESET });
// 		}
// 	}, [dispatch, alert, error, isDeleted, history]);

// 	const deleteUserHandler = () => {
// 		if (selectedUser) {
// 			dispatch(deleteUser(selectedUser));
// 			setTimeout(reLoad, 1000);
// 		}
// 	};

// 	return (
// 		<>
// 			<MetaData title="Tất cả người dùng" />

// 			<div className="flex">
// 				<div className="w-64 fixed left-0 top-0 h-screen bg-gray-800 shadow-lg">
// 					<Sidebar />
// 				</div>
// 				{/* Nội dung chính */}
// 				<div className="flex-1 p-6" style={{ marginLeft: '300px' }}>
// 					<h1 className="text-2xl font-bold text-gray-700 mb-4">Tất cả người dùng</h1>

// 					{loading ? (
// 						<Loader />
// 					) : (
// 						<div className="bg-white shadow-md rounded-lg overflow-hidden">
// 							<table className="min-w-full table-auto">
// 								<thead>
// 									<tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
// 										<th className="py-3 px-6">ID</th>
// 										<th className="py-3 px-6">Họ và tên</th>
// 										<th className="py-3 px-6">Email</th>
// 										<th className="py-3 px-6">Quyền</th>
// 										<th className="py-3 px-6">SĐT</th>
// 										<th className="py-3 px-6">Đã đặt lịch</th>
// 										<th className="py-3 px-6 text-center">Hành động</th>
// 									</tr>
// 								</thead>
// 								<tbody className="text-gray-700 text-sm">
// 									{users.map((user) => (
// 										<tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
// 											<td className="py-3 px-6">{user.id}</td>
// 											<td className="py-3 px-6">{user.name}</td>
// 											<td className="py-3 px-6">{user.email}</td>
// 											<td className="py-3 px-6">{user.typeRole}</td>
// 											<td className="py-3 px-6">{user.phoneNumber}</td>
// 											<td className="py-3 px-6">{user.isSchedule ? '✔️' : '❌'}</td>
// 											<td className="py-3 px-6 text-center">
// 												<Link
// 													to={`/admin/user/${user.id}`}
// 													className="text-blue-500 hover:underline mr-4"
// 												>
// 													✏️ Sửa
// 												</Link>
// 												<button
// 													onClick={() => setSelectedUser(user.id)}
// 													className="text-red-500 hover:underline"
// 												>
// 													🗑️ Xóa
// 												</button>
// 											</td>
// 										</tr>
// 									))}
// 								</tbody>
// 							</table>
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* Modal Xóa */}
// 			{selectedUser && (
// 				<div
// 					className="fixed flex items-center justify-center bg-black bg-opacity-50"
// 					style={{
// 						position: 'absolute',
// 						top: '50%',
// 						left: '50%',
// 						transform: 'translate(-50%, -50%)',
// 					}}
// 				>
// 					<div className="bg-white p-6 rounded-lg shadow-lg">
// 						<h2 className="text-xl font-bold text-gray-800 mb-4">Xóa người dùng</h2>
// 						<p className="text-gray-600 mb-6">Bạn có chắc muốn xóa người dùng này không?</p>
// 						<div className="flex justify-end">
// 							<button
// 								onClick={() => setSelectedUser(null)}
// 								className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
// 							>
// 								Hủy
// 							</button>
// 							<button
// 								onClick={deleteUserHandler}
// 								className="px-4 py-2 text-white rounded-md "
// 								style={{ backgroundColor: 'blue' }}
// 							>
// 								Xóa
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default UsersList;

import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const UsersList = ({ history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, users } = useSelector((state) => state.allUsers);
	const { isDeleted } = useSelector((state) => state.user);

	// States for filtering and pagination
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [roleFilter, setRoleFilter] = useState('');
	const [scheduleFilter, setScheduleFilter] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	useEffect(() => {
		dispatch(allUsers());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success('Đã xóa tài khoản');
			dispatch(allUsers()); // Reload users instead of page reload
			dispatch({ type: DELETE_USER_RESET });
		}
	}, [dispatch, alert, error, isDeleted]);

	const deleteUserHandler = () => {
		if (selectedUser) {
			dispatch(deleteUser(selectedUser));
			setSelectedUser(null);
		}
	};

	// Filter and search logic
	const filteredUsers =
		users?.filter((user) => {
			const matchesSearch =
				user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.phoneNumber?.includes(searchTerm);

			const matchesRole = roleFilter === '' || user.typeRole === roleFilter;
			const matchesSchedule =
				scheduleFilter === '' ||
				(scheduleFilter === 'true' && user.isSchedule) ||
				(scheduleFilter === 'false' && !user.isSchedule);

			return matchesSearch && matchesRole && matchesSchedule;
		}) || [];

	// Pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

	// Get role color
	const getRoleColor = (role) => {
		switch (role) {
			case 'admin':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'user':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const clearFilters = () => {
		setSearchTerm('');
		setRoleFilter('');
		setScheduleFilter('');
		setCurrentPage(1);
	};

	// Stats data
	const statsData = {
		total: users?.length || 0,
		admins: users?.filter((u) => u.typeRole === 'admin')?.length || 0,
		users: users?.filter((u) => u.typeRole === 'user')?.length || 0,
		scheduled: users?.filter((u) => u.isSchedule)?.length || 0,
	};

	return (
		<Fragment>
			<MetaData title="Quản lý người dùng" />

			<div className="flex min-h-screen bg-gray-100">
				<Sidebar />

				{/* Main content */}
				<div className="flex-1 transition-all duration-300 md:ml-20 lg:ml-64">
					<div className="container mx-auto px-4 sm:px-6 py-8">
						{/* Header */}
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-8">
							<h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
							<div className="flex space-x-3">
								<button
									onClick={() => dispatch(allUsers())}
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
								<h3 className="text-gray-500 text-sm font-medium">Tổng người dùng</h3>
								<div className="text-2xl font-bold text-gray-900 mt-2">{statsData.total}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
								<h3 className="text-gray-500 text-sm font-medium">Quản trị viên</h3>
								<div className="text-2xl font-bold text-red-600 mt-2">{statsData.admins}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
								<h3 className="text-gray-500 text-sm font-medium">Người dùng</h3>
								<div className="text-2xl font-bold text-green-600 mt-2">{statsData.users}</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
								<h3 className="text-gray-500 text-sm font-medium">Đã đặt lịch</h3>
								<div className="text-2xl font-bold text-purple-600 mt-2">{statsData.scheduled}</div>
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
										placeholder="Tìm theo tên, email, SĐT..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								{/* Role Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Quyền</label>
									<select
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										value={roleFilter}
										onChange={(e) => setRoleFilter(e.target.value)}
									>
										<option value="">Tất cả quyền</option>
										<option value="admin">Quản trị viên</option>
										<option value="user">Người dùng</option>
									</select>
								</div>

								{/* Schedule Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Đặt lịch</label>
									<select
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										value={scheduleFilter}
										onChange={(e) => setScheduleFilter(e.target.value)}
									>
										<option value="">Tất cả</option>
										<option value="true">Đã đặt lịch</option>
										<option value="false">Chưa đặt lịch</option>
									</select>
								</div>
							</div>

							{/* Clear Filters */}
							{(searchTerm || roleFilter || scheduleFilter) && (
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

						{/* Users Table */}
						<div className="bg-white rounded-lg shadow-sm overflow-hidden">
							{loading ? (
								<div className="flex justify-center items-center h-64">
									<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
								</div>
							) : filteredUsers.length === 0 ? (
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
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<h3 className="mt-4 text-lg font-medium text-gray-900">
										Không tìm thấy người dùng
									</h3>
									<p className="mt-2 text-sm text-gray-500">
										{searchTerm || roleFilter || scheduleFilter
											? 'Không có người dùng nào phù hợp với bộ lọc'
											: 'Chưa có người dùng nào trong hệ thống'}
									</p>
								</div>
							) : (
								<>
									<div className="overflow-x-auto">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														ID
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Thông tin
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Liên hệ
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Quyền
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
												{currentUsers.map((user) => (
													<tr key={user.id} className="hover:bg-gray-50">
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="text-sm font-medium text-gray-900">
																#{user.id}
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="flex items-center">
																<div className="flex-shrink-0 h-10 w-10">
																	<div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
																		<span className="text-sm font-medium text-gray-700">
																			{user.name?.charAt(0)?.toUpperCase() || 'U'}
																		</span>
																	</div>
																</div>
																<div className="ml-4">
																	<div className="text-sm font-medium text-gray-900">
																		{user.name || 'Không có tên'}
																	</div>
																	<div className="text-sm text-gray-500">
																		{user.email || 'Không có email'}
																	</div>
																</div>
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="text-sm text-gray-900">
																{user.phoneNumber || 'Chưa có SĐT'}
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<span
																className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(
																	user.typeRole,
																)}`}
															>
																{user.typeRole === 'admin'
																	? 'Quản trị viên'
																	: 'Người dùng'}
															</span>
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="flex items-center">
																{user.isSchedule ? (
																	<div className="flex items-center text-green-600">
																		<svg
																			className="w-4 h-4 mr-1"
																			fill="currentColor"
																			viewBox="0 0 20 20"
																		>
																			<path
																				fillRule="evenodd"
																				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																				clipRule="evenodd"
																			/>
																		</svg>
																		<span className="text-sm">Đã đặt lịch</span>
																	</div>
																) : (
																	<div className="flex items-center text-gray-400">
																		<svg
																			className="w-4 h-4 mr-1"
																			fill="currentColor"
																			viewBox="0 0 20 20"
																		>
																			<path
																				fillRule="evenodd"
																				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																				clipRule="evenodd"
																			/>
																		</svg>
																		<span className="text-sm">Chưa đặt lịch</span>
																	</div>
																)}
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
															<div className="flex justify-center space-x-2">
																<Link
																	to={`/admin/user/${user.id}`}
																	className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-2 rounded-md transition-colors"
																	title="Chỉnh sửa"
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
																</Link>
																<button
																	onClick={() => setSelectedUser(user.id)}
																	className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-md transition-colors"
																	title="Xóa"
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
															{Math.min(indexOfLastItem, filteredUsers.length)}
														</span>{' '}
														trong tổng số{' '}
														<span className="font-medium">{filteredUsers.length}</span>{' '}
														người dùng
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

			{/* Delete Confirmation Modal */}
			{selectedUser && (
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
								Bạn có chắc muốn xóa người dùng này không?
								<br />
								Hành động này không thể hoàn tác.
							</p>

							<div className="flex justify-center space-x-4">
								<button
									onClick={() => setSelectedUser(null)}
									className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
								>
									Hủy
								</button>
								<button
									onClick={deleteUserHandler}
									className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
								>
									Xóa người dùng
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default UsersList;
