const CommitmentTitle = () => {
	return (
		<div className="bg-white text-black p-4 md:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto">
			<h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-4 md:mb-6">Quyền lợi thành viên</h3>

			<div className="space-y-3 md:space-y-4 lg:space-y-5">
				<div className="flex items-start">
					<div className="flex-shrink-0 mt-1">
						<span className="inline-flex items-center justify-center bg-red-200 text-white w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md text-sm md:text-base">
							&#10004;
						</span>
					</div>
					<p className="ml-3 md:ml-4 text-base md:text-lg lg:text-lg font-semibold">
						CAM KẾT BẢO MẬT THÔNG TIN!
					</p>
				</div>

				<div className="flex items-start">
					<div className="flex-shrink-0 mt-1">
						<span className="inline-flex items-center justify-center bg-red-200 text-white w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md text-sm md:text-base">
							&#10004;
						</span>
					</div>
					<p className="ml-3 md:ml-4 text-sm md:text-base lg:text-lg text-gray-700">
						Thành viên được nhận các chương trình ưu đãi đặc biệt từ hệ thống thông báo/nhắc lịch.
					</p>
				</div>

				<div className="flex items-start">
					<div className="flex-shrink-0 mt-1">
						<span className="inline-flex items-center justify-center bg-red-200 text-white w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md text-sm md:text-base">
							&#10004;
						</span>
					</div>
					<p className="ml-3 md:ml-4 text-sm md:text-base lg:text-lg text-gray-700">
						Thành viên được đặt lịch thảo luận với TheO và comment/chia sẻ cùng nhau giỏi hơn 1% mỗi ngày
						trên nền tảng này!
					</p>
				</div>
			</div>
		</div>
	);
};

export default CommitmentTitle;
