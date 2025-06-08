import ArticleDetail from '../layout/ArticleDetail';
import Breadcrumb from '../layout/Breadcrumb';

import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	getContentDetailsPTSN,
	getContentReviews,
	newReview,
	deleteReview,
	clearErrors,
} from '../../actions/contentActions';
import { CBCS } from '../../constants/path';
import { toast } from 'react-toastify';
import { extractIdFromPath } from '../../utils/handlePathByTitle';

const DemoArticleDetailCBCS = ({ match, history }) => {
	const dispatch = useDispatch();
	const result = extractIdFromPath(match.params.slug);
	const contentId = result.id;

	const { error: reviewError, success } = useSelector((state) => state.newReview);
	const { loading, error, content } = useSelector((state) => state.contentDetailsPTSN);
	const { reviews } = useSelector((state) => state.contentReviews);
	const { isDeleted } = useSelector((state) => state.review);

	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const [listCommentContent, setListCommentContens] = useState([]);

	useEffect(() => {
		if (String(content.id) !== contentId || !match.params.slug) {
			dispatch(getContentDetailsPTSN(contentId));
			dispatch(getContentReviews(contentId));
		}

		if (!Number(contentId)) {
			history.goBack();
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (reviewError) {
			toast.error(reviewError);
			dispatch(clearErrors());
		}
	}, [dispatch, error, reviewError, success, contentId, content.id, match.params.id, history]);

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
			label: 'Home',
			href: '/',
			color: 'orange',
			icon: 'M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z',
		},
		{ label: 'Cân bằng cuộc sống', href: `/${CBCS}` },
		{ label: `${content.tenBaiViet}`, href: `/${CBCS}/${match.params.id}` },
	];

	return (
		<>
			<div className="mt-4 ml-8">
				<Breadcrumb items={breadcrumbItems} />
			</div>

			<ArticleDetail
				image={content && content.hinhAnh ? content.hinhAnh.split('CHIEN')[1] : ''}
				title={content.tenBaiViet}
				content={content.noiDung}
				author={'TheO'}
				publishedAt={`${new Date(content.createdAt).getDate()}/${
					new Date(content.createdAt).getMonth() + 1
				}/${new Date(content.createdAt).getFullYear()}`}
				comments={listCommentContent}
			/>
		</>
	);
};

export default DemoArticleDetailCBCS;
