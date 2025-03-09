import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Thông tin cá nhân"} />

          <div className="container sm:mt-12 mx-auto p-4 bg-gradient-to-r from-cusBgForm-from to-cusBgForm-to">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 uppercase">
              Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-5">
              <div className="flex flex-col items-center">
                <figure className="overflow-hidden">
                  <img
                    className="rounded-full object-cover w-[200px]"
                    src={
                      user.avatar.split("CHIEN")
                        ? user.avatar.split("CHIEN")[1]
                        : ""
                    }
                    alt={user.name}
                  />
                </figure>
                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="w-2/3 text-center py-2 px-4 bg-orange-300 hover:bg-orange-400 text-black hover:text-black font-bold rounded my-5"
                >
                  Sửa thông tin
                </Link>
              </div>

              <div className="min-w-full bg-white shadow-lg rounded-lg p-6 md:px-12">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Họ và tên
                </h4>
                <p className="text-gray-600 mb-4">{user.name}</p>

                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Email
                </h4>
                <p className="text-gray-600 mb-4">{user.email}</p>

                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Ngày tham gia
                </h4>
                <p className="text-gray-600 mb-6">
                  {String(user.createdAt).substring(0, 10)}
                </p>

                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Mô tả bản thân
                </h4>
                <p className="text-gray-600 mb-6">
                  {user?.description || <div>Đang trống</div>}
                </p>

                <Link
                  to="/password/update"
                  className="w-2/3 block text-center py-2 bg-orange-300 hover:bg-orange-400 text-black hover:text-black font-bold rounded my-5"
                >
                  Thay đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
