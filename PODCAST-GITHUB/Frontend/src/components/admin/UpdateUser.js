import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { useHistory, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const UpdateUser = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [typeRole, setTypeRole] = useState('');
	const [id, setId] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();
	const history = useHistory();
	const { id: userId } = useParams();

	const { error, isUpdated } = useSelector((state) => state.user);
	const { user } = useSelector((state) => state.userDetails);

	useEffect(() => {
		if (user && String(user.id) !== userId) {
			dispatch(getUserDetails(userId));
		} else if (user) {
			setEmail(user.email || '');
			setName(user.name || '');
			setTypeRole(user.typeRole || '');
			setId(user.id || '');
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Cập nhật người dùng thành công');
			history.push('/admin/users');
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, alert, error, history, isUpdated, userId, user]);


	const reLoad = ()=>{
        window.location.reload();
     }
	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('name', name);
		formData.set('email', email);
		formData.set('typeRole', typeRole);
		formData.set('id', id);

		dispatch(updateUser(formData));
		setTimeout(reLoad, 1000);
	};

	return (
		<>
			<MetaData title="Cập nhật người dùng" />
			<div className="flex">
				{/* Sidebar */}
				<div className="w-64 fixed left-0 top-0 h-screen bg-gray-800 shadow-lg">
					<Sidebar />
				</div>

				{/* Nội dung chính */}
				<div className="flex-1 ml-64 flex justify-center items-center min-h-screen">
					<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
						<h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Cập nhật người dùng</h1>
						<form onSubmit={submitHandler} className="space-y-4">
							{/* Họ và tên */}
							<div>
								<label htmlFor="name_field" className="block text-gray-700 font-medium">
									Họ và tên
								</label>
								<input
									type="text"
									id="name_field"
									className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>

							{/* Email */}
							<div>
								<label htmlFor="email_field" className="block text-gray-700 font-medium">
									Email
								</label>
								<input
									type="email"
									id="email_field"
									className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							{/* Quyền */}
							<div>
								<label htmlFor="typeRole_field" className="block text-gray-700 font-medium">
									Quyền
								</label>
								<select
									id="typeRole_field"
									className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
									value={typeRole}
									onChange={(e) => setTypeRole(e.target.value)}
									required
								>
									<option value="K">Người dùng</option>
									<option value="O">Chủ doanh nghiệp</option>
									<option value="A">Quản trị viên</option>
									<option value="Block">Khóa tài khoản</option>
								</select>
							</div>

							{/* Nút cập nhật */}
							<button
								type="submit"
								className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
							>
								Cập nhật
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateUser;
