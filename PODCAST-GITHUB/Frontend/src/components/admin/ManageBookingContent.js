import React, { useState, useEffect, useCallback, memo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ManageBookingContentItem from "./ManageBookingContentItem";

const mockContents = [
  {
    id: "1",
    content: "Tăng doanh thu & lợi nhuận",
    createdAt: "2024-04-09T08:00:00.000Z",
    isActive: true,
  },
  {
    id: "2",
    content: "Xây dựng đội ngũ",
    createdAt: "2024-04-09T08:01:00.000Z",
    isActive: true,
  },
  {
    id: "3",
    content: "Xây dựng hệ thống",
    createdAt: "2024-04-09T08:02:00.000Z",
    isActive: false,
  },
];

const mockTimes = [
  {
    id: "1",
    time: "14:00 - 16:00",
    createdAt: "2024-04-09T08:00:00.000Z",
    isActive: true,
  },
  {
    id: "2",
    time: "15:30 - 16:30",
    createdAt: "2024-04-09T08:01:00.000Z",
    isActive: true,
  },
  {
    id: "3",
    time: "10:15 - 12:00",
    createdAt: "2024-04-09T08:02:00.000Z",
    isActive: true,
  },
];

// Memoize để tối ưu hiệu suất
const ContentItem = memo(ManageBookingContentItem);

// Component chính
const ManageBookingContent = () => {
  const [contents, setContents] = useState([]);
  const [times, setTimes] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [newTime, setNewTime] = useState("");
  const [editingContent, setEditingContent] = useState(null);
  const [editingTime, setEditingTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // State để theo dõi mục đang được xử lý
  const [processingItems, setProcessingItems] = useState({
    contents: new Set(),
    times: new Set(),
  });

  // State cho modal xác nhận
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: null,
    type: null, // 'content' hoặc 'time'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Giả lập delay API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setContents(mockContents);
      setTimes(mockTimes);
    } catch (error) {
      toast.error("Không thể tải dữ liệu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Content handlers
  const handleAddContent = async () => {
    if (!newContent.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return;
    }

    try {
      setLoading(true);

      // API call
      // const res = await axios.post("/api/admin/discuss-contents", { content: newContent });

      // Mock response
      const newId = `content-${Date.now()}`;
      const newContentItem = {
        id: newId,
        content: newContent,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      setContents([...contents, newContentItem]);
      setNewContent("");
      toast.success("Thêm nội dung thành công");
    } catch (error) {
      console.error("Error adding content:", error);
      toast.error("Không thể thêm nội dung");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleContent = useCallback(
    async (id) => {
      try {
        setProcessingItems((prev) => ({
          ...prev,
          contents: new Set([...prev.contents, id]),
        }));

        const contentToToggle = contents.find((item) => item.id === id);

        // API call
        // await axios.patch(`/api/admin/discuss-contents/${id}`, {
        //   isActive: !contentToToggle.isActive,
        // });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setContents(
          contents.map((item) =>
            item.id === id ? { ...item, isActive: !item.isActive } : item
          )
        );

        toast.success("Cập nhật trạng thái thành công");
      } catch (error) {
        console.error("Error toggling content:", error);
        toast.error("Không thể cập nhật trạng thái");
      } finally {
        setProcessingItems((prev) => {
          const updatedContents = new Set(prev.contents);
          updatedContents.delete(id);
          return { ...prev, contents: updatedContents };
        });
      }
    },
    [contents]
  );

  const handleUpdateContent = async (id) => {
    if (!editingContent.content.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return;
    }

    try {
      setLoading(true);

      // API call
      // await axios.put(`/api/admin/discuss-contents/${id}`, editingContent);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setContents(
        contents.map((item) =>
          item.id === id ? { ...item, content: editingContent.content } : item
        )
      );
      setEditingContent(null);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Không thể cập nhật");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContent = (id) => {
    setConfirmDelete({ show: true, id, type: "content" });
  };

  const handleDeleteContentConfirmed = async (id) => {
    try {
      setLoading(true);

      // API call
      // await axios.delete(`/api/admin/discuss-contents/${id}`);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setContents(contents.filter((item) => item.id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Không thể xóa");
    } finally {
      setLoading(false);
    }
  };

  // Tương tự cho các hàm xử lý Time
  const handleAddTime = async () => {
    if (!newTime.trim()) {
      toast.error("Vui lòng nhập thời gian");
      return;
    }

    try {
      setLoading(true);

      // API call
      // const res = await axios.post("/api/admin/discuss-times", { time: newTime });

      // Mock response
      const newId = `time-${Date.now()}`;
      const newTimeItem = {
        id: newId,
        time: newTime,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      setTimes([...times, newTimeItem]);
      setNewTime("");
      toast.success("Thêm thời gian thành công");
    } catch (error) {
      console.error("Error adding time:", error);
      toast.error("Không thể thêm thời gian");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTime = useCallback(
    async (id) => {
      try {
        setProcessingItems((prev) => ({
          ...prev,
          times: new Set([...prev.times, id]),
        }));

        const timeToToggle = times.find((item) => item.id === id);

        // API call
        // await axios.patch(`/api/admin/discuss-times/${id}`, {
        //   isActive: !timeToToggle.isActive,
        // });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setTimes(
          times.map((item) =>
            item.id === id ? { ...item, isActive: !item.isActive } : item
          )
        );

        toast.success("Cập nhật trạng thái thành công");
      } catch (error) {
        console.error("Error toggling time:", error);
        toast.error("Không thể cập nhật trạng thái");
      } finally {
        setProcessingItems((prev) => {
          const updatedTimes = new Set(prev.times);
          updatedTimes.delete(id);
          return { ...prev, times: updatedTimes };
        });
      }
    },
    [times]
  );

  const handleDeleteTimeConfirmed = async (id) => {
    try {
      setLoading(true);

      // API call
      // await axios.delete(`/api/admin/discuss-times/${id}`);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTimes(times.filter((item) => item.id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      console.error("Error deleting time:", error);
      toast.error("Không thể xóa");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTime = async (id) => {
    if (!editingTime.time.trim()) {
      toast.error("Vui lòng nhập thời gian");
      return;
    }

    try {
      setLoading(true);

      // API call
      // await axios.put(`/api/admin/discuss-times/${id}`, editingTime);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTimes(
        times.map((item) =>
          item.id === id ? { ...item, time: editingTime.time } : item
        )
      );
      setEditingTime(null);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error updating time:", error);
      toast.error("Không thể cập nhật");
    } finally {
      setLoading(false);
    }
  };

  // Component xác nhận xóa
  const ConfirmDeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
        <p className="mb-6">
          Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() =>
              setConfirmDelete({ show: false, id: null, type: null })
            }
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              if (confirmDelete.type === "content") {
                handleDeleteContentConfirmed(confirmDelete.id);
              } else {
                handleDeleteTimeConfirmed(confirmDelete.id);
              }
              setConfirmDelete({ show: false, id: null, type: null });
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {confirmDelete.show && <ConfirmDeleteModal />}

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Quản lý nội dung đặt lịch</h1>

        {/* Quản lý Content */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Nội dung thảo luận</h2>

          {/* Form thêm mới */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Nhập nội dung mới"
              className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddContent}
              disabled={loading}
              className={`px-4 py-2 rounded font-medium transition duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Đang xử lý..." : "Thêm"}
            </button>
          </div>

          {/* Danh sách content với styling cải thiện */}
          {loading && contents.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : contents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có nội dung nào
            </div>
          ) : (
            <div className="space-y-2">
              {contents.map((item) => (
                <ContentItem
                  key={item.id}
                  item={item}
                  isEditing={editingContent?.id === item.id}
                  editingValue={editingContent?.content}
                  onEditChange={(e) =>
                    setEditingContent({
                      ...editingContent,
                      content: e.target.value,
                    })
                  }
                  onToggle={handleToggleContent}
                  onEdit={() =>
                    setEditingContent({ id: item.id, content: item.content })
                  }
                  onUpdate={() => handleUpdateContent(item.id)}
                  onCancelEdit={() => setEditingContent(null)}
                  onDelete={handleDeleteContent}
                  isProcessing={processingItems.contents.has(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quản lý Time - Tương tự như Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thời gian thảo luận</h2>

          {/* Form thêm mới */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Nhập thời gian mới (VD: 14:00 - 16:00)"
              className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddTime}
              disabled={loading}
              className={`px-4 py-2 rounded font-medium transition duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Đang xử lý..." : "Thêm"}
            </button>
          </div>

          {/* Danh sách time */}
          {loading && times.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : times.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có thời gian nào
            </div>
          ) : (
            <div className="space-y-2">
              {times.map((item) => (
                <ContentItem
                  key={item.id}
                  item={{ ...item, content: item.time }}
                  isEditing={editingTime?.id === item.id}
                  editingValue={editingTime?.time}
                  onEditChange={(e) =>
                    setEditingTime({
                      ...editingTime,
                      time: e.target.value,
                    })
                  }
                  onToggle={handleToggleTime}
                  onEdit={() =>
                    setEditingTime({ id: item.id, time: item.time })
                  }
                  onUpdate={() => handleUpdateTime(item.id)}
                  onCancelEdit={() => setEditingTime(null)}
                  onDelete={(id) =>
                    setConfirmDelete({ show: true, id, type: "time" })
                  }
                  isProcessing={processingItems.times.has(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBookingContent;
