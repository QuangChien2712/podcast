import ArticleDetail from "../layout/ArticleDetail";
import Breadcrumb from "../layout/Breadcrumb";

import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getContentDetailsPTSN,
  getContentReviews,
  newReview,
  deleteReview,
  clearErrors,
} from "../../actions/contentActions";

const DemoArticleDetailPTSN = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const contentId = match.params.id;

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const { loading, error, content } = useSelector(
    (state) => state.contentDetailsPTSN
  );
  const { reviews } = useSelector((state) => state.contentReviews);
  const { isDeleted } = useSelector((state) => state.review);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isLike, setIsLike] = useState(false);
  const [comment, setComment] = useState("");

  const [listCommentContent, setListCommentContens] = useState([]);
  const pathDetails = window.location.pathname;

  useEffect(() => {
    if (String(content.id) !== contentId || !match.params.id) {
      dispatch(getContentDetailsPTSN(contentId));
      dispatch(getContentReviews(contentId));
    }

    if (!Number(contentId)) {
      history.goBack();
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    alert,
    error,
    reviewError,
    success,
    contentId,
    content.id,
    pathDetails,
    match.params.id,
    history,
  ]);

  useEffect(() => {
    let listreviews = [];
    if (reviews && reviews.length > 0) {
      for (let index = 0; index < reviews.length; index++) {
        const element = reviews[index];
        if (element.comment && element.comment.length > 0) {
          listreviews.push(element);
          setListCommentContens(listreviews);
        }
      }
      setListCommentContens(listreviews);
    } else {
      setListCommentContens(reviews);
    }
  }, [dispatch, reviews]);

  const createLike = () => {
      let dataparam = {
        like: "1",
        comment: null,
        share: "0",
        idContent: contentId,
        email: user.email,
      };
      dispatch(newReview(dataparam));
      setIsLike(true);
      dispatch(getContentReviews(contentId));
    };
  
    const deleteLike = () => {
      let dataparam = {
        like: "1",
        idContent: contentId,
        email: user.email,
      };
      dispatch(deleteReview(dataparam));
      setIsLike(false);
      dispatch(getContentReviews(contentId));
    };

    
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
      color: "orange",
      icon: "M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z",
    },
    { label: "Blog", href: "/blog1" },
    { label: "Phát triển sự nghiệp", href: "/blog1" },
    { label: `${content.tenBaiViet}`, href: `/blog1/${match.params.id}` },
  ];

  return (
    <>
      <div className="mt-4 ml-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <ArticleDetail
        image={
          content && content.hinhAnh ? content.hinhAnh.split("CHIEN")[1] : ""
        }
        title={content.tenBaiViet}
        content={content.noiDung}
        author={"Theo"}
        publishedAt={`${new Date(content.createdAt).getDate()}/${new Date(content.createdAt).getMonth() + 1}/${new Date(content.createdAt).getFullYear()}`}
        comments={listCommentContent}
      />
    </>
  );
};

export default DemoArticleDetailPTSN;
