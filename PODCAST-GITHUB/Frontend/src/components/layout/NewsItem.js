import React from "react";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const NewsItem = ({ image, title, description }) => {
  const history = useHistory();

  const handleLink = () => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    history.push(`/blog1/${formattedTitle}`);
  };
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={handleLink}
    >
      <a>
        <LazyLoadImage
          className="rounded-t-lg w-full"
          src={image}
          alt={title}
          effect="blur"
        />
      </a>
      <div className="p-3">
        <a>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <p className="text-justify line-clamp-5 mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Đọc thêm
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
