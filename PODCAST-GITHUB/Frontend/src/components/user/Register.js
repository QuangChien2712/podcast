import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';
import store from '../../store';
import { loadUser } from '../../actions/userActions';

const Register = ({ history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
	const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
	const redirect = isAuthenticated ? '/' : window.location.pathname;

	useEffect(() => {
		if (isAuthenticated) {
			history.goBack();
		}
		// history.push(redirect);

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, isAuthenticated, error, history, redirect]);

	// Albert
	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		email: '',
		password: '',
		confirmPassword: '',
		avatar: '',
	});

	const handleChange = (e) => {
		if (e.target.name === 'avatar') {
			const file = e.target.files[0];
			if (!file) {
				alert.error('Vui lòng chọn ảnh hợp lệ!');
				return;
			}

			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setFormData({ ...formData, avatar: reader.result });
				}
			};
			reader.readAsDataURL(file);
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			alert.error('Tên không được để trống!');
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			alert.error('Mật khẩu xác nhận không khớp!');
			return;
		}

		// console.log('Form Data:', formData);
		const { name, phoneNumber, email, password, avatar } = formData;
		const registrationData = { name, phoneNumber, email, password, avatar };
		dispatch(register(registrationData));
	};

	return (
		<Fragment>
			<MetaData title={'Đăng ký'} />

			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mt-32 mb-20">
					<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h2>
					<form onSubmit={handleSubmit}>
						{/* Name Field */}
						<div className="mb-4">
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
								Họ và tên
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder="Nhập họ và tên"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Email Field */}
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder="you@example.com"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						{/* PhoneNumber Field */}
						<div className="mb-4">
							<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
								Số điện thoại
							</label>
							<input
								type="tel"
								id="phoneNumber"
								name="phoneNumber"
								pattern="^[0-9]{10}$"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder="Nhập số điện thoại"
								value={formData.phoneNumber}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Image field */}
						<div className="mb-6">
							<label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-700 mb-2">
								Hình nền
							</label>
							<div className="flex flex-col sm:flex-row items-center sm:space-x-4">
								{/* Vùng hiển thị ảnh */}
								<div className="flex-shrink-0">
									<figure className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-gray-300">
										<img src={avatarPreview} className="object-cover w-full h-full" alt="Ảnh nền" />
									</figure>
								</div>

								{/* Input chọn ảnh */}
								<div className="mt-4 sm:mt-0 w-full">
									<input
										type="file"
										name="avatar"
										className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										id="customFile"
										accept="image/*"
										onChange={handleChange}
									/>
									<label htmlFor="customFile" className="block text-sm text-gray-500 mt-1">
										Chọn ảnh
									</label>
								</div>
							</div>
						</div>

						{/* Password Field */}
						<div className="mb-4">
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
								Mật khẩu
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder="Nhập mật khẩu"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Confirm Password Field */}
						<div className="mb-6">
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
								Xác nhận mật khẩu
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder="Nhập lại mật khẩu"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
						>
							Đăng ký
						</button>
					</form>

					{/* Already have an account */}
					<div className="text-sm text-center text-gray-600 mt-4">
						Bạn đã có tài khoản?{' '}
						<a href="/login" className="text-blue-500 hover:underline">
							Đăng nhập
						</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
