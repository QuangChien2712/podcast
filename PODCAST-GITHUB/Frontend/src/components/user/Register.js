import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import store from "../../store";
import { loadUser } from "../../actions/userActions";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const { name, phoneNumber, email, password } = user;

  const [images, setImages] = useState("");
  const [imagesPreviews, setImagesPreviews] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = isAuthenticated ? "/" : window.location.pathname;

  useEffect(() => {
    if (isAuthenticated) {
      history.goBack();
    }
    // history.push(redirect);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("phoneNumber", phoneNumber);
    formData.set("email", email);
    formData.set("password", password);
    // formData.set("images", images);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const previewImages = () => {
    return [...imagesPreviews].map((image) => (
      <div>
        <img src={URL.createObjectURL(image)} width="20px" height="20px" />
      </div>
    ));
  };

  // const onChange = (e) => {
  //   if (e.target.name === "images") {

  //     let files = e.target.files;
  //     setImagesPreviews(files);
  //     let arrayImagesString = [];

  //     for (let i = 0; i < files.length; i++) {
  //       (function (file) {
  //         let reader = new FileReader();
  //         reader.onload = (file) => {
  //           arrayImagesString.push(reader.result);

  //           let imagesString = arrayImagesString.join("CHIEN");

  //           if(i === files.length - 1){
  //               setImages(imagesString);
  //           }
  //         };
  //         reader.readAsDataURL(file);
  //       })(files[i]);
  //     }
  //   } else {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   }
  // };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Đăng ký"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3"></h1>

            <div className="form-group">
              <label htmlFor="name_field">Họ và tên</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Số điện thoại</label>
              <input
                type="text"
                id="phone_field"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email (*)</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Mật khẩu (*)</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Hình nền</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Ảnh nền"
                    />
                  </figure>
                </div>

                {/*
                <div className="custom-file">
                  <input
                    type="file"
                    multiple
                    name="images"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Chọn ảnh
                  </label>
                </div>
                {previewImages()}
                */}

                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Chọn ảnh
                  </label>
                </div>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                ĐĂNG KÝ
              </button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
