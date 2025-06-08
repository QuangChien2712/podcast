import { Fragment, useState, useEffect } from 'react';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';
import { toast } from 'react-toastify';

const Login = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/me');
		}

		if (error) {
			toast.error('Mật khẩu sai');
			dispatch(clearErrors());
		}
	}, [dispatch, alert, isAuthenticated, error, history]);

	const handleSubmit = (e) => {
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

					<div className="text-white flex items-center justify-center px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
						<div className="bg-gradient-to-r from-cusBgForm-from to-cusBgForm-to p-6 md:p-8 lg:p-10 rounded-lg shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-10 md:mb-16 lg:mb-20 mt-4 md:mt-8 lg:mt-10">
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 lg:mb-8 text-center">
								Đăng Nhập
							</h2>

							<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
								{/* Email Field */}
								<div>
									<label
										htmlFor="email"
										className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
										placeholder="you@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								{/* Password Field */}
								<div>
									<label
										htmlFor="password"
										className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2"
									>
										Mật Khẩu
									</label>
									<input
										type="password"
										id="password"
										className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
										placeholder="Nhập mật khẩu"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>

								{/* Submit Button */}
								<div className="pt-2 md:pt-4">
									<button
										type="submit"
										className="w-full text-white bg-gray-700 hover:bg-gray-800 py-2 md:py-2.5 lg:py-3 px-4 rounded-lg transition duration-200 font-medium"
									>
										Đăng nhập
									</button>
								</div>

								<div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 mt-2 md:mt-3">
									<div className="text-xs md:text-sm text-center md:text-left text-gray-600">
										<span
											onClick={() => history.push('/password/forgot')}
											className="text-gray-600 hover:text-orange-800 cursor-pointer font-medium"
										>
											Quên mật khẩu?
										</span>
									</div>
									<div className="text-xs md:text-sm text-center md:text-right text-gray-600">
										Bạn chưa có tài khoản?{' '}
										<span
											onClick={() => history.push('/register')}
											className="text-orange-600 hover:text-orange-800 cursor-pointer font-medium"
										>
											Đăng ký
										</span>
									</div>
								</div>
							</form>

							{/* Divider */}
							<div className="flex items-center justify-center my-4 md:my-6 lg:my-8">
								<span className="h-px bg-gray-300 flex-1"></span>
								<span className="px-2 text-xs md:text-sm text-gray-500">Hoặc đăng nhập với</span>
								<span className="h-px bg-gray-300 flex-1"></span>
							</div>

							{/* Social Login */}
							<div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
								<button
									className="bg-gray-100 hover:bg-gray-200 px-4 py-2 md:py-2.5 rounded-lg text-gray-700 flex items-center justify-center space-x-2 transition duration-200 w-full md:w-auto"
									onClick={() => toast.info('Tính năng đang cập nhật')}
								>
									<img
										src="https://www.svgrepo.com/show/355037/google.svg"
										alt="Google"
										className="w-4 h-4 md:w-5 md:h-5"
									/>
									<span className="text-sm md:text-base">Google</span>
								</button>
								<button
									className="bg-gray-100 hover:bg-gray-200 px-4 py-2 md:py-2.5 rounded-lg text-gray-700 flex items-center justify-center space-x-2 transition duration-200 w-full md:w-auto"
									onClick={() => toast.info('Tính năng đang cập nhật')}
								>
									<img
										src="https://www.svgrepo.com/show/157810/facebook.svg"
										alt="Facebook"
										className="w-4 h-4 md:w-5 md:h-5"
									/>
									<span className="text-sm md:text-base">Facebook</span>
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
