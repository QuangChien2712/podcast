const ListReviews = ({ reviews }) => {
	return (
		<div className="reviews w-75">
			<h3>ĐÁNH GIÁ SẢN PHẨM:</h3>
			<hr />
			{reviews &&
				reviews.map((review) => (
					<div key={review._id} className="review-card my-3">
						<p className="review_user">
							<figure className="avatar avatar-nav">
								<img
									src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
									alt=""
									className="rounded-circle"
								/>
							</figure>
							<b>{review.name}</b>&ensp;
							<div className="rating-outer">
								<div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
							</div>
						</p>

						<p className="review_comment text-primary">{review.comment}</p>

						<hr />
					</div>
				))}
		</div>
	);
};

export default ListReviews;
