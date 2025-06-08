import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Home from './components/Home';

// Auth or User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';

// Admin Imports
import ContentsList from './components/admin/ContentsList';
import NewContent from './components/admin/NewContent';
import UpdateContent from './components/admin/UpdateContent';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';

import BlogPTSN from './components/content/BlogPTSN';
import DemoArticleDetailPTSN from './components/content/DemoArticleDetailPTSN';

import BottomNav from './components/layout/BottomNav';

import BlogCBCS from './components/content/BlogCBCS';
import DemoArticleDetailCBCS from './components/content/DemoArticleDetailCBCS';

import Bio from './components/layout/Bio';
import { ToastContainer, Slide } from 'react-toastify';
import Booking from './components/content/Booking';
import ManageBookingContent from './components/admin/ManageBookingContent';
import ManageBooking from './components/admin/ManageBooking';
import { CBCS, CHON_GIAI_PHAP, GIOI_THIEU, PTSN } from './constants/path';

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<div className="App">
				{/*<Header />*/}
				<Header />
				<div style={{ height: '65px' }}></div>

				<div className="overflow-x-hidden">
					<Route path="/" component={Home} exact />
					<Route path="/search/:keyword" component={Home} />

					<Route path={`/${GIOI_THIEU}`} component={Bio} exact />
					<Route path="/login" component={Login} />
					<Route path={`/${PTSN}`} component={BlogPTSN} exact />
					<Route path={`/${PTSN}/:slug`} component={DemoArticleDetailPTSN} exact />
					<Route path={`/${CBCS}`} component={BlogCBCS} exact />
					<Route path={`/${CBCS}/:slug`} component={DemoArticleDetailCBCS} exact />
					<Route path="/register" component={Register} />
					<Route path="/booking" component={Booking} exact />
					<Route path={`/${CHON_GIAI_PHAP}`} component={Bio} exact />
					<ProtectedRoute path="/me" component={Profile} exact />
					<ProtectedRoute path="/me/update" component={UpdateProfile} exact />
					<ProtectedRoute path="/password/update" component={UpdatePassword} exact />
				</div>

				<BottomNav />

				<ProtectedRoute path="/admin/contents" isAdmin={true} component={ContentsList} exact />
				<ProtectedRoute path="/admin/content" isAdmin={true} component={NewContent} exact />
				<ProtectedRoute path="/admin/content/:id" isAdmin={true} component={UpdateContent} exact />
				<ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
				<ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
				<ProtectedRoute
					path="/admin/manage-booking-content"
					isAdmin={true}
					component={ManageBookingContent}
					exact
				/>
				<ProtectedRoute path="/admin/manage-bookings" isAdmin={true} component={ManageBooking} exact />
				<div style={{ height: '65px' }} className="md:hidden"></div>
			</div>

			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover={false}
				theme="light"
				transition={Slide}
			/>
		</Router>
	);
};

export default App;
