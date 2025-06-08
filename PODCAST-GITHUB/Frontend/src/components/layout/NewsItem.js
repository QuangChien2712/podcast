import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { PTSN } from '../../constants/path';

const NewsItem = ({ image, title, description }) => {
	const history = useHistory();

	const handleLink = () => {
		const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
		history.push(`/${PTSN}/${formattedTitle}`);
	};
	return (
		<div
			className="max-w-sm md:min-h-[666px] bg-white border border-gray-200 rounded-md shadow cursor-pointer"
			onClick={handleLink}
		>
			<div>
				<LazyLoadImage className="rounded-t-md w-full md:min-h-[382px]" src={image} alt={title} effect="blur" />
			</div>
			<div className="p-3 flex flex-col justify-between">
				<div>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
				</div>
				<p className="text-justify line-clamp-5 h-full mb-3 font-normal text-gray-700 no-underline">
					{description}
				</p>

				<div className="inline-flex justify-between w-[120px] hover:w-[130px] group transition-all duration-[1000ms] ease-in-out items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
					<span className="transition-all duration-[1000ms] ease-in-out">Đọc thêm</span>
					<svg
						className="rtl:rotate-180 w-3.5 h-3.5 ms-2 transform transition-all duration-[1000ms] ease-in-out group-hover:translate-x-2"
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
				</div>
			</div>
		</div>
	);
};

export default NewsItem;
