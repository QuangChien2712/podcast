import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Validation phone function
const validatePhone = (phone) => {
  // Regex cho số điện thoại Việt Nam (bắt đầu bằng 0 hoặc +84)
  const phoneRegex = /^(0|\+84)(\d{9,10})$/;
  return phoneRegex.test(phone);
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (date) => {
  const d = new Date(date);
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const weekday = weekdays[d.getDay()];

  return `${weekday}, ngày ${day} tháng ${month} năm ${year}`;
};

const Booking = () => {
  // Fetch data từ API thay vì hardcode
  const [discussContent, setDiscussContent] = useState([]);
  const [discussTimes, setDiscussTimes] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // State quản lý form
  const [formData, setFormData] = useState({
    selectedContent: [],
    otherContent: "",
    selectedTimes: [],
    otherTime: "",
    email: "",
    phone: "",
    selectedDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch dữ liệu lựa chọn từ API khi component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setDataLoading(true);

        // Trong môi trường phát triển, sử dụng dữ liệu mẫu
        // Uncomment và sửa endpoint khi có API thực tế
        /*
        const [contentRes, timeRes] = await Promise.all([
          axios.get('/api/discuss-contents?active=true'),
          axios.get('/api/discuss-times?active=true')
        ]);
        setDiscussContent(contentRes.data.map(item => item.content));
        setDiscussTimes(timeRes.data.map(item => item.time));
        */

        // Dữ liệu mẫu - Thay thế bằng API khi sẵn sàng
        setDiscussContent([
          "Tăng doanh thu & lợi nhuận",
          "Xây dựng đội ngũ",
          "Xây dựng hệ thống",
          "Tăng trưởng bền vững",
        ]);

        setDiscussTimes(["14:00 - 16:00", "15:30 - 16:30", "10:15 - 12:00"]);
      } catch (error) {
        console.error("Không thể tải dữ liệu:", error);
        toast.error("Không thể tải dữ liệu, vui lòng tải lại trang");
      } finally {
        setDataLoading(false);
      }
    };

    fetchOptions();
  }, []);

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

  // Reset form
  const resetForm = () => {
    setFormData({
      selectedContent: [],
      otherContent: "",
      selectedTimes: [],
      otherTime: "",
      email: "",
      phone: "",
      selectedDate: "",
    });
    setShowConfirmation(false);
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (formData.selectedContent.length === 0 && !formData.otherContent) {
      toast.error("Vui lòng chọn nội dung thảo luận");
      return;
    }
    if (formData.selectedTimes.length === 0 && !formData.otherTime) {
      toast.error("Vui lòng chọn thời gian thảo luận");
      return;
    }
    if (!formData.email) {
      toast.error("Vui lòng nhập email liên hệ");
      return;
    }
    if (!formData.phone) {
      toast.error("Vui lòng nhập số điện thoại liên hệ");
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    try {
      setLoading(true);

      // Tạo dữ liệu gửi đi
      const bookingData = {
        ...formData,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      console.log("Booking data:", bookingData);

      // Uncomment khi có API thực tế
      // const response = await axios.post("/api/bookings", bookingData);
      // if (response.data.success) {
      //   setShowConfirmation(true);
      //   toast.success("Đặt lịch hẹn thành công!");
      // } else {
      //   toast.error(response.data.message || "Có lỗi xảy ra, vui lòng thử lại!");
      // }

      // Giả lập thành công - xóa khi có API thực tế
      setTimeout(() => {
        setShowConfirmation(true);
        toast.success("Đặt lịch hẹn thành công!");
        resetForm();
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      toast.error(errorMessage);
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Component xác nhận đặt lịch thành công
  const ConfirmationMessage = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-green-600">
          Đặt lịch hẹn thành công!
        </h3>
        <p className="mb-4">
          Cảm ơn bạn đã đặt lịch hẹn. Chúng tôi sẽ liên hệ với bạn qua email
          hoặc số điện thoại trong vòng 48 giờ.
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
        className="bg-[#eee9e9] p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-center mb-6">ĐẶT LỊCH HẸN</h2>

        {dataLoading ? (
          <div className="text-center py-4">
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            {/* Nội dung cần thảo luận */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                NỘI DUNG CẦN THẢO LUẬN
              </h3>
              <div className="space-y-2">
                {discussContent.map((item, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.selectedContent.includes(item)}
                      onChange={() => handleContentChange(item)}
                      className="w-5 h-5 mr-2"
                    />
                    <span>{item}</span>
                  </label>
                ))}
                <label className="flex items-center">
                  <span className="mr-2">Khác</span>
                  <input
                    type="text"
                    name="otherContent"
                    value={formData.otherContent}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nội dung thảo luận khác"
                  />
                </label>
              </div>
            </div>

            {/* Chọn ngày */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">CHỌN NGÀY</h3>
              <div className="space-y-2">
                <input
                  type="date"
                  name="selectedDate"
                  value={formData.selectedDate}
                  min={getCurrentDate()}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                {formData.selectedDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    Ngày đã chọn: {formatDate(formData.selectedDate)}
                  </p>
                )}
              </div>
            </div>

            {/* Thời gian thảo luận */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                THỜI GIAN THẢO LUẬN
              </h3>
              <div className="space-y-2">
                {discussTimes.map((item, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.selectedTimes.includes(item)}
                      onChange={() => handleTimeChange(item)}
                      className="w-5 h-5 mr-2"
                    />
                    <span>{item}</span>
                  </label>
                ))}
                <label className="flex items-center">
                  <span className="mr-2">Khác</span>
                  <input
                    type="text"
                    name="otherTime"
                    value={formData.otherTime}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Thời gian thảo luận khác"
                  />
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email liên hệ
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="example@gmail.com"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Số điện thoại liên hệ
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0xxxxxxxxx"
                required
                pattern="(0|\+84)[0-9]{9,10}"
                title="Nhập số điện thoại Việt Nam hợp lệ (bắt đầu bằng 0 hoặc +84)"
              />
              <p className="text-xs text-gray-500 mt-1">
                VD: 0989123456 hoặc +84989123456
              </p>
            </div>

            {/* Thông tin phản hồi */}
            <div className="mb-6">
              <p className="text-sm text-justify text-gray-600 mb-2">
                Hệ thống sẽ phản hồi qua email hoặc tin nhắn đến Anh Chị chậm
                nhất trong vòng 48 giờ.
              </p>
              <p className="text-sm text-justify text-gray-600">
                Nếu Anh Chị phải chờ quá lâu, vui lòng gọi đến <br /> 0989 165
                465 để đặt lịch hẹn nhanh!
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ease-in-out w-full ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-yellow-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {loading ? "Đang xử lý..." : "Đặt lịch hẹn"}
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Booking;
