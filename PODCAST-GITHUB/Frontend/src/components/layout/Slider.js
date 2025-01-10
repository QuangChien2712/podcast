import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sliderr extends Component {
  render() {
    return (
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        {/*   
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://cdn-crownx.winmart.vn/images/prod/5_f57517d5-2c25-4edb-a372-9bc83971ef1b.jpg" height={500} alt="First slide" />
                    </div>                   
                </div>

            */}

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://res.cloudinary.com/denvqae4v/image/upload/v1736399005/podcast/trang1_lr6x0j.png"
              height={750}
              alt="First slide"
            />
          </div>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              style={{
                backgroundImage: `url(
                  "https://res.cloudinary.com/denvqae4v/image/upload/v1736398996/podcast/trang2_fwy5cu.png"
                )`,
                fontSize: "50px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: 750,
                marginTop: "3px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "3px",
              }}
              alt="Second slide"
            >
              <div>
                <Link to="/phat-trien-su-nghiep" className="float-right mt-3">
                  <div style={{ height: 100, width: 200 }}>
                    <img
                      className="d-block w-100"
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736399001/podcast/phat_trien_su_nghiep_ezwxu1.png"
                      alt="Second slide"
                    />
                  </div>
                </Link>
              </div>

              <div>
                <Link to="/phat-trien-su-nghiep" className="float-right mt-3">
                  <div style={{ height: 100, width: 200 }}>
                    <img
                      className="d-block w-100"
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736399000/podcast/can_bang_cuoc_song_bl4vsp.png"
                      alt="Second slide"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sliderr;
