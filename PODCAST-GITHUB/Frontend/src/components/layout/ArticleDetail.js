import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getContentReviews,
  newReview,
  deleteReview,
  clearErrors,
} from "../../actions/contentActions";
import CommentSection from "./CommentSection";
import ContentSection from "./NoiDungSection";

const ArticleDetail = ({
  image,
  title,
  content,
  author,
  publishedAt,
  comments,
}) => {
  const { reviews } = useSelector((state) => state.contentReviews);
  const reLoad = () => {
    window.location.reload();
  };

  const alert = useAlert();
  const dispatch = useDispatch();

  const contentId = window.location.pathname.split("/")[2];

  const { user } = useSelector((state) => state.auth);
  const [isLike, setIsLike] = useState(false);

  const { isDeleted } = useSelector((state) => state.review);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    if (reviews && reviews.length > 0 && user) {
      for (let index = 0; index < reviews.length; index++) {
        const element = reviews[index];
        if (
          element.email === user.email &&
          element.like === "1" &&
          element.idContent === contentId
        ) {
          setIsLike(true);
          break;
        }
      }
    } else {
      setIsLike(false);
    }

    if (isDeleted) {
      setIsLike(false);
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch(getContentReviews(contentId));
      setIsLike(true);
    }
  }, [
    dispatch,
    alert,
    reviewError,
    success,
    user,
    reviews,
    isDeleted,
    contentId,
  ]);


  const alertLike = () => {
	if (!user) {
		alert.show("Đăng nhập để Like, Share, Comment!");
		return;
	}     
  };

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
    setTimeout(reLoad, 100);
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
    setTimeout(reLoad, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 md:rounded-lg shadow-md">
      {/* Hình ảnh bài viết */}
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      {/* Tiêu đề bài viết */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

      {/* Thông tin bài viết */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <p>
            By <span className="font-medium text-gray-900">{author}</span>
          </p>
          <div className="flex items-center space-x-2">
            {/* Icon tym */}

            {!user ? (
				<button
                onClick={() => {
					alertLike();
                }}
                className="flex items-center text-gray-500"
                aria-label="Like"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="ml-1">Like</span>
              </button>
            ) : isLike ? (
              <button
                onClick={() => {
                  deleteLike();
                }}
                className="flex items-center text-red-500"
                aria-label="Like"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="ml-1">Like</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  createLike();
                }}
                className="flex items-center text-gray-500"
                aria-label="Like"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="ml-1">Like</span>
              </button>
            )}

            {/* Icon share */}
            <button
              className="flex items-center text-gray-500 hover:text-blue-500 ml-3"
              aria-label="Share"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-2">Share</span>
            </button>
          </div>
        </div>
        <p>{publishedAt}</p>
      </div>

      {/* Nội dung bài viết */}
      {/*<div className="prose max-w-none text-gray-700 leading-7 mt-4 mb-8">{content}</div>*/}

      <div className="mt-2 mb-28">
        {content ? <ContentSection contents={content} /> : <span></span>}
      </div>

      <div className="mb-24">
        <CommentSection comments={comments} />
      </div>
    </div>
  );
};

export default ArticleDetail;
