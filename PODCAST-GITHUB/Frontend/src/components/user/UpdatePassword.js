import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = ({ history }) => {
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, isUpdated, loading } = useSelector((state) => state.user);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Mật khẩu đã được cập nhật');
			history.goBack();

			dispatch({
				type: UPDATE_PASSWORD_RESET,
			});
		}
	}, [dispatch, alert, error, history, isUpdated]);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('oldPassword', oldPassword);
		formData.set('password', password);
		dispatch(updatePassword(formData));
	};

	return (
		<Fragment>
			<MetaData title={'Thay đổi mật khẩu'} />

			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
					<h2 className="text-2xl font-semibold text-center text-gray-700 mb-6 uppercase">
						Thay đổi mật khẩu
					</h2>
					<form onSubmit={submitHandler} className="space-y-4">
						<div>
							<label htmlFor="old_password_field" className="block text-gray-700 font-medium mb-1">
								Mật khẩu cũ
							</label>
							<input
								type="password"
								id="old_password_field"
								className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								required
							/>
						</div>

						<div>
							<label htmlFor="new_password_field" className="block text-gray-700 font-medium mb-1">
								Mật khẩu mới
							</label>
							<input
								type="password"
								id="new_password_field"
								className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
							disabled={loading}
						>
							{loading ? 'Đang xử lý...' : 'Xác nhận'}
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdatePassword;
