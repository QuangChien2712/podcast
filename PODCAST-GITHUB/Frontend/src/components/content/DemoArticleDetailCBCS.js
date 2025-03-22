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

const DemoArticleDetailCBCS = ({ match, history }) => {
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
  const [listCommentContent, setListCommentContens] = useState([]);

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

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
      color: "orange",
      icon: "M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z",
    },
    { label: "Blog", href: "/blog2" },
    { label: "Cân bằng cuộc sống", href: "/blog2" },
    { label: `${content.tenBaiViet}`, href: `/blog2/${match.params.id}` },
  ];

  // const initialComments = [
  //   {
  //     id: 1,
  //     name: "Alice",
  //     text: "This is an amazing post! Thanks for sharing.",
  //     date: "2025-01-21 12:00 PM",
  //   },
  //   {
  //     id: 2,
  //     name: "Bob",
  //     text: "I totally agree with this!",
  //     date: "2025-01-21 12:30 PM",
  //   },
  // ];

  const initialComments = [
    {
      id: "113",
      idContent: "18",
      email: "cvoquang@gmail.com",
      like: "0",
      comment: "sdada",
      share: "0",
    },
    {
      id: "128",
      idContent: "18",
      email: "cvoquang@gmail.com",
      like: "0",
      comment: "đfdfdf",
      share: "0",
    },
    {
      id: "134",
      idContent: "18",
      email: "buiquangquy@gmail.com",
      like: "0",
      comment: "a",
      share: "0",
    },
    {
      id: "135",
      idContent: "18",
      email: "buiquangquy@gmail.com",
      like: "0",
      comment: "b",
      share: "0",
    },
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

export default DemoArticleDetailCBCS;
