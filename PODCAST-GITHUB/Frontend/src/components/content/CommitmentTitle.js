const CommitmentTitle = () => {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <span className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow text-white p-2 rounded-md mr-4">
          &#10004;
        </span>
        <p className="text-lg text-justify font-semibold">
          CAM KẾT BẢO MẬT THÔNG TIN!
        </p>
      </div>

      <div className="flex items-center mb-4">
        <span className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow text-white p-2 rounded-md mr-4">
          &#10004;
        </span>
        <p className="text-base text-justify">
          Thành viên được nhận các chương trình ưu đãi đặc biệt từ hệ thống
          thông báo/nhắc lịch.
        </p>
      </div>

      <div className="flex items-center">
        <span className="bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow text-white p-2 rounded-md mr-4">
          &#10004;
        </span>
        <p className="text-base text-justify">
          Thành viên được đặt lịch thảo luận với TheO và comment/chia sẻ cùng
          nhau giỏi hơn 1% mỗi ngày trên nền tảng này!
        </p>
      </div>
    </div>
  );
};

export default CommitmentTitle;
