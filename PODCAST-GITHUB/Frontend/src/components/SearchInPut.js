import React from 'react';

const SearchInput = ({ onSearch }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const query = event.target.elements.search.value;
		if (onSearch) {
			onSearch(query);
		}
	};

	return (
		// <form onSubmit={handleSubmit} className="flex items-center space-x-2 px-4 py-2 max-w-md mx-auto">
		// 	{/* Input */}
		// 	<input
		// 		type="text"
		// 		name="search"
		// 		placeholder={placeholder}
		// 		className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
		// 	/>
		// 	{/* Button */}
		// 	<button
		// 		type="text"
		// 		className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
		// 	>
		// 		Tìm
		// 	</button>
		// </form>
		<form className="max-w-md mx-auto">
			<label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
				Search
			</label>
			{/* <div className="relative">
				<input
					type="search"
					id="default-search"
					className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Mockups, Logos..."
					required
				/>
				<button
					type="submit"
					className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</button>
			</div> */}
			<div className="relative md:max-w-md mx-auto">
				{/* <!-- Input --> */}
				<input
					type="search"
					id="default-search"
					className="block w-full px-6 py-3 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400 transition duration-200 ease-in-out"
					placeholder="Tìm kiếm nội dung..."
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
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-4.35-4.35m1.85-5.15A7 7 0 1 0 5.65 5.65a7 7 0 0 0 13.5 5.65z"
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};

export default SearchInput;
