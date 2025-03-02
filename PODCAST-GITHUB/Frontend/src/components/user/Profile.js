import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Profile = () => {
	const { user, loading } = useSelector((state) => state.auth);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={'Thông tin cá nhân'} />

					<div className="container mx-auto p-4">
						<h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 uppercase">
							Thông tin cá nhân
						</h2>
						<div className="row justify-content-around mt-5 user-info">
							<div className="col-12 col-md-3 flex flex-col items-center">
								<figure className="overflow-hidden">
									<img
										className="rounded-full object-cover"
										src={user.avatar.split('CHIEN') ? user.avatar.split('CHIEN')[1] : ''}
										alt={user.name}
										style={{ width: '300px', height: '300px' }}
									/>
								</figure>
								<Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
									Sửa thông tin
								</Link>
							</div>

							<div className="col col-6 w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
								<h4 className="text-lg font-semibold text-gray-700 mb-2">Họ và tên</h4>
								<p className="text-gray-600 mb-4">{user.name}</p>

								<h4 className="text-lg font-semibold text-gray-700 mb-2">Email</h4>
								<p className="text-gray-600 mb-4">{user.email}</p>

								<h4 className="text-lg font-semibold text-gray-700 mb-2">Ngày tham gia</h4>
								<p className="text-gray-600 mb-6">{String(user.createdAt).substring(0, 10)}</p>

								<h4 className="text-lg font-semibold text-gray-700 mb-2">Mô tả bản thân</h4>
								<p className="text-gray-600 mb-6">{user?.description || <div>Đang trống</div>}</p>

								<Link
									to="/password/update"
									className="btn btn-primary text-center uppercase font-semibold rounded-lg block"
								>
									Thay đổi mật khẩu
								</Link>
							</div>
						</div>
						<div className="h-24"></div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
