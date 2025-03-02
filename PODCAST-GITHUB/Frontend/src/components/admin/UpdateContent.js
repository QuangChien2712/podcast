import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getContentDetails, updateContent, clearErrors } from '../../actions/contentActions';
import { UPDATE_CONTENT_RESET } from '../../constants/contentConstants';

const UpdateContent = ({ match, history }) => {
	const contentId = match.params.id;

	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, content } = useSelector((state) => state.contentDetails);

	const { error: updateError, isUpdated } = useSelector((state) => state.content);

	const [typeRole, setTypeRole] = useState('');
	const [chuDe, setChuDe] = useState('');
	const [noiDung, setNoiDung] = useState('');
	const [tenBaiViet, setTenBaiViet] = useState('');
	const [moTaNgan, setMoTaNgan] = useState('');
	const [audio, setAudio] = useState('');
	const [thuTuHienThi, setThuTuHienThi] = useState('');

	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
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

	const reLoad = ()=>{
        window.location.reload();
     }

	useEffect(() => {
		if (content && !content.id) {
			dispatch(getContentDetails(contentId));
		}

		if (content && content.id && String(content.id) !== contentId) {
			dispatch(getContentDetails(contentId));
		}

		if (content && content.id && String(content.id) === contentId) {
			setTypeRole(content.typeRole);
			setTenBaiViet(content.tenBaiViet);
			setChuDe(content.chuDe);
			setMoTaNgan(content.moTaNgan);
			setNoiDung(content.noiDung);
			setAudio(content.audio);
			setThuTuHienThi(content.thuTuHienThi);

			let arrL = content.hinhAnh;

			let arrLinkImages = arrL.split('CHIEN');
			let arrUrlImages = [];
			for (let index = 0; index < arrLinkImages.length; index++) {
				const element = arrLinkImages[index];
				if (index % 2 === 1) {
					arrUrlImages.push(element);
				}
			}

			setOldImages(arrUrlImages);
			setImages(arrUrlImages);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {			
			alert.success('Cập nhật bài viết thành công');
			history.push('/admin/contents');
			dispatch({ type: UPDATE_CONTENT_RESET });
			// window.location.reload();
			setTimeout(reLoad, 1000);
		}
	}, [dispatch, alert, error, updateError, isUpdated, contentId, content, history]);

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
		formData.set('id', content.id);

		// images.forEach(image => {
		//     formData.append('images', image)
		// })
		dispatch(updateContent(formData));
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);
		setOldImages([]);

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
			<MetaData title="Cập nhật nội dung" />
			<div className="flex flex-col md:flex-row" style={{ marginLeft: '250px' }}>
				<Sidebar />

				<div className="w-full md:w-3/4 mx-auto p-6">
					<div className="bg-white shadow-md rounded-lg p-6">
						<h1 className="text-2xl font-bold text-gray-800 mb-6">Cập nhật nội dung</h1>

						<form onSubmit={submitHandler} encType="multipart/form-data">
							{/* Danh mục bài viết */}
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Danh mục bài viết</label>
								<select
									className="w-full p-3 border rounded-md"
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
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Tên bài viết</label>
								<input
									type="text"
									className="w-full p-3 border rounded-md"
									value={tenBaiViet}
									onChange={(e) => setTenBaiViet(e.target.value)}
								/>
							</div>

							{/* Chủ đề */}
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Chủ đề</label>
								<input
									type="text"
									className="w-full p-3 border rounded-md"
									value={chuDe}
									onChange={(e) => setChuDe(e.target.value)}
								/>
							</div>

							{/* Mô tả ngắn */}
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Mô tả ngắn</label>
								<textarea
									className="w-full p-3 border rounded-md"
									rows="3"
									value={moTaNgan}
									onChange={(e) => setMoTaNgan(e.target.value)}
								></textarea>
							</div>

							{/* Nội dung */}
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Nội dung</label>
								<textarea
									className="w-full p-3 border rounded-md"
									rows="8"
									value={noiDung}
									onChange={(e) => setNoiDung(e.target.value)}
								></textarea>
							</div>

							{/* Audio */}
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Audio</label>
								<input
									type="text"
									className="w-full p-3 border rounded-md"
									value={audio}
									onChange={(e) => setAudio(e.target.value)}
								/>
							</div>

							{/* Thứ tự hiển thị */}
							<div className="mb-4">
								<label className="block text-gray-700 font-semibold mb-2">Thứ tự hiển thị</label>
								<input
									type="text"
									className="w-full p-3 border rounded-md"
									value={thuTuHienThi}
									onChange={(e) => setThuTuHienThi(e.target.value)}
								/>
							</div>

							{/* Upload hình ảnh */}
							<div className="mb-6">
								<label className="block text-gray-700 font-semibold mb-2">Ảnh bài viết</label>
								<input
									type="file"
									name="content_images"
									className="w-full p-2 border rounded-md"
									onChange={onChange}
									multiple
								/>
								<div className="mt-3 flex gap-3 flex-wrap">
									{oldImages &&
										oldImages.map((img) => (
											<img
												key={img}
												src={img}
												alt="Ảnh cũ"
												className="w-16 h-16 object-cover rounded-md shadow"
											/>
										))}
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

							{/* Nút cập nhật */}
							<button
								type="submit"
								className={`w-full py-3 px-4 uppercase rounded-md text-white font-semibold ${
									loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
								}`}
								disabled={loading}
								style={{ backgroundColor: '#2563eb' }}
							>
								Cập nhật
							</button>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateContent;
