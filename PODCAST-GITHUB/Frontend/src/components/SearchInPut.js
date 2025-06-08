import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchContentsPTSN, getAdminContentsPTSN } from '../actions/contentActions';
import { CBCS, PTSN } from '../constants/path';

const SearchInput = () => {
	const dispatch = useDispatch();

	const [chuoiTimKiem, setChuoiTimKiem] = useState('');
	const [listResultSearch, setListResultSearch] = useState([]);

	const { contents } = useSelector((state) => state.contentsPTSN);

	useEffect(() => {
		if (window.location.pathname === `/${PTSN}`) {
			dispatch(getAdminContentsPTSN('HM1'));
		}
		if (window.location.pathname === `/${CBCS}`) {
			dispatch(getAdminContentsPTSN('HM2'));
		}
	}, [window.location.pathname]);

	useEffect(() => {
		dispatch(
			setSearchContentsPTSN({
				chuoiTimKiem: chuoiTimKiem,
				ketQuaTimKiem: listResultSearch,
			}),
		);
	}, [listResultSearch, chuoiTimKiem]);

	const handleTimKiem = (chuoiSearch, data) => {
		let listResult = [];
		let UpCase = '';
		let LoCase = '';

		for (let i = 0; i < data.length; i++) {
			let element = data[i].tenBaiViet;
			UpCase = chuoiSearch.toUpperCase();
			LoCase = chuoiSearch.toLowerCase();
			if (element.includes(chuoiSearch) || element.includes(UpCase) || element.includes(LoCase)) {
				listResult.push(data[i]);
			}
		}
		setChuoiTimKiem(chuoiSearch);
		setListResultSearch(listResult);
	};

	return (
		<form className="mx-auto md:min-w-[400px] lg:min-w-[220px]">
			<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
				Search
			</label>

			<div className="relative md:max-w-md mx-auto">
				{/* <!-- Input --> */}
				<input
					type="search"
					id="default-search"
					className="block w-full px-6 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400 transition duration-200 ease-in-out"
					placeholder="Tìm kiếm nội dung..."
					onChange={(e) => handleTimKiem(e.target.value, contents)}
					required
				/>
				{/* <!-- Button --> */}
				<button
					type="submit"
					className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-orange-300 hover:bg-orange-400 text-white rounded-lg p-2 shadow-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
				>
					<svg
						className="w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-4.35-4.35m1.85-5.15A7 7 0 1 0 5.65 5.65a7 7 0 0 0 13.5 5.65z"
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};

export default SearchInput;
