import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const UsersList = ({ history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, users } = useSelector((state) => state.allUsers);
	const { isDeleted } = useSelector((state) => state.user);
	const [selectedUser, setSelectedUser] = useState(null);

	const reLoad = ()=>{
        window.location.reload();
     }

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
			history.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}
	}, [dispatch, alert, error, isDeleted, history]);

	const deleteUserHandler = () => {
		if (selectedUser) {
			dispatch(deleteUser(selectedUser));
			setTimeout(reLoad, 1000);
		}
	};

	return (
		<>
			<MetaData title="Tất cả người dùng" />

			<div className="flex">
				<div className="w-64 fixed left-0 top-0 h-screen bg-gray-800 shadow-lg">
					<Sidebar />
				</div>
				{/* Nội dung chính */}
				<div className="flex-1 p-6" style={{ marginLeft: '300px' }}>
					<h1 className="text-2xl font-bold text-gray-700 mb-4">Tất cả người dùng</h1>

					{loading ? (
						<Loader />
					) : (
						<div className="bg-white shadow-md rounded-lg overflow-hidden">
							<table className="min-w-full table-auto">
								<thead>
									<tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
										<th className="py-3 px-6">ID</th>
										<th className="py-3 px-6">Họ và tên</th>
										<th className="py-3 px-6">Email</th>
										<th className="py-3 px-6">Quyền</th>
										<th className="py-3 px-6">SĐT</th>
										<th className="py-3 px-6">Đã đặt lịch</th>
										<th className="py-3 px-6 text-center">Hành động</th>
									</tr>
								</thead>
								<tbody className="text-gray-700 text-sm">
									{users.map((user) => (
										<tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
											<td className="py-3 px-6">{user.id}</td>
											<td className="py-3 px-6">{user.name}</td>
											<td className="py-3 px-6">{user.email}</td>
											<td className="py-3 px-6">{user.typeRole}</td>
											<td className="py-3 px-6">{user.phoneNumber}</td>
											<td className="py-3 px-6">{user.isSchedule ? '✔️' : '❌'}</td>
											<td className="py-3 px-6 text-center">
												<Link
													to={`/admin/user/${user.id}`}
													className="text-blue-500 hover:underline mr-4"
												>
													✏️ Sửa
												</Link>
												<button
													onClick={() => setSelectedUser(user.id)}
													className="text-red-500 hover:underline"
												>
													🗑️ Xóa
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{/* Modal Xóa */}
			{selectedUser && (
				<div
					className="fixed flex items-center justify-center bg-black bg-opacity-50"
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-bold text-gray-800 mb-4">Xóa người dùng</h2>
						<p className="text-gray-600 mb-6">Bạn có chắc muốn xóa người dùng này không?</p>
						<div className="flex justify-end">
							<button
								onClick={() => setSelectedUser(null)}
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
							>
								Hủy
							</button>
							<button
								onClick={deleteUserHandler}
								className="px-4 py-2 text-white rounded-md "
								style={{ backgroundColor: 'blue' }}
							>
								Xóa
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UsersList;
