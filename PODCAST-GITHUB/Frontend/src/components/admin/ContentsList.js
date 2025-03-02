// import React, { Fragment, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { MDBDataTable } from 'mdbreact'

// import MetaData from '../layout/MetaData'
// import Loader from '../layout/Loader'
// import Sidebar from './Sidebar'

// import { useAlert } from 'react-alert'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAdminContents, deleteContent, clearErrors } from '../../actions/contentActions'
// import { DELETE_CONTENT_RESET } from '../../constants/contentConstants'

// const ContentsList = ({ history }) => {

//     const alert = useAlert();
//     const dispatch = useDispatch();

//     const { loading, error, contents } = useSelector(state => state.contents);
//     const { error: deleteError, isDeleted } = useSelector(state => state.content)
//     const [idDelete, setIdDelete] = useState("")

//     useEffect(() => {
//     dispatch(getAdminContents());
//     }, [])

//     useEffect(() => {

//         if (error) {
//             alert.error(error);
//             dispatch(clearErrors())
//         }

//         if (deleteError) {
//             alert.error(deleteError);
//             dispatch(clearErrors())
//         }

//         if (isDeleted) {
//             alert.success('Đã xóa bài viết');
//             history.push('/admin/contents');
//             dispatch({ type: DELETE_CONTENT_RESET })

//         }

//     }, [dispatch, alert, error, deleteError, isDeleted, history])

//     const handleIdDelete = (id) => {
//         setIdDelete(id);
//      }

//      const reLoad = ()=>{
//         window.location.reload();
//      }

//      const deleteContentHandler = (id) => {
//         dispatch(deleteContent(id));
//         setTimeout(reLoad, 50);
//     }

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { getAdminContents, deleteContent, clearErrors } from '../../actions/contentActions';
import { DELETE_CONTENT_RESET, UPDATE_CONTENT_RESET } from '../../constants/contentConstants';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useAlert } from 'react-alert'

const ContentsList = ({ history }) => {
	const dispatch = useDispatch();
	const { contents } = useSelector((state) => state.contents);
	const [filter, setFilter] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [sortField, setSortField] = useState('id');
	const [idDelete, setIdDelete] = useState(null);

	const alert = useAlert();
    const { loading, error} = useSelector(state => state.contents);
    const { error: deleteError, isDeleted } = useSelector(state => state.content);

	useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Đã xóa bài viết');
            history.push('/admin/contents');
            dispatch({ type: DELETE_CONTENT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

	useEffect(() => {
		dispatch(getAdminContents());
	}, [dispatch]);

	const handleDelete = (id) => {
		setIdDelete(id);
	};

	const reLoad = ()=>{
        window.location.reload();
     }

	// ContentsList.js
	const filteredContents = contents
		?.filter(
			(content) =>
				!filter ||
				content.typeRole.includes(filter) ||
				content.tenBaiViet.toLowerCase().includes(filter.toLowerCase()) ||
				content.moTaNgan.toLowerCase().includes(filter.toLowerCase()) ||
				content.noiDung.toLowerCase().includes(filter.toLowerCase()),
		)
		.sort((a, b) => (sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField]));

	const confirmDelete = async () => {
		dispatch(deleteContent(idDelete));
		setIdDelete(null);
		setTimeout(reLoad, 1000);
	};

	return (
		<>
			<Sidebar />
			<div className="p-6" style={{ marginLeft: '300px' }}>
				<h1 className="text-2xl font-bold mb-4">Danh sách Bài Viết</h1>
				<Link
					to="/admin/content"
					className="block w-fit bg-blue-500 text-white px-4 py-2 rounded mb-4"
					style={{ width: 'fit-content' }}
				>
					Thêm bài viết mới
				</Link>
				<div className="flex space-x-4 mb-4">
					<input
						type="text"
						placeholder="Lọc theo từ khóa..."
						className="border p-2 rounded w-1/3"
						onChange={(e) => setFilter(e.target.value)}
					/>
					<select className="border p-2 rounded" onChange={(e) => setSortField(e.target.value)}>
						<option value="id">ID</option>
						<option value="thuTuHienThi">Thứ tự</option>
					</select>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded"
						style={{ backgroundColor: 'rgb(99 152 238)' }}
						onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
					>
						Sắp xếp: {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
					</button>
				</div>
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border p-2">ID</th>
							<th className="border p-2">Danh mục</th>
							<th className="border p-2">Tên</th>
							<th className="border p-2">Thứ tự</th>
							<th className="border p-2">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{filteredContents?.map((content) => (
							<tr key={content.id} className="border hover:bg-gray-50">
								<td className="border p-2">{content.id}</td>
								<td className="border p-2">{content.typeRole}</td>
								<td className="border p-2">{content.tenBaiViet}</td>
								<td className="border p-2">{content.thuTuHienThi}</td>
								<td className="border p-2">
									<Link className="text-blue-600 mr-4" to={`/admin/content/${content.id}`}>
										✏️ Sửa
									</Link>
									<button className="text-red-600" onClick={() => handleDelete(content.id)}>
										🗑️ Xóa
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{idDelete && (
					<div
						className="fixed flex items-center justify-center bg-gray-900 bg-opacity-50"
						style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
					>
						<div className="bg-white p-6 rounded shadow-lg">
							<p>Bạn có chắc muốn xóa bài viết này?</p>
							<div className="mt-4 flex space-x-4">
								<button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>
									Xóa
								</button>
								<button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIdDelete(null)}>
									Hủy
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ContentsList;
