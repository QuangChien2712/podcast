import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/me");
    }

    if (error) {
      toast.error("Mật khâủ sai");
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Đăng nhập"} />

          <div className="flex items-center justify-center">
            <div className="text-white bg-gradient-to-r from-cusBgForm-from to-cusBgForm-to p-8 rounded-lg shadow-md w-full max-w-lg mb-20 sm:mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Đăng Nhập
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mật Khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border-white outline-none rounded-lg bg-gradient-to-r from-cusDark-linerInput to-cusDarkYellow"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
                >
                  Đăng nhập
                </button>
                {/* Already have an account */}
                <div className="text-sm text-center text-gray-600 mt-4">
                  Bạn chưa có tài khoản?{" "}
                  <span
                    onClick={() => history.push("/register")}
                    className="text-gray-900 hover:underline cursor-pointer"
                  >
                    Đăng ký
                  </span>
                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center justify-center my-4">
                <span className="h-px bg-gray-300 flex-1"></span>
                <span className="px-2 text-sm text-gray-500">
                  Hoặc đăng nhập
                </span>
                <span className="h-px bg-gray-300 flex-1"></span>
              </div>

              {/* Social Login */}
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300 flex items-center space-x-2"
                  onClick={() => toast.info("Tính năng dang cập nhật")}
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span>Google</span>
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300 flex items-center space-x-2"
                  onClick={() => toast.info("Tính năng dang cập nhật")}
                >
                  <img
                    src="https://www.svgrepo.com/show/157810/facebook.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
