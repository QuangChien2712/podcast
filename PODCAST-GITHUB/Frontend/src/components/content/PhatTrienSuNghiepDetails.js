import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getContentDetailsPTSN,
  newReview,
  getContentReviews,
  deleteReview,
  clearErrors,
} from "../../actions/contentActions";


const PhatTrienSuNghiepDetails = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const contentId = match.params.id;
  
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const {loading, error, content } = useSelector(
    (state) => state.contentDetailsPTSN
  );
  const { reviews } = useSelector((state) => state.contentReviews);
  const { isDeleted } = useSelector((state) => state.review);

  const { user } = useSelector((state) => state.auth);
  const [isLike, setIsLike] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [listCommentContent, setListCommentContens] = useState([]);

  const pathDetails = window.location.pathname;

  useEffect(() => {

    if(String(content.id) !== contentId){
      dispatch(getContentDetailsPTSN(contentId));
      dispatch(getContentReviews(contentId));
    } 
    

      if (reviews && reviews.length > 0 && user) {
        for (let index = 0; index < reviews.length; index++) {
          const element = reviews[index];
          if (element.email === user.email && element.like === "1" && element.idContent === contentId) {
            setIsLike(true);
            break;
          }               
        }
      }else{
        setIsLike(false);
      }   

      if(isDeleted){
        setIsLike(false);
      }
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch(getContentReviews(content.id));
      setIsLike(true);
    }
  }, [
    dispatch,
    alert, 
    error,
    reviewError,
    success,
    contentId,
    user,
    pathDetails,
    content,
    isLike,
    reviews,
    isDeleted,
    history,
  ]);

  useEffect(()=>{
    if(reviews && reviews.length > 0){
      let listreviews = [];
      for (let index = 0; index < reviews.length; index++) {
        const element = reviews[index];
        if(element.comment && element.comment.length > 0){
          listreviews.push(element);
        }        
      }
      
      setListCommentContens(listreviews);
    }else{
      setListCommentContens([]);
    }    
  }, [dispatch, reviews])

  const setArrChuoi = (chuoi, chuoiCat) => {
    let a = chuoi.split(chuoiCat);
    let b = [];
    if (chuoiCat === "CHIEN") {
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (index % 2 === 1) {
          b.push(element);
        }
      }
      return b;
    } else {
      return a;
    }
  };

  const createLike = () => {       
      let dataparam = {
        "like": "1",
        "comment": null,
        "share": "0",
        "idContent": contentId,
        "email": user.email
      }      
      dispatch(newReview(dataparam));
      setIsLike(true);
      dispatch(getContentReviews(contentId));
  };

  const deleteLike = ()=>{
    let dataparam = {
      "like": "1",
      "idContent": contentId,
      "email": user.email
    }      
    dispatch(deleteReview(dataparam));
    setIsLike(false);
    dispatch(getContentReviews(contentId));
  }

  const createComment = ()=>{
    let dataparam = {
      "like": "0",
      "comment": comment,
      "share": "0",
      "idContent": contentId,
      "email": user.email
    }      
    dispatch(newReview(dataparam));
    setOpenComment(false);
    setComment("");
    dispatch(getContentReviews(contentId));
    window.location.reload();
  }

  const shareMangXaHoi = ()=>{
    let linkShare = window.location.href;
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

  return (
    <Fragment>
      <MetaData title={"Nội dung bài viết"} />

      <div className="row">
        <div className="col-12 col-md-12">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div style={{ backgroundColor: "#203162" }}>
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
                        marginLeft: "30px",
                        width: "80px",
                        height: "80px",
                      }}
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013303/hop_phat_trien_su_nghiep_ebwy1t.png"
                    ></img>
                  </div>
                  <div
                    className="col-12 col-md-3"
                    style={{ height: "40%", backgroundColor: "#203162" }}
                  >
                    <img
                      style={{ marginLeft: "-40px", height: "100%" }}
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013301/phat_trien_su_nghiep_duoi_nqa7iq.png"
                    ></img>
                  </div>
                  <div
                    style={{ height: "150px", alignContent: "center" }}
                    className="col-12 col-md-7"
                  >
                    <input
                      style={{
                        marginLeft: "200px",
                        width: "30%",
                        height: "30%",
                      }}
                      type="search"
                      placeholder="Tìm kiếm nội dung"
                    ></input>
                  </div>
                </div>

                <div style={{ height: "50px", backgroundColor: "#203162" }}>
                  <button
                    style={{
                      color: "#19a28d",
                      height: "100%",
                      marginLeft: "50px",
                      borderRadius: "10%",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      {content.tenBaiViet}
                    </span>
                  </button>
                </div>

                <div
                  className="su"
                  style={{
                    ...styleflex,
                    height: "425px",
                    backgroundColor: "#203162",
                    paddingLeft: "25px",
                  }}
                >
                  <div
                    className="col-12 col-md-9"
                    style={{ height: "100%", backgroundColor: "#203162" }}
                  >
                    <span style={{ color: "white" }}>
                      <ul>
                        {content.noiDung &&
                          content.noiDung.split(",").length > 0 &&
                          setArrChuoi(content.noiDung, ",").map(
                            (item, index) => {
                              return (
                                <li
                                  key={index}
                                  style={{
                                    type: "circle",
                                    width: "100%",
                                    height: `${
                                      100 / content.noiDung.split(",").length
                                    }%`,
                                  }}
                                >
                                  {item}
                                </li>
                              );
                            }
                          )}
                      </ul>
                    </span>
                  </div>
                  <div
                    style={{ ...styleflexcolumn, backgroundColor: "#203162" }}
                    className="col-12 col-md-3"
                  >
                    {content.hinhAnh &&
                      content.hinhAnh.split("CHIEN").length > 0 &&
                      setArrChuoi(content.hinhAnh, "CHIEN").map(
                        (item, index) => {
                          return (
                            <img
                              key={index}
                              style={{
                                width: "100%",
                                height: `${
                                  100 / content.hinhAnh.split("CHIEN").length
                                }%`,
                              }}
                              src={item}
                            ></img>
                          );
                        }
                      )}
                  </div>
                </div>

                {
                  (openComment || listCommentContent.length > 0)
                  &&
                  (<div style={{ ...styleflex, height: `${25 * (listCommentContent.length > 8 ? listCommentContent.length : 8) }px`, marginTop: "20px"}}>
                    <div className="col-12 col-md-6" >
                    {listCommentContent && listCommentContent.length > 0 && 
                      listCommentContent.map((item, index)=>{
                        return (                      
                          <div key={index} style={{ ...styleflex, justifyContent: "flex-start" }}>
                          <div><span style={{color: "red", fontWeight: "600"}}>{item.email}</span></div>
                          <div><span style={{color: "white"}}>{item.comment}</span></div>
                          </div>                      
                        )
                      })
                    }
                    </div>
                    
    
                    {openComment && (
                      <div className="col-12 col-md-6" style={{...styleflex, justifyContent: "flex-end"}}>
                      <div className="col-12 col-md-6" style={{padding: "0px 0px 15px 21px"}}>
                      <div className="form-group">
                      
                      <textarea
                        className="form-control"
                        id="comment"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <button onClick={()=>{createComment()}} className="btn-primary" >Gửi</button>
                      </div>
                      </div>
                    )}
    
                    </div>)
                }



                <div
                  style={{
                    ...styleflex,
                    height: "100px",
                    backgroundColor: "#203162",
                  }}
                  className="col-12 col-md-12"
                >
                  <div className="col-12 col-md-2">
                    <span style={{ fontSize: "20px", color: "white" }}>
                      (xem tiếp...)
                    </span>
                  </div>
                  <div
                    style={{ ...styleflex, justifyContent: "flex-start" }}
                    className="col-12 col-md-7"
                  >
                    <div className="col-12 col-md-5"></div>
                    <Link to="/">
                      <img
                        style={{ width: "200%" }}
                        src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013297/ve_trang_chinh2_stofxs.png"
                      ></img>
                    </Link>
                  </div>
                  <div
                    style={{ ...styleflex, justifyContent: "flex-start" }}
                    className="col-12 col-md-3"
                  >
                    {!user ? (
                      <Link to="/login">
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            marginLeft: "15px",
                          }}
                          src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013297/like_pmmg2w.png"
                        ></img>
                      </Link>
                    ) :
                    (isLike ? (
                      <img
                        style={{
                          height: "12%",
                          width: "12%",
                          marginLeft: "15px",
                          cursor: "pointer",
                          borderRadius: "20px"
                        }}
                        onClick={() => {
                          deleteLike();
                        }}
                        src="https://res.cloudinary.com/denvqae4v/image/upload/v1736083064/liked2_rfsrsp.png"
                      ></img>
                    ) : (
                      <img
                        style={{
                          height: "20%",
                          width: "20%",
                          marginLeft: "15px",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          createLike();
                        }}
                        src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013297/like_pmmg2w.png"
                      ></img>
                    ))}




                    {!user ? (
                      <Link to="/login">
                      <img
                      style={{
                        height: "100%",
                        width: "100%",
                        marginLeft: "15px",
                      }}
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013296/binh_luan_difhdo.png"
                    ></img>
                      </Link>
                    ) : (
                      <img
                      onClick={()=>{setOpenComment(!openComment);

                      }}
                      style={{
                        height: "25%",
                        width: "25%",
                        marginLeft: "15px",
                        cursor: "pointer"
                      }}
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013296/binh_luan_difhdo.png"
                    ></img>
                    )}

                    
                    <img
                      style={{
                        height: "25%",
                        width: "25%",
                        marginLeft: "15px",
                      }}
                      onClick={()=>{shareMangXaHoi()}}
                      src="https://res.cloudinary.com/denvqae4v/image/upload/v1736013296/chia_se_t0jz5d.png"
                    ></img>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default PhatTrienSuNghiepDetails;
