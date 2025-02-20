import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';

const Login = ({ history, location }) => {
	// const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

	// const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

	useEffect(() => {
		if (isAuthenticated) {
			history.goBack();
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, isAuthenticated, error, history]);

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(login(email, password));
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);

		// Handle login logic here
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={'Đăng nhập'} />

					{/* <div className="row wrapper">
						<div className="col-10 col-lg-5">
							<form className="shadow-lg" onSubmit={submitHandler}>
								<h1 className="mb-3"></h1>
								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="email"
										id="email_field"
										className="form-control"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password_field">Mật khẩu</label>
									<input
										type="password"
										id="password_field"
										className="form-control"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								<button id="login_button" type="submit" className="btn btn-block py-3">
									ĐĂNG NHẬP
								</button>

								<Link to="/register" className="float-right mt-3">
									Đăng ký
								</Link>
							</form>
						</div>
					</div> */}
					<div className="min-h-screen flex items-center justify-center bg-gray-100">
						<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
							<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đăng nhập</h2>
							<form onSubmit={handleSubmit}>
								{/* Email Field */}
								<div className="mb-4">
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
										Email
									</label>
									<input
										type="email"
										id="email"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
										placeholder="you@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								{/* Password Field */}
								<div className="mb-6">
									<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
										Mật Khẩu
									</label>
									<input
										type="password"
										id="password"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
										placeholder="Nhập mật khẩu"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
								>
									Đăng nhập
								</button>
								{/* Already have an account */}
								<div className="text-sm text-center text-gray-600 mt-4">
									Bạn chưa có tài khoản?{' '}
									<a href="/dang-ky-thanh-vien" className="text-blue-500 hover:underline">
										Đăng ký
									</a>
								</div>
							</form>

							{/* Divider */}
							<div className="flex items-center justify-center my-4">
								<span className="h-px bg-gray-300 flex-1"></span>
								<span className="px-2 text-sm text-gray-500">Hoặc đăng nhập</span>
								<span className="h-px bg-gray-300 flex-1"></span>
							</div>

							{/* Social Login */}
							<div className="flex justify-center space-x-4">
								<button
									className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 flex items-center space-x-2"
									onClick={() => console.log('Login with Google')}
								>
									<img
										src="https://www.svgrepo.com/show/355037/google.svg"
										alt="Google"
										className="w-5 h-5"
									/>
									<span>Google</span>
								</button>
								<button
									className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 flex items-center space-x-2"
									onClick={() => console.log('Login with Facebook')}
								>
									<img
										src="https://www.svgrepo.com/show/157810/facebook.svg"
										alt="Facebook"
										className="w-5 h-5"
									/>
									<span>Facebook</span>
								</button>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Login;
