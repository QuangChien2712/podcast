import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Mock data for testing
const mockBookings = [
  {
    id: "1",
    userId: "user001",
    selectedContent: ["Tăng doanh thu & lợi nhuận", "Xây dựng đội ngũ"],
    otherContent: "",
    selectedTimes: ["14:00 - 16:00"],
    otherTime: "",
    email: "example1@gmail.com",
    phone: "0123456789",
    selectedDate: "2025-04-15",
    status: "pending",
    createdAt: "2025-04-09T08:00:00.000Z",
  },
  {
    id: "2",
    userId: "user002",
    selectedContent: ["Xây dựng hệ thống"],
    otherContent: "Thảo luận về marketing",
    selectedTimes: ["15:30 - 16:30"],
    otherTime: "",
    email: "example2@gmail.com",
    phone: "0987654321",
    selectedDate: "2025-04-16",
    status: "approved",
    createdAt: "2025-04-09T09:00:00.000Z",
  },
  // Thêm dữ liệu mẫu với trạng thái rejected
  {
    id: "3",
    userId: "user003",
    selectedContent: ["Tăng trưởng bền vững"],
    otherContent: "",
    selectedTimes: ["10:15 - 12:00"],
    otherTime: "17:00 - 18:00",
    email: "example3@gmail.com",
    phone: "0909123456",
    selectedDate: "2025-04-20",
    status: "rejected",
    createdAt: "2025-04-10T10:30:00.000Z",
  },
  {
    id: "4",
    userId: "user004",
    selectedContent: ["Tăng trưởng bền vững"],
    otherContent: "",
    selectedTimes: ["10:15 - 12:00"],
    otherTime: "17:00 - 18:00",
    email: "example3@gmail.com",
    phone: "0909123456",
    selectedDate: "2025-04-09",
    status: "rejected",
    createdAt: "2025-04-10T10:30:00.000Z",
  },
];

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // State cho filter và search
  const [filters, setFilters] = useState({
    status: "",
    dateRange: "all", // 'all', 'today', 'thisWeek', 'thisMonth', 'custom'
    startDate: "",
    endDate: "",
    searchTerm: "",
  });

  // Thêm state để theo dõi các filter đang active
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
    updateActiveFilters();
  }, [bookings, filters, sortConfig]);

  // Cập nhật danh sách filter đang active
  const updateActiveFilters = () => {
    const active = [];

    if (filters.status) {
      active.push({
        type: "status",
        value:
          filters.status === "pending"
            ? "Chờ xử lý"
            : filters.status === "approved"
            ? "Đã duyệt"
            : "Từ chối",
      });
    }

    if (filters.dateRange !== "all") {
      const dateRangeLabels = {
        today: "Hôm nay",
        thisWeek: "Tuần này",
        thisMonth: "Tháng này",
        custom: `Từ ${filters.startDate} đến ${filters.endDate}`,
      };
      active.push({
        type: "date",
        value: dateRangeLabels[filters.dateRange],
      });
    }

    if (filters.searchTerm) {
      active.push({
        type: "search",
        value: filters.searchTerm,
      });
    }

    setActiveFilters(active);
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
    } catch (error) {
      toast.error("Không thể tải danh sách đặt lịch");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý filter và search
  const applyFilters = () => {
    let result = [...bookings];

    // Filter by status
    if (filters.status) {
      result = result.filter((booking) => booking.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filters.dateRange === "today") {
        result = result.filter((booking) => {
          const bookingDate = new Date(booking.selectedDate);
          bookingDate.setHours(0, 0, 0, 0);
          return bookingDate.getTime() === today.getTime();
        });
      } else if (filters.dateRange === "thisWeek") {
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

        result = result.filter((booking) => {
          const bookingDate = new Date(booking.selectedDate);
          return bookingDate >= firstDayOfWeek && bookingDate <= lastDayOfWeek;
        });
      } else if (filters.dateRange === "thisMonth") {
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );

        result = result.filter((booking) => {
          const bookingDate = new Date(booking.selectedDate);
          return (
            bookingDate >= firstDayOfMonth && bookingDate <= lastDayOfMonth
          );
        });
      } else if (
        filters.dateRange === "custom" &&
        filters.startDate &&
        filters.endDate
      ) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // Kết thúc cuối ngày

        result = result.filter((booking) => {
          const bookingDate = new Date(booking.selectedDate);
          return bookingDate >= startDate && bookingDate <= endDate;
        });
      }
    }

    // Search by email, phone, or content
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.email.toLowerCase().includes(searchTerm) ||
          booking.phone.includes(searchTerm) ||
          booking.selectedContent.some((content) =>
            content.toLowerCase().includes(searchTerm)
          ) ||
          (booking.otherContent &&
            booking.otherContent.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Đặc biệt xử lý cho trường hợp sắp xếp theo ngày
        if (
          sortConfig.key === "selectedDate" ||
          sortConfig.key === "createdAt"
        ) {
          // Chuyển đổi thành đối tượng Date để so sánh
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);

          if (sortConfig.direction === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        }

        // Xử lý thông thường cho các trường không phải ngày
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredBookings(result);
  };

  // Xử lý thay đổi filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateRange" && value !== "custom") {
      setFilters((prev) => ({
        ...prev,
        dateRange: value,
        startDate: "",
        endDate: "",
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Xử lý xóa filter
  const handleRemoveFilter = (filterType) => {
    if (filterType === "status") {
      setFilters((prev) => ({ ...prev, status: "" }));
    } else if (filterType === "date") {
      setFilters((prev) => ({
        ...prev,
        dateRange: "all",
        startDate: "",
        endDate: "",
      }));
    } else if (filterType === "search") {
      setFilters((prev) => ({ ...prev, searchTerm: "" }));
    }
  };

  // Xử lý reset tất cả filter
  const handleResetFilters = () => {
    setFilters({
      status: "",
      dateRange: "all",
      startDate: "",
      endDate: "",
      searchTerm: "",
    });
  };

  // Xử lý sắp xếp
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      // API call to update status
      await axios.patch(`/api/bookings/${bookingId}/status`, {
        status: newStatus,
      });

      // Update local state
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Bạn có chắc muốn xóa lịch hẹn này?")) return;

    try {
      setLoading(true);
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      toast.success("Xóa lịch hẹn thành công");
    } catch (error) {
      toast.error("Không thể xóa lịch hẹn");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    return `${weekdays[date.getDay()]}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Đã duyệt";
      case "rejected":
        return "Từ chối";
      default:
        return "Chờ xử lý";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đặt lịch hẹn</h1>

      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>

          {/* Khoảng thời gian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian
            </label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2"
            >
              <option value="all">Tất cả</option>
              <option value="today">Hôm nay</option>
              <option value="thisWeek">Tuần này</option>
              <option value="thisMonth">Tháng này</option>
              <option value="custom">Tùy chỉnh...</option>
            </select>
          </div>

          {/* Tìm kiếm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Email, SĐT hoặc nội dung..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2 py-2"
            />
          </div>
        </div>

        {/* Tùy chọn ngày tùy chỉnh - chỉ hiển thị khi chọn Custom */}
        {filters.dateRange === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Từ ngày
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đến ngày
              </label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2"
              />
            </div>
          </div>
        )}

        {/* Hiển thị các filter đang active */}
        {activeFilters.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-500">
                Đang lọc:
              </span>
              {activeFilters.map((filter, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center"
                >
                  {filter.value}
                  <button
                    type="button"
                    onClick={() => handleRemoveFilter(filter.type)}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-sm text-gray-500 hover:text-gray-700 ml-2"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hiển thị số lượng kết quả và nút sắp xếp */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Tìm thấy {filteredBookings.length} kết quả
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sắp xếp:</span>
          <button
            onClick={() => handleSort("selectedDate")}
            className={`text-sm px-3 py-1 rounded border ${
              sortConfig.key === "selectedDate"
                ? "bg-blue-100 border-blue-300"
                : ""
            }`}
            title="Sắp xếp theo ngày đặt lịch"
          >
            Ngày đặt{" "}
            {sortConfig.key === "selectedDate" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSort("createdAt")}
            className={`text-sm px-3 py-1 rounded border ${
              sortConfig.key === "createdAt"
                ? "bg-blue-100 border-blue-300"
                : ""
            }`}
            title="Sắp xếp theo thời gian tạo"
          >
            Thời gian tạo{" "}
            {sortConfig.key === "createdAt" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500">Không tìm thấy kết quả phù hợp.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nội dung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(booking.selectedDate)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.email}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {booking.selectedContent.join(", ")}
                    </div>
                    {booking.otherContent && (
                      <div className="text-sm text-gray-500">
                        Khác: {booking.otherContent}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {booking.selectedTimes.join(", ")}
                    </div>
                    {booking.otherTime && (
                      <div className="text-sm text-gray-500">
                        Khác: {booking.otherTime}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className={`text-sm rounded-full px-3 py-1 font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="approved">Đã duyệt</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
