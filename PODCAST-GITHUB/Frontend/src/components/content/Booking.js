const Booking = () => {
  return (
    <div className="bg-[#eee9e9] p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-center mb-6">ĐẶT LỊCH HẸN</h2>

      {/* Nội dung cần thảo luận */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">NỘI DUNG CẦN THẢO LUẬN</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Tăng doanh thu & lợi nhuận</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Xây dựng đội ngũ</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Xây dựng hệ thống</span>
          </label>
        </div>
      </div>

      {/* Thời gian thảo luận */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">THỜI GIAN THẢO LUẬN</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Thứ Tư: 14:00 - 16:00</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Thứ Năm: 15:30 - 16:30</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Thứ Sáu: 10:15 - 12:00</span>
          </label>
        </div>
      </div>

      {/* Thông tin phản hồi */}
      <div className="mb-6">
        <p className="text-sm text-justify text-gray-600 mb-2">
          Hệ thống sẽ phản hồi qua email hoặc tin nhắn đến Anh Chị chậm nhất
          trong vòng 48 giờ.
        </p>
        <p className="text-sm text-justify text-gray-600">
          Nếu Anh Chị phải chờ quá lâu, vui lòng gọi đến <br /> 0989 165 465 để
          đặt lịch hẹn nhanh!
        </p>
      </div>

      <button className="bg-black text-yellow-400 py-2 px-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out">
        Đặt lịch hẹn
      </button>
    </div>
  );
};

export default Booking;
