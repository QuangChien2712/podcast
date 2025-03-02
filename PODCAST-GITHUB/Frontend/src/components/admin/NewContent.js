import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newContent, clearErrors } from '../../actions/contentActions';
import { NEW_CONTENT_RESET } from '../../constants/contentConstants';

const NewContent = ({ history }) => {
	const [typeRole, setTypeRole] = useState('');
	const [chuDe, setChuDe] = useState('');
	const [noiDung, setNoiDung] = useState('');
	const [tenBaiViet, setTenBaiViet] = useState('');
	const [moTaNgan, setMoTaNgan] = useState('');
	const [audio, setAudio] = useState('');
	const [thuTuHienThi, setThuTuHienThi] = useState('');

	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const typeRoles = [
		{
			label: '--- Chọn danh mục ---',
			value: 'Chọn',
		},
		{
			label: 'Phát triển sự nghiệp',
			value: 'HM1',
		},
		{
			label: 'Cân bằng cuộc sống',
			value: 'HM2',
		},
	];

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, success } = useSelector((state) => state.newContent);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			history.push('/admin/contents');
			// history.push('/admin/content');
			alert.success('Đã thêm bài viết');
			dispatch({ type: NEW_CONTENT_RESET });
		}
	}, [dispatch, alert, error, success, history]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.set('typeRole', typeRole);
		formData.set('tenBaiViet', tenBaiViet);
		formData.set('chuDe', chuDe);
		formData.set('moTaNgan', moTaNgan);
		formData.set('noiDung', noiDung);
		formData.set('audio', audio);
		formData.set('thuTuHienThi', thuTuHienThi);
		formData.set('images', images.join('CHIEN'));

		// images.forEach(image => {
		//     formData.append('images', image)
		// })

		dispatch(newContent(formData));
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	return (
		<Fragment>
			<MetaData title={'Thêm bài viết mới'} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					{/* <Fragment>
                        <div className="wrapper my-2">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                                <h1 className="mb-4">Thêm bài viết mới</h1>

                                <div className="form-group">
                                <label htmlFor="typeRole">Danh mục bài viết</label>
                                <select className="form-control" id="typeRole" value={typeRole} onChange={(e) => setTypeRole(e.target.value)}>
                                    {typeRoles.map(typeRole => (
                                        <option key={typeRole.value} value={typeRole.value} >{typeRole.label}</option>
                                    ))}

                                </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tenBaiViet">Tên bài viết</label>
                                    <input
                                        type="text"
                                        id="tenBaiViet"
                                        className="form-control"
                                        value={tenBaiViet}
                                        onChange={(e) => setTenBaiViet(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="chuDe">Chủ đề</label>
                                    <input
                                        type="text"
                                        id="chuDe"
                                        className="form-control"
                                        value={chuDe}
                                        onChange={(e) => setChuDe(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="moTaNgan">Mô tả ngắn</label>
                                    <textarea className="form-control" id="moTaNgan" rows="3" value={moTaNgan} onChange={(e) => setMoTaNgan(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="noiDung">Nội dung</label>
                                    <textarea className="form-control" id="noiDung" rows="8" value={noiDung} onChange={(e) => setNoiDung(e.target.value)}></textarea>
                                </div>

                               
                                <div className="form-group">
                                    <label htmlFor="audio">Audio</label>
                                    <input
                                        type="text"
                                        id="audio"
                                        className="form-control"
                                        value={audio}
                                        onChange={(e) => setAudio(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="thuTuHienThi">Thứ tự hiển thị</label>
                                    <input
                                        type="text"
                                        id="thuTuHienThi"
                                        className="form-control"
                                        value={thuTuHienThi}
                                        onChange={(e) => setThuTuHienThi(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Hình ảnh</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='content_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Chọn hình
                                        </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    
                                >
                                    Thêm mới
                                </button>

                            </form>
                        </div>
                    </Fragment> */}
					<div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-6">
						<h1 className="text-2xl font-bold mb-4 text-center">Thêm bài viết mới</h1>

						<form onSubmit={submitHandler} encType="application/json" className="space-y-4">
							{/* Danh mục bài viết */}
							<div>
								<label htmlFor="typeRole" className="block font-medium mb-1">
									Danh mục bài viết
								</label>
								<select
									id="typeRole"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={typeRole}
									onChange={(e) => setTypeRole(e.target.value)}
								>
									{typeRoles.map((role) => (
										<option key={role.value} value={role.value}>
											{role.label}
										</option>
									))}
								</select>
							</div>

							{/* Tên bài viết */}
							<div>
								<label htmlFor="tenBaiViet" className="block font-medium mb-1">
									Tên bài viết
								</label>
								<input
									type="text"
									id="tenBaiViet"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={tenBaiViet}
									onChange={(e) => setTenBaiViet(e.target.value)}
								/>
							</div>

							{/* Chủ đề */}
							<div>
								<label htmlFor="chuDe" className="block font-medium mb-1">
									Chủ đề
								</label>
								<input
									type="text"
									id="chuDe"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={chuDe}
									onChange={(e) => setChuDe(e.target.value)}
								/>
							</div>

							{/* Mô tả ngắn */}
							<div>
								<label htmlFor="moTaNgan" className="block font-medium mb-1">
									Mô tả ngắn
								</label>
								<textarea
									id="moTaNgan"
									rows="3"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={moTaNgan}
									onChange={(e) => setMoTaNgan(e.target.value)}
								></textarea>
							</div>

							{/* Nội dung */}
							<div>
								<label htmlFor="noiDung" className="block font-medium mb-1">
									Nội dung
								</label>
								<textarea
									id="noiDung"
									rows="8"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={noiDung}
									onChange={(e) => setNoiDung(e.target.value)}
								></textarea>
							</div>

							{/* Audio */}
							<div>
								<label htmlFor="audio" className="block font-medium mb-1">
									Audio
								</label>
								<input
									type="text"
									id="audio"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={audio}
									onChange={(e) => setAudio(e.target.value)}
								/>
							</div>

							{/* Thứ tự hiển thị */}
							<div>
								<label htmlFor="thuTuHienThi" className="block font-medium mb-1">
									Thứ tự hiển thị
								</label>
								<input
									type="text"
									id="thuTuHienThi"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									value={thuTuHienThi}
									onChange={(e) => setThuTuHienThi(e.target.value)}
								/>
							</div>

							{/* Upload hình ảnh */}
							<div>
								<label className="block font-medium mb-1">Hình ảnh</label>
								<input
									type="file"
									name="content_images"
									className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
									onChange={onChange}
									multiple
								/>

								{/* Hiển thị ảnh preview */}
								<div className="flex mt-3 space-x-2">
									{imagesPreview.map((img) => (
										<img
											key={img}
											src={img}
											alt="Preview"
											className="w-16 h-16 object-cover rounded-md shadow"
										/>
									))}
								</div>
							</div>

							{/* Button Submit */}
							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
								style={{ backgroundColor: '#2563eb' }}
							>
								Thêm mới
							</button>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default NewContent;
