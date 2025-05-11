import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { newDiscussionContent,
  getAdminDiscussionContents,
  updateDiscussionContent,
  deleteDiscussionContent,

  newDiscussionTime,
  getAdminDiscussionTimes,
  updateDiscussionTime,
  deleteDiscussionTime,
} from "../../actions/bookingActions";

import {
  ADMIN_DISCUSSIONCONTENTS_SUCCESS,
  NEW_DISCUSSIONCONTENT_SUCCESS,
  UPDATE_DISCUSSIONCONTENT_SUCCESS,
  DELETE_DISCUSSIONCONTENT_SUCCESS,
  NEW_DISCUSSIONCONTENT_RESET,
  UPDATE_DISCUSSIONCONTENT_RESET,
  DELETE_DISCUSSIONCONTENT_RESET,

  ADMIN_DISCUSSIONTIMES_SUCCESS,
  NEW_DISCUSSIONTIME_SUCCESS,
  UPDATE_DISCUSSIONTIME_SUCCESS,
  DELETE_DISCUSSIONTIME_SUCCESS,
  NEW_DISCUSSIONTIME_RESET,
  UPDATE_DISCUSSIONTIME_RESET,
  DELETE_DISCUSSIONTIME_RESET,
 } from '../../constants/bookingConstants';

import { useCallback, memo } from "react";
import ManageBookingContentItem from "./ManageBookingContentItem";
import ManageBookingTimeItem from "./ManageBookingTimeItem";
import Sidebar from "./Sidebar";

// Memoize để tối ưu hiệu suất
const ContentItem = memo(ManageBookingContentItem);
const TimeItem = memo(ManageBookingTimeItem);

// Component chính
const ManageBookingContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { error, success } = useSelector((state) => state.newDiscussionContent);
  const { discussioncontents } = useSelector((state) => state.discussioncontents);
  const { isUpdated, isDeleted } = useSelector((state) => state.discussioncontent);

  const { errorT, successT } = useSelector((state) => state.newDiscussionTime);
  const { discussiontimes } = useSelector((state) => state.discussiontimes);
  const { isUpdatedT, isDeletedT } = useSelector((state) => state.discussiontime);

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
    dispatch(getAdminDiscussionContents());
    dispatch(getAdminDiscussionTimes());
  }, []);

  useEffect(() => {
    dispatch(getAdminDiscussionContents());
    dispatch({type:  NEW_DISCUSSIONCONTENT_RESET});
    dispatch({type:  UPDATE_DISCUSSIONCONTENT_RESET});
    dispatch({type:  DELETE_DISCUSSIONCONTENT_RESET});
  }, [success, isUpdated, isDeleted]);

  useEffect(() => {
    setContents(discussioncontents);
  }, [discussioncontents]);

  useEffect(() => {
    dispatch(getAdminDiscussionTimes());
    dispatch({type:  NEW_DISCUSSIONTIME_RESET});
    dispatch({type:  UPDATE_DISCUSSIONTIME_RESET});
    dispatch({type:  DELETE_DISCUSSIONTIME_RESET});
  }, [successT, isUpdatedT, isDeletedT]);

  useEffect(() => {
    setTimes(discussiontimes);
  }, [discussiontimes]);

  // Content handlers
  const handleAddContent = async () => {
    if (!newContent.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return;
    }

    try {
      setLoading(true);
      const newContentItem = {
        noiDungThaoLuan: newContent,
        trangThai: "Hiện",
      };

      dispatch(newDiscussionContent(newContentItem));
      dispatch({ type: NEW_DISCUSSIONCONTENT_SUCCESS });

      // setContents([...contents, newContentItem]);
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
        const contentupdate = {...contentToToggle, trangThai: contentToToggle.trangThai === "Hiện" ? "Ẩn": "Hiện"}


        dispatch(updateDiscussionContent(contentupdate));
        dispatch({ type: UPDATE_DISCUSSIONCONTENT_SUCCESS });
      

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
    if (!editingContent.noiDungThaoLuan.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return;
    }

    try {
      setLoading(true);
      const contentupdate = {
        id: editingContent.id,
        noiDungThaoLuan: editingContent.noiDungThaoLuan,
        trangThai: editingContent.trangThai
        }

      dispatch(updateDiscussionContent(contentupdate));
      dispatch({ type: UPDATE_DISCUSSIONCONTENT_SUCCESS });

    
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

      dispatch(deleteDiscussionContent(id))
      dispatch({type: DELETE_DISCUSSIONCONTENT_SUCCESS})

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

      const newTimeItem = {
        thoiGianThaoLuan: newTime,
        trangThai: "Hiện",
      };

      dispatch(newDiscussionTime(newTimeItem));
      dispatch({ type: NEW_DISCUSSIONTIME_SUCCESS });
      
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

        const timeupdate = {...timeToToggle, trangThai: timeToToggle.trangThai === "Hiện" ? "Ẩn": "Hiện"}


        dispatch(updateDiscussionTime(timeupdate));
        dispatch({ type: UPDATE_DISCUSSIONTIME_SUCCESS });

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

  const handleDeleteTime = (id) => {
    setConfirmDelete({ show: true, id, type: "time" });
  };

  const handleDeleteTimeConfirmed = async (id) => {
    try {
      setLoading(true);

      dispatch(deleteDiscussionTime(id))
      dispatch({type: DELETE_DISCUSSIONTIME_SUCCESS})
     
      toast.success("Xóa thành công");
    } catch (error) {
      console.error("Error deleting time:", error);
      toast.error("Không thể xóa");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTime = async (id) => {
    if (!editingTime.thoiGianThaoLuan.trim()) {
      toast.error("Vui lòng nhập thời gian");
      return;
    }

    try {
      setLoading(true);

      const timeupdate = {
        id: editingTime.id,
        thoiGianThaoLuan: editingTime.thoiGianThaoLuan,
        trangThai: editingTime.trangThai
        }

      dispatch(updateDiscussionTime(timeupdate));
      dispatch({ type: UPDATE_DISCUSSIONTIME_SUCCESS });

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
      <div className="flex">
      <div className="w-64 fixed left-0 top-0 h-screen bg-gray-800 shadow-lg">
					<Sidebar />
				</div>      
      <div className="flex-1 p-6" style={{ marginLeft: '300px' }}>
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
          {loading && contents && contents.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : (contents && contents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có nội dung nào
            </div>
          ) : (
            <div className="space-y-2">
              {contents && contents.length > 0 && contents.map((item, index) => (
                <ContentItem
                  key={index}
                  item={item}
                  isEditing={editingContent?.id === item.id}
                  editingValue={editingContent?.noiDungThaoLuan}
                  onEditChange={(e) =>
                    setEditingContent({
                      ...editingContent,
                      noiDungThaoLuan: e.target.value,
                    })
                  }
                  onToggle={handleToggleContent}
                  onEdit={() =>
                    setEditingContent({ id: item.id, noiDungThaoLuan: item.noiDungThaoLuan })
                  }
                  onUpdate={() => handleUpdateContent(item.id)}
                  onCancelEdit={() => setEditingContent(null)}
                  onDelete={handleDeleteContent}
                  isProcessing={processingItems.contents.has(item.id)}
                />
              ))}
            </div>
          ))}
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
          {loading && times && times.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : (times && times.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có thời gian nào
            </div>
          ) : (
            <div className="space-y-2">
              {times && times.length > 0 && times.map((item, index) => (
                <TimeItem
                  key={index}
                  item={item}
                  isEditing={editingTime?.id === item.id}
                  editingValue={editingTime?.thoiGianThaoLuan}
                  onEditChange={(e) =>
                    setEditingTime({
                      ...editingTime,
                      thoiGianThaoLuan: e.target.value,
                    })
                  }
                  onToggle={handleToggleTime}
                  onEdit={() =>
                    setEditingTime({ id: item.id, thoiGianThaoLuan: item.thoiGianThaoLuan })
                  }
                  onUpdate={() => handleUpdateTime(item.id)}
                  onCancelEdit={() => setEditingTime(null)}
                  onDelete={handleDeleteTime}
                  isProcessing={processingItems.times.has(item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default ManageBookingContent;
