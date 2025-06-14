import Breadcrumb from '../layout/Breadcrumb';
import NewsItem from '../layout/NewsItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminContentsPTSN } from '../../actions/contentActions';
import { Link } from 'react-router-dom';
import { PTSN } from '../../constants/path';
import convertTitleToPath from '../../utils/handlePathByTitle';

const BlogPTSN = () => {
	const dispatch = useDispatch();

	const [contentsSearchPTSN, setContentsSearchPTSN] = useState([]);
	const [searchPTSN, setSearchPTSN] = useState('');

	const { loading, error, contents } = useSelector((state) => state.contentsPTSN);

	const { contentsSPTSN } = useSelector((state) => state.contentsSPTSN);

	useEffect(() => {
		dispatch(getAdminContentsPTSN('HM1'));
	}, []);

	useEffect(() => {
		setContentsSearchPTSN(contentsSPTSN.ketQuaTimKiem);
		setSearchPTSN(contentsSPTSN.chuoiTimKiem);
	}, [contentsSPTSN]);

	const breadcrumbItems = [
		{
			label: 'Home',
			href: '/',
			color: 'orange',
			icon: 'M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z',
		},
		{ label: 'Phát triển sự nghiệp', href: `${PTSN}` },
	];

	return (
		<>
			<div className="mt-4 ml-8 lg:ml-16">
				<Breadcrumb items={breadcrumbItems} />
			</div>

			{searchPTSN && searchPTSN.length > 0 ? (
				contentsSearchPTSN && contentsSearchPTSN.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 p-6">
						{contentsSearchPTSN.map((item,index) => (
							<Link key={index} to={`/${PTSN}/${convertTitleToPath(item.id, item.tenBaiViet)}`}>
								<NewsItem
									image={item.hinhAnh.split('CHIEN')[1]}
									title={item.tenBaiViet}
									description={item.moTaNgan}
								/>
							</Link>
						))}
					</div>
				) : (
					<div className="mt-4 ml-8">
						Không có kết quả tìm kiếm theo tiêu đề
						<span style={{ fontSize: '20px', fontWeight: '700' }}> "{searchPTSN}"</span>
					</div>
				)
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 p-6">
					{contents &&
						contents.length > 0 &&
						contents.map((item,index) => (
							<Link key={index} to={`/${PTSN}/${convertTitleToPath(item.id, item.tenBaiViet)}`}
								className="hover:no-underline"
							>
								<NewsItem
									image={item.hinhAnh.split('CHIEN')[1]}
									title={item.tenBaiViet}
									description={item.moTaNgan}
								/>
							</Link>
						))}
				</div>
			)}
			<div className="block mb-20"></div>
		</>
	);
};

export default BlogPTSN;
