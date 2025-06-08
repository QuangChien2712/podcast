import 'rc-slider/assets/index.css';
import CustomSection from './layout/CustomSection';
import { Link } from 'react-router-dom';
import { CBCS, GIOI_THIEU, PTSN } from '../constants/path';

const Home = () => {
	return (
		<>
			{/* Better every day */}
			<div
				id="section-blog"
				className="bg-black w-full flex items-center justify-center h-[800px] md:h-[800px] lg:h-[1000px]"
			>
				{/* Background Image */}
				<div className="bg-TheoO1 max-w-[400px] md:max-w-[700px] lg:max-w-[1000px] w-full bg-center bg-cover bg-no-repeat h-80 md:h-[500px] lg:h-[600px]">
					{/* Overlay Content */}
					<div className="flex flex-col px-1 w-full h-full bg-black bg-opacity-50 md:px-8 lg:px-16">
						<h1 className="px-2 mt-[-54px] font-svnCookies text-white text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-center">
							Giúp Người Trẻ
							<br />
							Giỏi Hơn 1% Mỗi Ngày
						</h1>

						<h3 className="mt-[120px] md:mt-[200px] lg:mt-[300px] font-thin text-white text-xl md:text-2xl lg:text-3xl normal-case text-center">
							"Bằng cách biến mỗi Click <br className="md:hidden" /> trở nên có ý nghĩa!"
						</h3>

						<Link to={GIOI_THIEU} className="mx-auto md:mx-0 md:ml-auto mt-3 hover:no-underline">
							<div className="px-3 w-[380px] md:w-[500px] lg:w-[600px] mt-[120px] md:mt-32 lg:mt-28">
								<CustomSection
									title="Sợ Gì Làm Đó! & THEO BLOG"
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

			{/* Doanh Thu va Loi Nhuan */}
			<div
				id="section-career"
				className="bg-black w-full flex items-center justify-center h-[830px] md:h-[800px] lg:h-[1000px]"
			>
				{/* Background Image */}
				<div className="bg-TheoO2 max-w-[400px] md:max-w-[700px] lg:max-w-[1000px] w-full bg-center bg-cover bg-no-repeat h-80 md:h-[500px] lg:h-[600px]">
					{/* Overlay Content */}
					<div className="flex flex-col w-full h-full bg-black bg-opacity-50 md:px-8 lg:px-16">
						<h1 className="px-3 mt-[-54px] font-svnCookies text-white text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-center">
							Bí Quyết Tăng
							<br />
							Doanh Thu & Lợi Nhuận
						</h1>

						<h3 className="mt-[120px] md:mt-[200px] lg:mt-60 font-thin text-white text-xl md:text-2xl lg:text-3xl normal-case text-center px-8 md:px-12 lg:px-24">
							"Bằng công thức đã được chứng minh thành công trên toàn thế giới!"
						</h3>

						<Link to={PTSN} className="mx-auto md:mx-0 md:ml-auto mt-3 hover:no-underline">
							<div className="px-3 w-[380px] md:w-[500px] lg:w-[600px] mt-[100px] md:mt-[96px] lg:mt-32">
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
				className="bg-black w-full flex items-center justify-center h-[800px] pb-20 md:h-[800px] lg:h-[1000px]"
			>
				{/* Background Image */}
				<div className="bg-TheoO3 max-w-[400px] md:max-w-[700px] lg:max-w-[1000px] w-full bg-center bg-cover bg-no-repeat h-80 md:h-[500px] lg:h-[600px]">
					{/* Overlay Content */}
					<div className="flex flex-col w-full h-full bg-black bg-opacity-50 md:px-8 lg:px-16">
						<h1 className="px-4 mt-[-54px] font-svnCookies text-white text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-center">
							Chế Tác
							<br />
							Niềm Vui & Phong Cách Sống
						</h1>

						<h3 className="mt-[120px] md:mt-56 lg:mt-64 font-thin text-white text-xl md:text-2xl lg:text-3xl normal-case text-center px-8 md:px-12 lg:px-24">
							"Thông qua mở rộng góc nhìn và tạo ra trải nghiệm phong phú!"
						</h3>

						<Link to={CBCS} className="mx-auto md:mx-0 md:ml-auto mt-3 hover:no-underline">
							<div className="px-3 w-[380px] md:w-[500px] lg:w-[600px] mt-[100px] md:mt-[70px] lg:mt-28">
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
		</>
	);
};

export default Home;
