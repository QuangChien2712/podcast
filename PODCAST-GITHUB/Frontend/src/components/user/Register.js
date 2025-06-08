import { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';
import { toast } from 'react-toastify';
import CommitmentTitle from '../content/CommitmentTitle';
// import '../../output.css';

const optionsChooseRole = [
	{ label: 'Chọn chức danh:', value: 'default' },
	{ label: 'Chủ doanh nghiệp', value: 'BusinessOwner' },
	{ label: 'Quản lý', value: 'Manager' },
	{ label: 'Khác', value: 'Other' },
];

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

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, isAuthenticated, error, history, redirect]);

	const [formData, setFormData] = useState({
		gender: '',
		name: '',
		phoneNumber: '',
		email: '',
		password: '',
		confirmPassword: '',
		avatar: '',
		role: '',
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'avatar') {
			const file = files[0];
			if (!file) {
				toast.info('Vui lòng chọn ảnh hợp lệ!');
				return;
			}
			if (!file.type.startsWith('image/')) {
				toast.error('Vui lòng chọn hình ảnh!');
				return;
			}

			const reader = new FileReader();
			reader.onload = () => {
				try {
					if (reader.readyState === 2) {
						setAvatarPreview(reader.result);
						setFormData({ ...formData, avatar: reader.result });
					}
				} catch (error) {
					toast.error('Lỗi khi tải file ảnh!');
					console.error('Lỗi tải file ảnh:', error);
				}
			};

			reader.readAsDataURL(file);
		} else if (name === 'role') {
			setFormData({ ...formData, role: value });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!formData.gender.trim() ||
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.phoneNumber.trim() ||
			!formData.password.trim()
		) {
			toast.info('Vui lòng điền đầy đủ thông tin');
			return;
		}

		if (formData.role === '' || formData.role === 'default') {
			toast.info('Vui lòng chọn chức danh');
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			toast.info('Mật khẩu xác nhận không khớp!');
			return;
		}

		try {
			const result = await dispatch(register(formData));
			history.push('/login');
		} catch (error) {
			toast.error(error.message || 'Đăng ký lỗi, xin vui lòng thử lại!');
			console.error('Lỗi đăng ký:', error);
		}
	};

	return (
		<Fragment>
			<MetaData title={'Đăng ký'} />

			<div className="text-white flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
				{/* Already have an account */}
				<div className="text-sm md:text-base text-center text-gray-600 mt-6 mb-6">
					Bạn đã có tài khoản?{' '}
					<span
						onClick={() => history.push('/login')}
						className="text-orange-600 hover:text-orange-800 font-semibold cursor-pointer"
					>
						Đăng nhập
					</span>
				</div>
				<div className="bg-gradient-to-r from-cusBgForm-from to-cusBgForm-to p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg mb-10 md:mb-16 lg:mb-20">
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
						Đăng Ký Thành Viên
					</h2>

					<form className="space-y-4 md:space-y-5">
						{/* Gender Field */}
						<div>
							<label
								htmlFor="gender"
								className="block text-sm md:text-base font-medium text-gray-700 mb-1"
							>
								Danh xưng
							</label>
							<input
								type="text"
								id="gender"
								name="gender"
								className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								placeholder="Anh/chị"
								value={formData.gender}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Name Field */}
						<div>
							<label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
								Họ và tên
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								placeholder="Họ và tên"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Role Field */}
						<div>
							<label htmlFor="role" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
								Chức danh
							</label>
							<select
								id="role"
								name="role"
								className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow text-white w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								value={formData.role}
								onChange={handleChange}
								required
							>
								{optionsChooseRole.map((item) => (
									<option className="cursor-pointer" key={item.value} value={item.value}>
										{item.label}
									</option>
								))}
							</select>
						</div>

						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm md:text-base font-medium text-gray-700 mb-1"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								placeholder="example@gmail.com"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						{/* PhoneNumber Field */}
						<div>
							<label
								htmlFor="phoneNumber"
								className="block text-sm md:text-base font-medium text-gray-700 mb-1"
							>
								Số điện thoại
							</label>
							<input
								type="tel"
								id="phoneNumber"
								name="phoneNumber"
								pattern="^[0-9]{10}$"
								className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								placeholder="0xxxxxxxxx"
								value={formData.phoneNumber}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Image field */}
						<div className="pt-2">
							<label
								htmlFor="customFile"
								className="block text-sm md:text-base font-medium text-gray-700 mb-2"
							>
								Ảnh đại diện
							</label>
							<div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
								{/* Avatar preview */}
								<div className="flex-shrink-0">
									<div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border border-gray-300 bg-gray-50">
										<img
											src={avatarPreview}
											className="object-cover w-full h-full"
											alt="Ảnh đại diện"
										/>
									</div>
								</div>

								{/* File input */}
								<div className="w-full">
									<input
										type="file"
										name="avatar"
										className="block w-full text-sm md:text-base text-gray-700 file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-medium
                    file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
										id="customFile"
										accept="image/*"
										onChange={handleChange}
									/>
									<p className="mt-1 text-xs md:text-sm text-gray-500">
										JPG, PNG hoặc GIF. Kích thước tối đa 1MB.
									</p>
								</div>
							</div>
						</div>

						{/* Password Fields */}
						<div className="space-y-4">
							<div>
								<label
									htmlFor="password"
									className="block text-sm md:text-base font-medium text-gray-700 mb-1"
								>
									Mật khẩu
								</label>
								<input
									type="password"
									id="password"
									name="password"
									className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
									placeholder="Nhập mật khẩu"
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</div>

							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm md:text-base font-medium text-gray-700 mb-1"
								>
									Xác nhận mật khẩu
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
									placeholder="Nhập lại mật khẩu"
									value={formData.confirmPassword}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						{/* Submit Button */}
						<div className="pt-2">
							<button
								type="button"
								onClick={handleSubmit}
								disabled={loading}
								className={`text-white bg-gray-700 hover:bg-gray-800 w-full font-medium py-2.5 md:py-3 px-4 rounded-md shadow-sm transition duration-200 ${
									loading
										? 'bg-gray-400 cursor-not-allowed'
										: 'text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
								}`}
							>
								{loading ? 'Đang xử lý...' : 'Đăng ký'}
							</button>
						</div>
					</form>
				</div>

				<CommitmentTitle />
			</div>
		</Fragment>
	);
};

export default Register;
