import React, { Fragment, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import MetaData from './layout/MetaData';
import Sliderr from '../components/layout/Slider';
import CustomSection from './layout/CustomSection';
import ButtonTitle from './layout/ButtonTitle';
import { Link } from "react-router-dom";

const Home = ({ match }) => {
	return (
		<>
			{/* Better every day */}
			<div
				id="section-blog"
				className="bg-black w-screen flex items-center justify-center relative max-h-[800px] h-screen sm:max-h-[600px]"
			>
				{/* Background Image */}
				<div className="bg-TheoO1 max-w-[400px] w-full bg-center bg-cover bg-no-repeat h-80 sm:h-60">
					{/* Overlay Content */}
					<div className="flex flex-col w-full h-full bg-black bg-opacity-50">
						<h1 className=" mt-[-54px] font-svnCookies text-white text-4xl uppercase font-bold text-center">
							Giúp Người Trẻ
							<br />
							Giỏi Hơn 1% Mỗi Ngày
						</h1>

						<h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case font-bold text-center">
							"Bằng Cách Biến Mỗi Click <br /> trở nên có ý nghĩa!"
						</h3>

						<div className="w-full mt-[120px]">
							<CustomSection
								title="Sợ Gì Làm Đó! & THEO'S BLOG"
								subtitle={
									<>
										WORKSHOP MAY ĐO <br />
										GẦN NHẤT
									</>
								}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full h-[2px] bg-gray-200"></div>

			{/* Doanh Thu va Loi Nhuan */}
			<div
				id="section-career"
				className="bg-black w-screen flex items-center justify-center relative max-h-[800px] h-screen sm:max-h-[600px] pb-36"
			>
				{/* Background Image */}
				<div className="bg-TheoO2 max-w-[400px] w-full bg-center bg-cover bg-no-repeat h-80 sm:h-60">
					{/* Overlay Content */}
					<div className="flex flex-col w-full h-full bg-black bg-opacity-50">
						<h1 className=" mt-[-54px] font-svnCookies text-white text-4xl uppercase font-bold text-center">
							Bí Quyết Tăng
							<br />
							Doanh Thu & Lợi Nhuận
						</h1>

						<h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case font-bold text-center">
							"Bằng Công Thức Đã Được Chứng Minh <br /> thành công trên toàn thế giới!"
						</h3>

						<Link to="/blog1" className="float-right mt-3">
						<div className="w-full mt-[100px]">
							<CustomSection
								title="Phát Triển Sự Nghiệp"
								subtitle={
									<>
										WORKSHOP MAY ĐO <br />
										GẦN NHẤT
									</>
								}
							/>
						</div>
						</Link>
						
					</div>
				</div>
			</div>

			<div className="w-full h-[2px] bg-gray-200"></div>

			{/* Niem Vui Phong Cach Song */}
			<div
				id="section-balance"
				className="bg-black w-screen flex items-center justify-center relative max-h-[800px] h-screen sm:max-h-[600px] pb-56"
			>
				{/* Background Image */}
				<div className="bg-TheoO3 max-w-[400px] w-full bg-center bg-cover bg-no-repeat h-80 sm:h-60">
					{/* Overlay Content */}
					<div className="flex flex-col w-full h-full bg-black bg-opacity-50">
						<h1 className="mt-[-54px] font-svnCookies text-white text-3xl uppercase font-bold text-center">
							Chế Tác
							<br />
							Niề m Vui & Phong Cách Sống
						</h1>

						<h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case font-bold text-center">
							"Thông qua mở rộng góc nhìn và tạo <br /> ra trải nghiệm phong phú!"
						</h3>

						<Link to="/blog2" className="float-right mt-3">
						<div className="w-full mt-[100px]">
							<CustomSection
								title="Cân Bằng Cuộc Sống"
								subtitle={
									<>
										WORKSHOP MAY ĐO <br />
										GẦN NHẤT
									</>
								}
							/>
						</div>
						</Link>
					</div>
				</div>
			</div>

			<div className="w-full h-[2px] bg-gray-200"></div>

			{/* Menu */}
			<div className="bg-white px-6 flex flex-col items-center justify-center sm:max-h-[600px] mt-5 pb-44">
				{/* Các nút tiêu đề */}
				<div className="w-full mb-4">
					<ButtonTitle title="Sợ gì làm đó! & TheoO's Blog" />
				</div>

				<Link to="/blog1" className="float-right mt-3">
				<div className="w-full mb-4">				
				<ButtonTitle title="Phát Triển Sự Nghiệp" />
				</div>
                </Link>
				
				<Link to="/blog2" className="float-right mt-3">
				<div className="w-full mb-4">
					<ButtonTitle title="Cân Bằng Cuộc Sống" />
				</div>
				</Link>

				<div className="flex items-center space-x-2 mt-6 ">
					<button
						className="flex flex-col items-center focus:outline-none text-gray-500 hover:text-red-500 transition-colors"
						aria-label="Like"
					>
						{/* Icon Like */}
						<svg
							className="w-10 h-10 bg-orange-300 rounded-full p-2 text-red-400 hover:text-red-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
						</svg>
						<span className="mt-2 text-sm uppercase font-medium">120 Likes</span>
					</button>
				</div>

				{/* Like and Share */}
				<div className="flex items-center space-x-2 mt-4">
					<button
						className="flex flex-col items-center focus:outline-none text-gray-500 hover:text-red-500 transition-colors"
						aria-label="Share"
					>
						{/* Icon Share */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-10 h-10 bg-orange-300 rounded-full p-2 text-red-400 hover:text-red-500"
						>
							<path
								fill-rule="evenodd"
								d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
								clip-rule="evenodd"
							/>
						</svg>

						<span className="mt-2 text-sm font-medium uppercase">Share This Post</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
