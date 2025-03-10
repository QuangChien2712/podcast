import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Bio = () => {
  const imageUrls = [
    "https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417324/49c2cce18f9d3ec3678c1_nqogon.jpg",
    "https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417325/8ed7a8f2eb8e5ad0039f2_aytj2v.jpg",
    "https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417322/a313f3cebfb20eec57a33_dfb7a2.jpg",
    "https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417335/16fae668aa141b4a42054_hfrwsv.jpg",
    "https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417333/02ae85dcc9a078fe21b15_haexfe.jpg",
    "https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417331/47140417486bf935a07a6_ygjv0z.jpg",
  ];

  return (
    <div className="bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        {imageUrls.map((url, index) => (
          <LazyLoadImage
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            effect="blur"
          />
        ))}
      </div>
    </div>
  );
};

export default Bio;
