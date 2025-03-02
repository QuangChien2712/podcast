// import React, { Fragment, useState, useEffect } from 'react';

// import MetaData from '../layout/MetaData';

// import { useAlert } from 'react-alert';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateProfile, loadUser, clearErrors } from '../../actions/userActions';
// import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

// const UpdateProfile = ({ history }) => {
// 	const [name, setName] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [avatar, setAvatar] = useState('');
// 	const [avatarPreview, setAvatarPreview] = useState('');

// 	const alert = useAlert();
// 	const dispatch = useDispatch();
// 	const { user } = useSelector((state) => state.auth);
// 	const { error, isUpdated, loading } = useSelector((state) => state.user);

// 	useEffect(() => {
// 		if (user) {
// 			setName(user.name);
// 			setEmail(user.email);
// 			setDescription(user.description || '');
// 			setAvatarPreview(user.avatar.split('CHIEN') ? user.avatar.split('CHIEN')[1] : '');
// 		}

// 		if (error) {
// 			alert.error(error);
// 			dispatch(clearErrors());
// 		}

// 		if (isUpdated) {
// 			alert.success('Thông tin đã được cập nhật');
// 			history.goBack();
// 			dispatch(loadUser());

// 			dispatch({
// 				type: UPDATE_PROFILE_RESET,
// 			});
// 		}
// 	}, [dispatch, alert, error, history, isUpdated, user]);

// 	const submitHandler = (e) => {
// 		e.preventDefault();
// 		if (!avatar) {
// 			alert.error('Hãy chọn ảnh đại diện!');
// 			return;
// 		}

// 		const formData = new FormData();
// 		formData.set('name', name);
// 		formData.set('email', email);
// 		formData.set('description', description);
// 		formData.set('avatar', avatar);
// 		formData.set('id', user.id);

// 		dispatch(updateProfile(formData));
// 	};

// 	const onChange = (e) => {
// 		const reader = new FileReader();
// 		reader.onload = () => {
// 			if (reader.readyState === 2) {
// 				setAvatarPreview(reader.result);
// 				setAvatar(reader.result);
// 			}
// 		};
// 		reader.readAsDataURL(e.target.files[0]);
// 	};

// 	return (
// 		// <Fragment>
// 		// 	<MetaData title={'Sửa thông tin cá nhân'} />

// 		// 	<div className="row wrapper">
// 		// 		<div className="col-10 col-lg-5">
// 		// 			<form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
// 		// 				<h1 className="mt-2 mb-5">Sửa thông tin cá nhân</h1>

// 		// 				<div className="form-group">
// 		// 					<label htmlFor="email_field">Họ và tên</label>
// 		// 					<input
// 		// 						type="name"
// 		// 						id="name_field"
// 		// 						className="form-control"
// 		// 						name="name"
// 		// 						value={name}
// 		// 						onChange={(e) => setName(e.target.value)}
// 		// 					/>
// 		// 				</div>

// 		// 				<div className="form-group">
// 		// 					<label htmlFor="email_field">Email</label>
// 		// 					<input
// 		// 						type="email"
// 		// 						id="email_field"
// 		// 						className="form-control"
// 		// 						name="email"
// 		// 						value={email}
// 		// 						onChange={(e) => setEmail(e.target.value)}
// 		// 					/>
// 		// 				</div>

// 		// 				<div className="form-group">
// 		// 					<label htmlFor="avatar_upload">Ảnh đại diện</label>
// 		// 					<div className="d-flex align-items-center">
// 		// 						<div>
// 		// 							<figure className="avatar mr-3 item-rtl">
// 		// 								<img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
// 		// 							</figure>
// 		// 						</div>
// 		// 						<div className="custom-file">
// 		// 							<input
// 		// 								type="file"
// 		// 								name="avatar"
// 		// 								className="custom-file-input"
// 		// 								id="customFile"
// 		// 								accept="image/*"
// 		// 								onChange={onChange}
// 		// 							/>
// 		// 							<label className="custom-file-label" htmlFor="customFile">
// 		// 								Chọn ảnh
// 		// 							</label>
// 		// 						</div>
// 		// 					</div>
// 		// 				</div>

// 		// 				<button
// 		// 					type="submit"
// 		// 					className="btn update-btn btn-block mt-4 mb-3"
// 		// 					disabled={loading ? true : false}
// 		// 				>
// 		// 					Xác nhận
// 		// 				</button>

// 		// 				<div style={{ height: '100px' }}></div>
// 		// 			</form>
// 		// 		</div>
// 		// 	</div>
// 		// </Fragment>
// 		<Fragment>
// 			<MetaData title={'Sửa thông tin cá nhân'} />

// 			<div className="min-h-screen flex items-center justify-center bg-gray-100">
// 				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
// 					<h2 className="text-2xl font-semibold text-center text-gray-700 mb-6 uppercase">
// 						Sửa thông tin cá nhân
// 					</h2>
// 					<form onSubmit={submitHandler} className="space-y-4" encType="multipart/form-data">
// 						{/* Họ và tên */}
// 						<div>
// 							<label htmlFor="name_field" className="block text-gray-700 font-medium mb-1">
// 								Họ và tên
// 							</label>
// 							<input
// 								type="text"
// 								id="name_field"
// 								className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
// 								value={name}
// 								onChange={(e) => setName(e.target.value)}
// 								required
// 							/>
// 						</div>

// 						{/* Email */}
// 						<div>
// 							<label htmlFor="email_field" className="block text-gray-700 font-medium mb-1">
// 								Email
// 							</label>
// 							<input
// 								type="email"
// 								id="email_field"
// 								className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
// 								value={email}
// 								onChange={(e) => setEmail(e.target.value)}
// 								required
// 							/>
// 						</div>

// 						{/* Mô tả bản thân */}
// 						<div>
// 							<label htmlFor="description_field" className="block text-gray-700 font-medium">
// 								Mô tả bản thân
// 							</label>
// 							<textarea
// 								id="description_field"
// 								className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
// 								name="description"
// 								rows="3"
// 								value={description}
// 								onChange={(e) => setDescription(e.target.value)}
// 							/>
// 						</div>

// 						{/* Ảnh đại diện */}
// 						<div>
// 							<label className="block text-gray-700 font-medium mb-1">Ảnh đại diện</label>
// 							<div className="flex items-center gap-4">
// 								<figure className="w-20 h-20 rounded-full overflow-hidden border">
// 									<img
// 										src={avatarPreview}
// 										className="w-full h-full object-cover"
// 										alt="Avatar Preview"
// 									/>
// 								</figure>
// 								<input
// 									type="file"
// 									name="avatar"
// 									className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
// 									accept="image/*"
// 									onChange={onChange}
// 								/>
// 							</div>
// 						</div>

// 						{/* Button Xác nhận */}
// 						<button
// 							type="submit"
// 							className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
// 							disabled={loading}
// 						>
// 							{loading ? 'Đang xử lý...' : 'Xác nhận'}
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</Fragment>
// 	);
// };

// export default UpdateProfile;

import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

// Component Upload Ảnh
const AvatarUpload = ({ avatarPreview, onChange }) => (
	<div className="flex items-center space-x-4">
		<div className="w-20 h-20 overflow-hidden rounded-full border">
			<img src={avatarPreview} className="w-full h-full object-cover" alt="Avatar Preview" />
		</div>
		<input
			type="file"
			name="avatar"
			className="p-2 border border-gray-300 rounded-md"
			accept="image/*"
			onChange={onChange}
		/>
	</div>
);

const UpdateProfile = ({ history }) => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		description: '',
		avatar: '',
	});
	const [avatarPreview, setAvatarPreview] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { error, isUpdated, loading } = useSelector((state) => state.user);

	const reLoad = ()=>{
        window.location.reload();
     }

	useEffect(() => {
		if (user) {
			setForm({
				name: user.name || '',
				email: user.email || '',
				description: user.description || '',
				avatar: '',
			});
			setAvatarPreview(user.avatar.split('CHIEN') ? user.avatar.split('CHIEN')[1] : '');
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Thông tin đã được cập nhật');
			history.goBack();
			dispatch(loadUser());

			dispatch({ type: UPDATE_PROFILE_RESET });
			setTimeout(reLoad, 1000);
		}
	}, [dispatch, alert, error, history, isUpdated, user]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleAvatarChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setForm({ ...form, avatar: reader.result });
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!form.avatar) {
			alert.error('Chọn ảnh đại diện mới!');
			return;
		}
		const formData = new FormData();
		Object.keys(form).forEach((key) => formData.append(key, form[key]));
		formData.append('id', user.id);

		dispatch(updateProfile(formData));
	};

	return (
		<>
			<MetaData title="Sửa thông tin cá nhân" />

			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
					<h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Sửa thông tin cá nhân</h1>

					<form className="space-y-4" onSubmit={submitHandler} encType="multipart/form-data">
						{['name', 'email', 'description'].map((field) => (
							<div key={field}>
								<label htmlFor={`${field}_field`} className="block text-gray-700 font-medium">
									{field === 'name' ? 'Họ và tên' : field === 'email' ? 'Email' : 'Mô tả bản thân'}
								</label>
								{field === 'description' ? (
									<textarea
										id={`${field}_field`}
										name={field}
										rows="3"
										className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
										value={form[field]}
										onChange={handleChange}
									/>
								) : (
									<input
										type={field === 'email' ? 'email' : 'text'}
										id={`${field}_field`}
										name={field}
										className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
										value={form[field]}
										onChange={handleChange}
									/>
								)}
							</div>
						))}

						<label className="block text-gray-700 font-medium">Ảnh đại diện</label>
						<AvatarUpload avatarPreview={avatarPreview} onChange={handleAvatarChange} />

						<button
							type="submit"
							className="w-full text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
							disabled={loading}
							style={{ backgroundColor: '#4f46e5' }}
						>
							{loading ? 'Đang cập nhật...' : 'Xác nhận'}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateProfile;
