import React, { Fragment, useEffect } from "react";
import "rc-slider/assets/index.css";
import MetaData from "./layout/MetaData";
import Sliderr from "../components/layout/Slider";
import CustomSection from "./layout/CustomSection";
import ButtonTitle from "./layout/ButtonTitle";
import { Link } from "react-router-dom";

const Home = ({ match }) => {
  return (
    <>
      {/* Better every day */}
      <div
        id="section-blog"
        className="bg-black w-screen flex items-center justify-center relative sm:max-h-[600px]"
        style={{ height: "900px" }}
      >
        {/* Background Image */}
        <div className="bg-TheoO1 max-w-[400px] w-full bg-center bg-cover bg-no-repeat h-80 sm:h-60">
          {/* Overlay Content */}
          <div className="flex flex-col w-full h-full bg-black bg-opacity-50">
            <h1 className=" mt-[-54px] font-svnCookies text-white text-4xl uppercase font-bold text-center">
              Giúp Người Trẻ
              <br />
              Giỏi Hơn 1% Mỗi Ngày
            </h1>

            <h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case text-center">
              "Bằng Cách Biến Mỗi Click <br /> trở nên có ý nghĩa!"
            </h3>

            <div className="w-full mt-[120px]">
              <CustomSection
                title="Sợ Gì Làm Đó! & THEO'S BLOG"
                subtitle={
                  <>
                    WORKSHOP MAY ĐO <br />
                    GẦN NHẤT
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-gray-200"></div>

      {/* Doanh Thu va Loi Nhuan */}
      <div
        id="section-career"
        className="bg-black w-screen flex items-center justify-center relative sm:max-h-[600px] pb-36"
        style={{ height: "900px" }}
      >
        {/* Background Image */}
        <div className="bg-TheoO2 max-w-[400px] w-full bg-center bg-cover bg-no-repeat h-80 sm:h-60">
          {/* Overlay Content */}
          <div className="flex flex-col w-full h-full bg-black bg-opacity-50">
            <h1 className=" mt-[-54px] font-svnCookies text-white text-4xl uppercase font-bold text-center">
              Bí Quyết Tăng
              <br />
              Doanh Thu & Lợi Nhuận
            </h1>

            <h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case font-bold text-center">
              "Bằng Công Thức Đã Được Chứng Minh <br /> thành công trên toàn thế
              giới!"
            </h3>

            <Link to="/blog1" className="float-right mt-3">
              <div className="w-full mt-[100px]">
                <CustomSection
                  title="Phát Triển Sự Nghiệp"
                  subtitle={
                    <>
                      WORKSHOP MAY ĐO <br />
                      GẦN NHẤT
                    </>
                  }
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-gray-200"></div>

      {/* Niem Vui Phong Cach Song */}
      <div
        id="section-balance"
        className="bg-black w-screen flex items-center justify-center relative max-h-[800px] h-screen sm:max-h-[600px] pb-56"
        style={{ height: "900px" }}
      >
        {/* Background Image */}
        <div className="bg-TheoO3 max-w-[400px] w-full bg-center bg-cover bg-no-repeat h-80 sm:h-60">
          {/* Overlay Content */}
          <div className="flex flex-col w-full h-full bg-black bg-opacity-50">
            <h1 className="mt-[-54px] font-svnCookies text-white text-3xl uppercase font-bold text-center">
              Chế Tác
              <br />
              Niề m Vui & Phong Cách Sống
            </h1>

            <h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case font-bold text-center">
              "Thông qua mở rộng góc nhìn và tạo <br /> ra trải nghiệm phong
              phú!"
            </h3>

            <Link to="/blog2" className="float-right mt-3">
              <div className="w-full mt-[100px]">
                <CustomSection
                  title="Cân Bằng Cuộc Sống"
                  subtitle={
                    <>
                      WORKSHOP MAY ĐO <br />
                      GẦN NHẤT
                    </>
                  }
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
