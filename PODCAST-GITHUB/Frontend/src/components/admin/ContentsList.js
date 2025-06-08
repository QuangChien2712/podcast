// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Sidebar from './Sidebar';
// import { getAdminContents, deleteContent, clearErrors } from '../../actions/contentActions';
// import { DELETE_CONTENT_RESET, UPDATE_CONTENT_RESET } from '../../constants/contentConstants';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { useAlert } from 'react-alert';

// const ContentsList = ({ history }) => {
// 	const dispatch = useDispatch();
// 	const { contents } = useSelector((state) => state.contents);
// 	const [filter, setFilter] = useState('');
// 	const [sortOrder, setSortOrder] = useState('asc');
// 	const [sortField, setSortField] = useState('id');
// 	const [idDelete, setIdDelete] = useState(null);

// 	const alert = useAlert();
// 	const { loading, error } = useSelector((state) => state.contents);
// 	const { error: deleteError, isDeleted } = useSelector((state) => state.content);

// 	useEffect(() => {
// 		if (error) {
// 			alert.error(error);
// 			dispatch(clearErrors());
// 		}

// 		if (deleteError) {
// 			alert.error(deleteError);
// 			dispatch(clearErrors());
// 		}

// 		if (isDeleted) {
// 			alert.success('Đã xóa bài viết');
// 			history.push('/admin/contents');
// 			dispatch({ type: DELETE_CONTENT_RESET });
// 		}
// 	}, [dispatch, alert, error, deleteError, isDeleted, history]);

// 	useEffect(() => {
// 		dispatch(getAdminContents());
// 	}, [dispatch]);

// 	const handleDelete = (id) => {
// 		setIdDelete(id);
// 	};

// 	const reLoad = () => {
// 		window.location.reload();
// 	};

// 	// ContentsList.js
// 	const filteredContents = contents
// 		?.filter(
// 			(content) =>
// 				!filter ||
// 				content.typeRole.includes(filter) ||
// 				content.tenBaiViet.toLowerCase().includes(filter.toLowerCase()) ||
// 				content.moTaNgan.toLowerCase().includes(filter.toLowerCase()) ||
// 				content.noiDung.toLowerCase().includes(filter.toLowerCase()),
// 		)
// 		.sort((a, b) => (sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField]));

// 	const confirmDelete = async () => {
// 		dispatch(deleteContent(idDelete));
// 		setIdDelete(null);
// 		setTimeout(reLoad, 1000);
// 	};

// 	return (
// 		<>
// 			<Sidebar />
// 			<div className="p-6" style={{ marginLeft: '300px' }}>
// 				<h1 className="text-2xl font-bold mb-4">Danh sách Bài Viết</h1>
// 				<Link
// 					to="/admin/content"
// 					className="block w-fit bg-blue-500 text-white px-4 py-2 rounded mb-4"
// 					style={{ width: 'fit-content' }}
// 				>
// 					Thêm bài viết mới
// 				</Link>
// 				<div className="flex space-x-4 mb-4">
// 					<input
// 						type="text"
// 						placeholder="Lọc theo từ khóa..."
// 						className="border p-2 rounded w-1/3"
// 						onChange={(e) => setFilter(e.target.value)}
// 					/>
// 					<select className="border p-2 rounded" onChange={(e) => setSortField(e.target.value)}>
// 						<option value="id">ID</option>
// 						<option value="thuTuHienThi">Thứ tự</option>
// 					</select>
// 					<button
// 						className="bg-blue-500 text-white px-4 py-2 rounded"
// 						style={{ backgroundColor: 'rgb(99 152 238)' }}
// 						onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
// 					>
// 						Sắp xếp: {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
// 					</button>
// 				</div>
// 				<table className="w-full border-collapse border border-gray-300">
// 					<thead>
// 						<tr className="bg-gray-100">
// 							<th className="border p-2">ID</th>
// 							<th className="border p-2">Danh mục</th>
// 							<th className="border p-2">Tên</th>
// 							<th className="border p-2">Thứ tự</th>
// 							<th className="border p-2">Hành động</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{filteredContents?.map((content) => (
// 							<tr key={content.id} className="border hover:bg-gray-50">
// 								<td className="border p-2">{content.id}</td>
// 								<td className="border p-2">{content.typeRole}</td>
// 								<td className="border p-2">{content.tenBaiViet}</td>
// 								<td className="border p-2">{content.thuTuHienThi}</td>
// 								<td className="border p-2">
// 									<Link className="text-blue-600 mr-4" to={`/admin/content/${content.id}`}>
// 										✏️ Sửa
// 									</Link>
// 									<button className="text-red-600" onClick={() => handleDelete(content.id)}>
// 										🗑️ Xóa
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 				{idDelete && (
// 					<div
// 						className="fixed flex items-center justify-center bg-gray-900 bg-opacity-50"
// 						style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
// 					>
// 						<div className="bg-white p-6 rounded shadow-lg">
// 							<p>Bạn có chắc muốn xóa bài viết này?</p>
// 							<div className="mt-4 flex space-x-4">
// 								<button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>
// 									Xóa
// 								</button>
// 								<button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIdDelete(null)}>
// 									Hủy
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// };

// export default ContentsList;

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { getAdminContents, deleteContent, clearErrors } from '../../actions/contentActions';
import { DELETE_CONTENT_RESET } from '../../constants/contentConstants';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useAlert } from 'react-alert';

// Icons
const SortAscIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		<path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
	</svg>
);

const SortDescIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		<path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 011 1v5.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L13 14.586V9a1 1 0 011-1z" />
	</svg>
);

const SearchIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
		<path
			fillRule="evenodd"
			d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
			clipRule="evenodd"
		/>
	</svg>
);

// Custom hook for debounce
function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

const ContentsList = ({ history }) => {
	const dispatch = useDispatch();
	const { contents } = useSelector((state) => state.contents);
	const alert = useAlert();
	const { loading, error } = useSelector((state) => state.contents);
	const { error: deleteError, isDeleted } = useSelector((state) => state.content);

	// State for filtering and pagination
	const [searchInput, setSearchInput] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [sortConfig, setSortConfig] = useState({ field: 'thuTuHienThi', direction: 'asc' });
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [contentToDelete, setContentToDelete] = useState(null);

	// Debounce search term to avoid excessive filtering
	const searchTerm = useDebounce(searchInput, 300);

	// Get all unique categories from content
	const categories = useMemo(() => {
		if (!contents) return [];
		const uniqueCategories = [...new Set(contents.map((content) => content.typeRole))];
		return uniqueCategories;
	}, [contents]);

	// Get unique chuDe values
	const topics = useMemo(() => {
		if (!contents) return [];
		const uniqueTopics = [...new Set(contents.map((content) => content.chuDe))];
		return uniqueTopics;
	}, [contents]);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success('Bài viết đã được xóa thành công');
			history.push('/admin/contents');
			dispatch({ type: DELETE_CONTENT_RESET });
		}
	}, [dispatch, alert, error, deleteError, isDeleted, history]);

	useEffect(() => {
		dispatch(getAdminContents());
	}, [dispatch]);

	// Reset pagination when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, categoryFilter]);

	// Sort function
	const requestSort = (field) => {
		let direction = 'asc';
		if (sortConfig.field === field && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ field, direction });
	};

	// Filter and sort content
	const filteredAndSortedContent = useMemo(() => {
		if (!contents) return [];

		let filtered = [...contents];

		// Apply search term filter
		if (searchTerm) {
			const search = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(item) =>
					item.tenBaiViet?.toLowerCase().includes(search) ||
					item.moTaNgan?.toLowerCase().includes(search) ||
					item.noiDung?.toLowerCase().includes(search) ||
					item.chuDe?.toLowerCase().includes(search) ||
					item.typeRole?.toLowerCase().includes(search),
			);
		}

		// Apply category filter
		if (categoryFilter) {
			filtered = filtered.filter((item) => item.typeRole === categoryFilter);
		}

		// Apply sorting
		filtered.sort((a, b) => {
			if (a[sortConfig.field] < b[sortConfig.field]) {
				return sortConfig.direction === 'asc' ? -1 : 1;
			}
			if (a[sortConfig.field] > b[sortConfig.field]) {
				return sortConfig.direction === 'asc' ? 1 : -1;
			}
			return 0;
		});

		return filtered;
	}, [contents, searchTerm, categoryFilter, sortConfig]);

	// Pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredAndSortedContent.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredAndSortedContent.length / itemsPerPage);

	// Handle delete
	const handleDelete = (content) => {
		setContentToDelete(content);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		dispatch(deleteContent(contentToDelete.id));
		setIsDeleteModalOpen(false);
	};

	const getSortIcon = (field) => {
		if (sortConfig.field !== field) return null;
		return sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />;
	};

	// Generated pagination buttons
	const renderPaginationButtons = useCallback(() => {
		// Create an array of buttons to show
		const buttons = [];

		// Always show first page
		buttons.push(
			<button
				key="first"
				onClick={() => setCurrentPage(1)}
				className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
					currentPage === 1
						? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
						: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
				}`}
			>
				1
			</button>,
		);

		// Calculate range of pages to show around current page
		let startPage = Math.max(2, currentPage - 1);
		let endPage = Math.min(totalPages - 1, currentPage + 1);

		// Add ellipsis if needed
		if (startPage > 2) {
			buttons.push(
				<span key="ellipsis1" className="px-3 py-2 border border-gray-300 bg-white text-gray-700">
					...
				</span>,
			);
		}

		// Add page buttons in range
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => setCurrentPage(i)}
					className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
						currentPage === i
							? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
							: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
					}`}
				>
					{i}
				</button>,
			);
		}

		// Add ellipsis if needed
		if (endPage < totalPages - 1) {
			buttons.push(
				<span key="ellipsis2" className="px-3 py-2 border border-gray-300 bg-white text-gray-700">
					...
				</span>,
			);
		}

		// Always show last page if more than 1 page
		if (totalPages > 1) {
			buttons.push(
				<button
					key="last"
					onClick={() => setCurrentPage(totalPages)}
					className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
						currentPage === totalPages
							? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
							: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
					}`}
				>
					{totalPages}
				</button>,
			);
		}

		return buttons;
	}, [currentPage, totalPages]);

	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar />

			{/* Main content area - with responsive padding */}
			<div className="flex-1 transition-all duration-300 md:ml-20 lg:ml-64">
				<div className="container mx-auto px-4 sm:px-6 py-8">
					{/* Header section */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
						<h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Quản lý Bài Viết</h1>
						<Link
							to="/admin/content"
							className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center"
						>
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								></path>
							</svg>
							Thêm bài viết mới
						</Link>
					</div>

					{/* Filter tools - responsive layout */}
					<div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
						<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
							{/* Search */}
							<div className="relative flex-1">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<SearchIcon />
								</div>
								<input
									className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Tìm kiếm bài viết..."
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
								/>
							</div>

							{/* Filters in responsive layout */}
							<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
								{/* Category filter */}
								<div className="w-full sm:w-auto">
									<select
										className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
										value={categoryFilter}
										onChange={(e) => setCategoryFilter(e.target.value)}
									>
										<option value="">Tất cả danh mục</option>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
								</div>

								{/* Items per page */}
								<div className="w-full sm:w-auto">
									<select
										className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
										value={itemsPerPage}
										onChange={(e) => setItemsPerPage(Number(e.target.value))}
									>
										<option value={5}>5 / trang</option>
										<option value={10}>10 / trang</option>
										<option value={15}>15 / trang</option>
										<option value={20}>20 / trang</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					{/* Content statistics - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
						{/* Giữ nguyên các card thống kê */}
						<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
							<h3 className="text-gray-500 text-sm font-medium">Tổng số bài viết</h3>
							<div className="flex items-center mt-2">
								<div className="text-2xl font-semibold text-gray-800">{contents?.length || 0}</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
							<h3 className="text-gray-500 text-sm font-medium">Số mục đang lọc</h3>
							<div className="flex items-center mt-2">
								<div className="text-2xl font-semibold text-gray-800">
									{filteredAndSortedContent.length}
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
							<h3 className="text-gray-500 text-sm font-medium">Số danh mục</h3>
							<div className="flex items-center mt-2">
								<div className="text-2xl font-semibold text-gray-800">{categories.length}</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
							<h3 className="text-gray-500 text-sm font-medium">Số chủ đề</h3>
							<div className="flex items-center mt-2">
								<div className="text-2xl font-semibold text-gray-800">{topics.length}</div>
							</div>
						</div>
					</div>

					{/* Content results */}
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						{loading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
							</div>
						) : filteredAndSortedContent.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12">
								<svg
									className="w-16 h-16 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<p className="text-gray-600 mt-4">Không tìm thấy bài viết nào phù hợp</p>
								<button
									className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
									onClick={() => {
										setSearchInput('');
										setCategoryFilter('');
									}}
								>
									Xóa bộ lọc
								</button>
							</div>
						) : (
							<>
								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group"
													onClick={() => requestSort('id')}
												>
													<div className="flex items-center space-x-1">
														<span>ID</span>
														<div className="opacity-0 group-hover:opacity-100 transition-opacity">
															{getSortIcon('id')}
														</div>
													</div>
												</th>
												<th
													scope="col"
													className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group"
													onClick={() => requestSort('typeRole')}
												>
													<div className="flex items-center space-x-1">
														<span>Danh mục</span>
														<div className="opacity-0 group-hover:opacity-100 transition-opacity">
															{getSortIcon('typeRole')}
														</div>
													</div>
												</th>
												<th
													scope="col"
													className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group"
													onClick={() => requestSort('tenBaiViet')}
												>
													<div className="flex items-center space-x-1">
														<span>Tiêu đề</span>
														<div className="opacity-0 group-hover:opacity-100 transition-opacity">
															{getSortIcon('tenBaiViet')}
														</div>
													</div>
												</th>
												<th
													scope="col"
													className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group"
													onClick={() => requestSort('chuDe')}
												>
													<div className="flex items-center space-x-1">
														<span>Chủ đề</span>
														<div className="opacity-0 group-hover:opacity-100 transition-opacity">
															{getSortIcon('chuDe')}
														</div>
													</div>
												</th>
												<th
													scope="col"
													className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group"
													onClick={() => requestSort('thuTuHienThi')}
												>
													<div className="flex items-center space-x-1">
														<span>Thứ tự</span>
														<div className="opacity-0 group-hover:opacity-100 transition-opacity">
															{getSortIcon('thuTuHienThi')}
														</div>
													</div>
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Thao tác
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{currentItems.map((content) => (
												<tr key={content.id} className="hover:bg-gray-50 transition-colors">
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														{content.id}
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
															{content.typeRole}
														</span>
													</td>
													<td className="px-6 py-4 text-sm text-gray-900">
														<div className="relative group">
															<p className="truncate max-w-xs w-60">
																{content.tenBaiViet || 'Không có tiêu đề'}
															</p>
															<div className="opacity-0 bg-gray-900 text-white text-sm rounded py-2 px-3 absolute z-50 group-hover:opacity-100 top-full left-0 mt-1 pointer-events-none transition-opacity duration-300 whitespace-normal max-w-xs shadow-lg">
																{content.tenBaiViet || 'Không có tiêu đề'}
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{content.chuDe}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{content.thuTuHienThi}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center space-x-3">
														<Link
															to={`/admin/content/${content.id}`}
															className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 p-2 rounded-md transition-colors"
															title="Sửa bài viết"
														>
															<svg
																className="w-5 h-5"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
																></path>
															</svg>
														</Link>
														<button
															className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-md transition-colors"
															onClick={() => handleDelete(content)}
															title="Xóa bài viết"
														>
															<svg
																className="w-5 h-5"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																></path>
															</svg>
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{/* Pagination */}
								<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
									<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
										<div>
											<p className="text-sm text-gray-700">
												Hiển thị <span className="font-medium">{indexOfFirstItem + 1}</span> đến{' '}
												<span className="font-medium">
													{Math.min(indexOfLastItem, filteredAndSortedContent.length)}
												</span>{' '}
												trong tổng số{' '}
												<span className="font-medium">{filteredAndSortedContent.length}</span>{' '}
												bài viết
											</p>
										</div>
										<div>
											<nav
												className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
												aria-label="Pagination"
											>
												<button
													onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
													disabled={currentPage === 1}
													className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
														currentPage === 1
															? 'text-gray-300 cursor-not-allowed'
															: 'text-gray-500 hover:bg-gray-50'
													}`}
												>
													<span className="sr-only">Previous</span>
													<svg
														className="h-5 w-5"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fillRule="evenodd"
															d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												</button>

												{renderPaginationButtons()}

												<button
													onClick={() =>
														setCurrentPage(Math.min(totalPages, currentPage + 1))
													}
													disabled={currentPage === totalPages}
													className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
														currentPage === totalPages
															? 'text-gray-300 cursor-not-allowed'
															: 'text-gray-500 hover:bg-gray-50'
													}`}
												>
													<span className="sr-only">Next</span>
													<svg
														className="h-5 w-5"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fillRule="evenodd"
															d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											</nav>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Delete Modal */}
			{isDeleteModalOpen && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
					<div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-6 w-full">
						<div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
							<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>

						<h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-1">Xác nhận xóa</h3>
						<p className="text-sm text-gray-500 text-center mb-6">
							Bạn có chắc muốn xóa bài viết "{contentToDelete?.tenBaiViet}"?
							<br />
							Hành động này không thể hoàn tác.
						</p>

						<div className="flex justify-center space-x-4">
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
							>
								Hủy
							</button>
							<button
								onClick={confirmDelete}
								className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Xóa bài viết
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContentsList;
