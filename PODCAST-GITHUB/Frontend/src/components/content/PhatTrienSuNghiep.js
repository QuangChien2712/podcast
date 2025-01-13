import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAdminContentsPTSN } from "../../actions/contentActions";

const PhatTrienSuNghiep = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [distance, setDistance] = useState(3);
  const [distanceDiv, setDistanceDiv] = useState(0);
  const [chuoiTimKiem, setChuoiTimKiem] = useState("");
  const [listResultSearch, setListResultSearch] = useState([]);
  const [isOpenResultSearch, setIsOpenResultSearch] = useState(false);
  
  const { loading, error, contents } = useSelector(
    (state) => state.contentsPTSN
  );

  

  useEffect(() => {
    // if(contents && contents.length === 0){
    //     dispatch(getAdminContentsPTSN("HM1"));
    // }    

    dispatch(getAdminContentsPTSN("HM1"));
  }, [dispatch, alert, error, history]);

  const handleLimitContents = (arrData, distance) => {
    let arrLimit = [];
    let lengthArrData = arrData.length;
    if (lengthArrData <= distance) {
      arrLimit = [...arrData];
      return arrLimit;
    } else {
      arrLimit = arrData.slice(0, distance);
      return arrLimit;
    }
  };

  const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

const handleTimKiem = (chuoiSearch, data) => {
    let listResult = [];
    let UpCase = "";
    let LoCase = "";

    for (let i = 0; i < data.length; i++) {
      let element = (data[i].noiDung).concat(data[i].tenBaiViet);
      UpCase = chuoiSearch.toUpperCase();
      LoCase = chuoiSearch.toLowerCase();
      if (element.includes(UpCase) || element.includes(LoCase)){
        listResult.push(data[i]);
      }
    }
    setListResultSearch(listResult); 

    if (listResult.length > 0 && chuoiSearch.length >= 2) {      
        setIsOpenResultSearch(true)      
    } else {
      setIsOpenResultSearch(false)
    }
  };


  const reLoad = ()=>{
    window.location.reload();
  }

  const styleflex = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const styleflexcolumn = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const styleThemBot = {
    marginTop: "3px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "3px",
  };

  return (
    <Fragment>
      <MetaData title={"Phát triển sự nghiệp"} />

      <div className="row">
        <div className="col-12 col-md-12">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div>
                <div
                  className="su"
                  style={{
                    ...styleflex,
                    height: "150px",
                    backgroundColor: "#203162",
                  }}
                >
                  <div className="col-12 col-md-2">
                    <img
                      style={{
                        marginLeft: "30%",
                        width: "110px",
                        height: "110px",
                      }}
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013303/hop_phat_trien_su_nghiep_ebwy1t.png"
                    ></img>
                  </div>
                  <div style={{ height: "150px" }} className="col-12 col-md-8">
                    <input
                      style={{ marginTop: "90px", width: "80%", height: "25%" }}
                      type="search"
                      placeholder="Tìm kiếm nội dung"
                      value={chuoiTimKiem}
                      onChange={(e) => {
                        setChuoiTimKiem(e.target.value);
                        handleTimKiem(chuoiTimKiem, contents);
                      }}
                    ></input>
                  </div>

                  <div className="col-12 col-md-2">
                  <Link to="/">
                  <img src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013303/ve_trang_chinh_odjrrm.png"></img>
                  </Link>
                    
                  </div>

                </div>

{
  isOpenResultSearch && (
    <div
    className="su"
    style={{
      ...styleflex,
      height: `${distanceDiv + 600}px`,
      backgroundColor: "#203162",
    }}
  >
    <div
      className="col-12 col-md-9"
      style={{ height: "100%", backgroundColor: "#203162" }}
    >
      {listResultSearch &&
        listResultSearch.length > 0 &&
        handleLimitContents(listResultSearch, distance).map(
          (item, index) => {
            return (
              <div
                key={index}
                style={{
                  ...styleflex,
                  height: `${90/(distance > listResultSearch.length ? listResultSearch.length : distance)}%`,
                  backgroundColor: "#203162",
                  marginBottom: "10px",                                
                }}
              >
                <div
                  style={{
                    width: "18%",
                    height: "100%",
                    backgroundColor: "#203162",
                    
                  }}
                >
                  <Link to={`/phat-trien-su-nghiep/${item.id}`}>
                    <img
                      src={item.hinhAnh.split("CHIEN")[1]}
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </Link>
                </div>
                <div
                  style={{
                    ...styleflexcolumn,
                    width: "82%",
                    height: "100%",
                    backgroundColor: "#203162",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      backgroundColor: "#203162",
                    }}
                  >
                    <Link to={`/phat-trien-su-nghiep/${item.id}`}>
                      <span style={{color: "white", fontWeight: "600", fontSize: "30px"}}>{item.tenBaiViet}</span>
                    </Link>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "70%",
                      backgroundColor: "#203162",
                    }}
                  >
                  <span style={{color: "white", fontWeight: "300", fontSize: "20px"}}>{item.moTaNgan}</span>
                  </div>
                </div>
              </div>
            );
          }
        )}

      <div
        className="thembot"
        style={{ ...styleThemBot, height: "7%" }}
      >

      {distance < listResultSearch.length && (
        <button
          style={{ borderRadius: "10%" }}
          className="btn-primary"
          onClick={() => {
            setDistance(distance + 3);
            setDistanceDiv(distanceDiv + 600);
          }}
        >
          ...Xem thêm
        </button>
      )}
        
        
        {distance !== 3 && (
          <button
            className="btn-warning"
            style={{ borderRadius: "10%" }}
            onClick={() => {
              setDistance(3);
              setDistanceDiv(0);
            }}
          >
            Rút gọn
          </button>
        )}
      </div>
    </div>
    <div style={{...styleflex}} className="col-12 col-md-3">
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013302/hinh1_bmn8kr.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/hinh2_erxkjd.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/hinh3_vxusru.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013297/hinh4_a051nt.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/hinh2_erxkjd.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013302/hinh1_bmn8kr.png"
    ></img>
    </div>
  </div>
  )
}

{
  !isOpenResultSearch && (
    <div
    className="su"
    style={{
      ...styleflex,
      height: `${distanceDiv + 600}px`,
      backgroundColor: "#203162",
    }}
  >
    <div
      className="col-12 col-md-9"
      style={{ height: "100%", backgroundColor: "#203162" }}
    >
      {contents &&
        contents.length > 0 &&
        handleLimitContents(contents, distance).map(
          (item, index) => {
            return (
              <div
                key={index}
                style={{
                  ...styleflex,
                  height: `${90/(distance > contents.length ? contents.length : distance)}%`,
                  backgroundColor: "#203162",
                  marginBottom: "10px",                                
                }}
              >
                <div
                  style={{
                    width: "18%",
                    height: "100%",
                    backgroundColor: "#203162",
                    
                  }}
                >
                  <Link onClick={()=>{setTimeout(reLoad, 1000)}} to={`/phat-trien-su-nghiep/${item.id}`}>
                    <img
                      src={item.hinhAnh.split("CHIEN")[1]}
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </Link>
                </div>
                <div
                  style={{
                    ...styleflexcolumn,
                    width: "82%",
                    height: "100%",
                    backgroundColor: "#203162",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      backgroundColor: "#203162",
                    }}
                  >
                    <Link onClick={()=>{setTimeout(reLoad, 1000)}} to={`/phat-trien-su-nghiep/${item.id}`}>
                      <span style={{color: "white", fontWeight: "600", fontSize: "30px"}}>{item.tenBaiViet}</span>
                    </Link>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "70%",
                      backgroundColor: "#203162",
                    }}
                  >
                  <span style={{color: "white", fontWeight: "300", fontSize: "20px"}}>{item.moTaNgan}</span>
                  </div>
                </div>
              </div>
            );
          }
        )}

      <div
        className="thembot"
        style={{ ...styleThemBot, height: "7%" }}
      >
        
      {distance < contents.length && (
        <button
          style={{ borderRadius: "10%" }}
          className="btn-primary"
          onClick={() => {
            setDistance(distance + 3);
            setDistanceDiv(distanceDiv + 600);
          }}
        >
          ...Xem thêm
        </button>
      )}
        {distance !== 3 && (
          <button
            className="btn-warning"
            style={{ borderRadius: "10%" }}
            onClick={() => {
              setDistance(3);
              setDistanceDiv(0);
            }}
          >
            Rút gọn
          </button>
        )}
      </div>
    </div>
    <div style={{...styleflex}} className="col-12 col-md-3">
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013302/hinh1_bmn8kr.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/hinh2_erxkjd.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/hinh3_vxusru.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013297/hinh4_a051nt.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/hinh2_erxkjd.png"
    ></img>
    <img
      style={{ width: "50%" }}
      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013302/hinh1_bmn8kr.png"
    ></img>
    </div>
  </div>
  )
}


               


                <div style={{ height: "100px", backgroundColor: "#203162" }}>
                  <img
                    style={{ height: "100%" }}
                    src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/phat_trien_su_nghiep_duoi_nqa7iq.png"
                  ></img>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default PhatTrienSuNghiep;
