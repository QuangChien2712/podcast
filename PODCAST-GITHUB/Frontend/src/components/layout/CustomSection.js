const CustomSection = ({ title, subtitle }) => {
	return (
		<div className="m-auto flex flex-col items-stretch w-11/12">
			{/* Section 1 */}
			<div
				style={{ backgroundColor: '#ffae51' }}
				className={`text-white flex items-center justify-center text-center p-6 h-auto flex-1`}
			>
				<span className="font-svnCookies text-base uppercase font-bold">{title}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6 ml-2 mt-[3px]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
					/>
				</svg>
			</div>

			{/* Section 2 */}
			<div className="mt-4 text-xl text-customOrange-light w-full flex items-center justify-center text-center p-6 border-2 border-orange-500 flex-1">
				{subtitle}
			</div>
		</div>
	);
};

export default CustomSection;
