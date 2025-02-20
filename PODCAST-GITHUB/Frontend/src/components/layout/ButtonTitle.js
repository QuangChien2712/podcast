import React from 'react';

const ButtonTitle = ({ title }) => {
	return (
		<>
			<div style={{backgroundColor: "#ffae51"}}
				className={`w-full max-h-24 text-white flex items-center justify-center text-center p-6 h-auto flex-1`}
			>
				<span className="font-svnCookies text-xl uppercase font-bold">{title}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6 ml-2 mt-[3px]"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
					/>
				</svg>
			</div>
		</>
	);
};

export default ButtonTitle;
