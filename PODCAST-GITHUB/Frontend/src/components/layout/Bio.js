import logo from '../../assets/images/background/TheoO_Background.webp';
import Theo3 from '../../assets/images/background/TheoO3.webp';

const Bio = () => {
	return (
		<div className="bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
			<div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
				<div className="relative w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
					{/* Ảnh bìa */}
					<div className="relative top-0 left-0 w-full h-44">
						<img className="w-full h-full object-cover" src={Theo3} alt="Background" />
					</div>

					{/* Avatar (Fix z-index + relative) */}
					<div className="relative flex justify-center -mt-12 z-50">
						<img
							className="h-32 w-32 bg-white p-2 rounded-full shadow-lg border-4 border-white"
							src={logo}
							alt="Avatar"
							style={{ width: '128px', height: '128px', objectFit: 'cover' }}
						/>
					</div>

					<div className="text-center px-6 py-4 relative z-10">
						{/* Tiêu đề */}
						<h2 className="text-gray-800 text-3xl font-bold drop-shadow-lg stroke-2 stroke-gray-900">
							TheoO
						</h2>

						{/* Link */}
						<a className="text-blue-500 hover:underline drop-shadow-md" href="#" target="_blank">
							@TheO
						</a>

						{/* Nội dung mô tả */}
						<p className="mt-2 text-black text-sm drop-shadow-sm">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						</p>
					</div>

					{/* Footer */}
					<hr className="border-gray-200 dark:border-gray-700" />
					<div className="flex justify-center bg-gray-50">
						<div className="w-full p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
							<p>
								<span className="font-semibold text-gray-800 ">2.5K</span> <br /> Followers
							</p>
						</div>
						<div className="w-full p-4 text-center cursor-pointer">
							<p>
								<span className="font-semibold text-gray-800 ">2.0K</span> <br /> Following
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Bio;
