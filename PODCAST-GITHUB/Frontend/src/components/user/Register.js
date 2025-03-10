import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import CommitmentTitle from "../content/CommitmentTitle";
import "../../output.css";


const optionsChooseRole = [
  { label: "Chọn chức danh:", value: "default" },
  { label: "Chủ doanh nghiệp", value: "BusinessOwner" },
  { label: "Quản lý", value: "Manager" },
  { label: "Khác", value: "Other" },
];

const Register = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const redirect = isAuthenticated ? "/" : window.location.pathname;

  useEffect(() => {
    if (isAuthenticated) {
      history.goBack();
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  // Albert
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const file = files[0];
      if (!file) {
        toast.info("Vui lòng chọn ảnh hợp lệ!");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn hình ảnh!");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setFormData({ ...formData, avatar: reader.result });
          }
        } catch (error) {
          toast.error("Lỗi khi tải file ảnh!");
          console.error("Lỗi tải file ảnh:", error);
        }
      };

      reader.readAsDataURL(file);
    } else if (name === "role") {
      setFormData({ ...formData, role: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.gender.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim()
    ) {
      toast.info("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (formData.role === "" || formData.role === "default") {
      toast.info("Vui lòng chọn chức danh");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.info("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const result = await dispatch(register(formData));

      // Logic thông báo đăng ký thất bại hay thành công

      history.push("/login");
    } catch (error) {
      toast.error(error.message || "Đăng ký lỗi, xin vui lòng thử lại!");
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Đăng ký"} />

      <div className="flex flex-col items-center justify-center">
        <div className="text-white bg-gradient-to-r from-cusBgForm-from to-cusBgForm-to p-8 rounded-lg shadow-md w-full max-w-lg mb-20 sm:mt-10">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">
            Đăng Ký Thành Viên
          </h2>
          <form>
            {/* Gender Field */}
            <div className="mb-4">
              <input
                type="text"
                id="gender"
                name="gender"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="Danh xưng: Anh/chị"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role Field */}
            <div className="mb-4">
              <select
                id="role"
                name="role"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="you@example.com"
                value={formData.role}
                onChange={handleChange}
                required
              >
                {optionsChooseRole.map((item) => (
                  <option
                    className="text-black cursor-pointer bg-cusBgForm-to"
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="Email anh/chị"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PhoneNumber Field */}
            <div className="mb-4">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="^[0-9]{10}$"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="Số điện thoại"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image field */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                {/* Vùng hiển thị ảnh */}
                <div className="flex-shrink-0">
                  <figure className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-gray-300">
                    <img
                      src={avatarPreview}
                      className="object-cover w-full h-full"
                      alt="Ảnh nền"
                    />
                  </figure>
                </div>

                {/* Input chọn ảnh */}
                <div className="mt-4 sm:mt-0 w-full">
                  <input
                    type="file"
                    name="avatar"
                    className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer bg-cusBgForm-to focus:outline-none"
                    id="customFile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="customFile"
                    className="block text-sm text-gray-500 mt-1"
                  >
                    Chọn avatar
                  </label>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 border border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full text-white bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
            >
              Đăng ký
            </button>
          </form>

          {/* Already have an account */}
          <div className="text-sm text-center text-gray-600 mt-4">
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => history.push("/login")}
              className="text-gray-900 underline cursor-pointer"
            >
              Đăng nhập
            </span>
          </div>
        </div>
        <CommitmentTitle />
      </div>
    </Fragment>
  );
};

export default Register;
