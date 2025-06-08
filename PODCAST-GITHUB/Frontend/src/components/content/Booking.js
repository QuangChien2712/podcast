import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { newBooking, clearErrors } from '../../actions/bookingActions';
import { NEW_BOOKING_RESET } from '../../constants/bookingConstants';
import { getAdminDiscussionContents, getAdminDiscussionTimes } from '../../actions/bookingActions';

// Validation phone function
const validatePhone = (phone) => {
	const phoneRegex = /^(0|\+84)(\d{9,10})$/;
	return phoneRegex.test(phone);
};

const getCurrentDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const formatDate = (date) => {
	const d = new Date(date);
	const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = d.getFullYear();
	const weekday = weekdays[d.getDay()];

	return `${weekday}, ngày ${day} tháng ${month} năm ${year}`;
};

const Booking = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { error, success } = useSelector((state) => state.newBooking);
	const { discussioncontents } = useSelector((state) => state.discussioncontents);
	const { discussiontimes } = useSelector((state) => state.discussiontimes);

	// Fetch data từ API thay vì hardcode
	const [discussContent, setDiscussContent] = useState([]);
	const [discussTimes, setDiscussTimes] = useState([]);
	const [dataLoading, setDataLoading] = useState(true);

	// State quản lý form
	const [formData, setFormData] = useState({
		selectedContent: '',
		otherContent: '',
		selectedTimes: '',
		otherTime: '',
		email: user ? user.email : '',
		phone: user ? user.phoneNumber : '',
		selectedDate: '',
	});

	const [loading, setLoading] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	// Fetch dữ liệu lựa chọn từ API khi component mount
	useEffect(() => {
		dispatch(getAdminDiscussionContents());
		dispatch(getAdminDiscussionTimes());
		setDataLoading(false);
	}, []);

	const filtArr = (data, type) => {
		let result = [];
		if (type === 1) {
			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				if (element.trangThai === 'Hiện') {
					result.push(element.noiDungThaoLuan);
				}
			}
		} else if (type === 2) {
			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				if (element.trangThai === 'Hiện') {
					result.push(element.thoiGianThaoLuan);
				}
			}
		}
		return result;
	};

	// Reset form
	const resetForm = () => {
		setFormData({
			selectedContent: '',
			otherContent: '',
			selectedTimes: '',
			otherTime: '',
			email: user ? user.email : '',
			phone: user ? user.phoneNumber : '',
			selectedDate: '',
		});
		setShowConfirmation(false);
	};

	useEffect(() => {
		if (discussioncontents && discussioncontents.length > 0) {
			setDiscussContent(filtArr(discussioncontents, 1));
			setDataLoading(false);
		}

		if (discussiontimes && discussiontimes.length > 0) {
			setDiscussTimes(filtArr(discussiontimes, 2));
			setDataLoading(false);
		}
	}, [discussioncontents, discussiontimes]);

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
		}

		if (success) {
			setShowConfirmation(true);
			toast.success('Đặt lịch thành công!');
			resetForm();
			dispatch({ type: NEW_BOOKING_RESET });
		}
	}, [error, success]);

	// Xử lý checkbox nội dung
	const handleContentChange = (content) => {
		setFormData((prev) => ({
			...prev,
			selectedContent: prev.selectedContent.includes(content)
				? prev.selectedContent.filter((item) => item !== content)
				: [...prev.selectedContent, content],
		}));
	};

	// Xử lý checkbox thời gian
	const handleTimeChange = (time) => {
		setFormData((prev) => ({
			...prev,
			selectedTimes: prev.selectedTimes.includes(time)
				? prev.selectedTimes.filter((item) => item !== time)
				: [...prev.selectedTimes, time],
		}));
	};

	// Xử lý thay đổi input
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Xử lý submit form
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		if (formData.selectedContent.length === 0 && !formData.otherContent) {
			toast.error('Vui lòng chọn nội dung thảo luận');
			return;
		} else {
			formData.selectedContent = JSON.stringify(formData.selectedContent);
		}

		if (formData.selectedTimes.length === 0 && !formData.otherTime) {
			toast.error('Vui lòng chọn thời gian thảo luận');
			return;
		} else {
			formData.selectedTimes = JSON.stringify(formData.selectedTimes);
		}

		if (!(user && user.email) && !formData.email) {
			toast.error('Vui lòng nhập email liên hệ');
			return;
		}
		if (!(user && user.phoneNumber) && !formData.phone) {
			toast.error('Vui lòng nhập số điện thoại liên hệ');
			return;
		}

		if (user) {
			if (!validatePhone(user.phoneNumber)) {
				toast.error('Số điện thoại không hợp lệ');
				return;
			}
		} else {
			if (!validatePhone(formData.phone)) {
				toast.error('Số điện thoại không hợp lệ');
				return;
			}
		}

		try {
			setLoading(true);
			// Tạo dữ liệu gửi đi
			const bookingData = {
				...formData,
				email: user ? user.email : formData.email,
				phone: user ? user.phoneNumber : formData.phone,
				trangThai: 'pending',
			};

			dispatch(newBooking(bookingData));
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
			toast.error(errorMessage);
			console.error('Booking error:', error);
		} finally {
			setLoading(false);
		}
	};

	// Component xác nhận đặt lịch thành công
	const ConfirmationMessage = () => (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg max-w-xs md:max-w-md lg:max-w-lg w-full mx-auto">
				<h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-green-600">
					Đặt lịch hẹn thành công!
				</h3>
				<p className="text-sm md:text-base mb-4">
					Cảm ơn bạn đã đặt lịch hẹn. Chúng tôi sẽ liên hệ với bạn qua email hoặc số điện thoại trong vòng 48
					giờ.
				</p>
				<button
					onClick={() => setShowConfirmation(false)}
					className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out w-full"
				>
					Đóng
				</button>
			</div>
		</div>
	);

	return (
		<>
			{showConfirmation && <ConfirmationMessage />}

			<form
				onSubmit={handleSubmit}
				className="bg-[#eee9e9] p-4 md:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto my-4 md:my-8"
			>
				{/* Tiêu đề */}
				<h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 lg:mb-8">
					ĐẶT LỊCH HẸN
				</h2>

				{dataLoading ? (
					<div className="text-center py-4">
						<p className="text-sm md:text-base">Đang tải dữ liệu...</p>
					</div>
				) : (
					<>
						{/* Nội dung cần thảo luận */}
						<div className="mb-5 md:mb-6 lg:mb-8">
							<h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">
								NỘI DUNG CẦN THẢO LUẬN
							</h3>
							<div className="space-y-2 md:space-y-3">
								{discussContent &&
									discussContent.length > 0 &&
									discussContent.map((item, index) => (
										<label
											key={index}
											className="flex items-center text-sm md:text-base hover:bg-gray-100 p-1 rounded transition-colors"
										>
											<input
												type="checkbox"
												checked={formData.selectedContent.includes(item)}
												onChange={() => handleContentChange(item)}
												className="w-4 h-4 md:w-5 md:h-5 mr-2 cursor-pointer"
											/>
											<span>{item}</span>
										</label>
									))}
								<div className="flex flex-col md:flex-row md:items-center mt-2">
									<span className="mr-0 md:mr-2 mb-1 md:mb-0 text-sm md:text-base">Khác:</span>
									<input
										type="text"
										name="otherContent"
										value={formData.otherContent}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 md:p-2.5"
										placeholder="Nội dung thảo luận khác"
									/>
								</div>
							</div>
						</div>

						{/* Chọn ngày */}
						<div className="mb-5 md:mb-6 lg:mb-8">
							<h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3">CHỌN NGÀY</h3>
							<div className="space-y-2">
								<input
									type="date"
									name="selectedDate"
									value={formData.selectedDate}
									min={getCurrentDate()}
									onChange={handleInputChange}
									className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 md:p-2.5"
									required
								/>
								{formData.selectedDate && (
									<p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">
										Ngày đã chọn: {formatDate(formData.selectedDate)}
									</p>
								)}
							</div>
						</div>

						{/* Thời gian thảo luận */}
						<div className="mb-5 md:mb-6 lg:mb-8">
							<h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">
								THỜI GIAN THẢO LUẬN
							</h3>
							<div className="space-y-2 md:space-y-3">
								{discussTimes &&
									discussTimes.length > 0 &&
									discussTimes.map((item, index) => (
										<label
											key={index}
											className="flex items-center text-sm md:text-base hover:bg-gray-100 p-1 rounded transition-colors"
										>
											<input
												type="checkbox"
												checked={formData.selectedTimes.includes(item)}
												onChange={() => handleTimeChange(item)}
												className="w-4 h-4 md:w-5 md:h-5 mr-2 cursor-pointer"
											/>
											<span>{item}</span>
										</label>
									))}
								<div className="flex flex-col md:flex-row md:items-center mt-2">
									<span className="mr-0 md:mr-2 mb-1 md:mb-0 text-sm md:text-base">Khác:</span>
									<input
										type="text"
										name="otherTime"
										value={formData.otherTime}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 md:p-2.5"
										placeholder="Thời gian thảo luận khác"
									/>
								</div>
							</div>
						</div>

						{/* Thông tin liên hệ */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
							{/* Email */}
							<div className="mb-4 md:mb-6">
								<label className="block mb-1 md:mb-2 text-sm font-medium text-gray-900">
									Email liên hệ
								</label>
								<input
									type="email"
									name="email"
									value={user ? user.email : formData.email}
									// disabled={user ? true : false}
									onChange={handleInputChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 md:p-2.5 disabled:bg-gray-100"
									placeholder="example@gmail.com"
									required
								/>
							</div>

							{/* Phone */}
							<div className="mb-4 md:mb-6">
								<label className="block mb-1 md:mb-2 text-sm font-medium text-gray-900">
									Số điện thoại liên hệ
								</label>
								<input
									type="tel"
									name="phone"
									value={user ? user.phoneNumber : formData.phone}
									// disabled={user ? true : false}
									onChange={handleInputChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 md:p-2.5 disabled:bg-gray-100"
									placeholder="0xxxxxxxxx"
									required
									pattern="(0|\+84)[0-9]{9,10}"
									title="Nhập số điện thoại Việt Nam hợp lệ (bắt đầu bằng 0 hoặc +84)"
								/>
								<p className="text-xs text-gray-500 mt-1">VD: 0989123456 hoặc +84989123456</p>
							</div>
						</div>

						{/* Thông tin phản hồi */}
						<div className="mb-5 md:mb-6 lg:mb-8 p-3 bg-gray-100 rounded-lg">
							<p className="text-xs md:text-sm text-justify text-gray-600 mb-2">
								Hệ thống sẽ phản hồi qua email hoặc tin nhắn đến Anh Chị chậm nhất trong vòng 48 giờ.
							</p>
							<p className="text-xs md:text-sm text-justify text-gray-600">
								Nếu Anh Chị phải chờ quá lâu, vui lòng gọi đến{' '}
								<span className="font-semibold md:font-bold">0989 165 465</span> để đặt lịch hẹn nhanh!
							</p>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`py-2 md:py-3 px-4 rounded-lg font-semibold text-sm md:text-base transition duration-300 ease-in-out w-full ${
								loading
									? 'bg-gray-400 text-white cursor-not-allowed'
									: 'bg-black text-yellow-400 hover:bg-gray-900 hover:text-white'
							}`}
						>
							{loading ? 'Đang xử lý...' : 'Đặt lịch hẹn'}
						</button>
					</>
				)}
			</form>
		</>
	);
};

export default Booking;
