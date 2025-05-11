const TimeItemComponent = ({
  item,
  isEditing,
  editingValue,
  onEditChange,
  onToggle,
  onEdit,
  onUpdate,
  onCancelEdit,
  onDelete,
  isProcessing,
}) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
        <input
          type="text"
          value={editingValue}
          onChange={onEditChange}
          className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          autoFocus
        />
        <div className="flex space-x-2">
          <button
            onClick={onUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Lưu
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
      <span className={`flex-1 ${!(item.trangThai === "Hiện") ? "text-gray-400" : ""}`}>
        {item.thoiGianThaoLuan}
      </span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle(item.id)}
          disabled={isProcessing}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            item.trangThai === "Hiện"
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${isProcessing ? "opacity-50 cursor-wait" : ""}`}
        >
          {isProcessing ? "Đang xử lý..." : item.trangThai === "Hiện" ? "Hiện" : "Ẩn"}
        </button>
        <button
          onClick={() => onEdit(item)}
          className="text-blue-500 hover:text-blue-700 p-1"
          title="Sửa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-700 p-1"
          title="Xóa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TimeItemComponent;
