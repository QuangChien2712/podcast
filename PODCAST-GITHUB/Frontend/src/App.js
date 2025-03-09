import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";

// Auth or User imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";

// Admin Imports
import ContentsList from "./components/admin/ContentsList";
import NewContent from "./components/admin/NewContent";
import UpdateContent from "./components/admin/UpdateContent";

import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "./axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

import PhatTrienSuNghiep from "./components/content/PhatTrienSuNghiep";
import PhatTrienSuNghiepDetails from "./components/content/PhatTrienSuNghiepDetails";
import BottomNav from "./components/layout/BottomNav";
import Article from "./components/layout/ArticleDetail";
import BlogPTSN from "./components/content/BlogPTSN";
import DemoArticleDetailPTSN from "./components/content/DemoArticleDetailPTSN";

import BlogCBCS from "./components/content/BlogCBCS";
import DemoArticleDetailCBCS from "./components/content/DemoArticleDetailCBCS";
import Bio from "./components/layout/Bio";

import { ToastContainer, Slide } from "react-toastify";
import Booking from "./components/content/Booking";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        {/*<Header />*/}
        <Header />
        <div style={{ height: "65px" }}></div>
        <div className="overflow-x-hidden">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/bio" component={Bio} exact />
          <Route
            path="/phat-trien-su-nghiep"
            component={PhatTrienSuNghiep}
            exact
          />
          <Route
            path="/phat-trien-su-nghiep/:id"
            component={PhatTrienSuNghiepDetails}
            exact
          />

          <Route path="/login" component={Login} />

          {/* QUY */}
          <Route path="/blog1" component={BlogPTSN} exact />
          <Route path="/blog1/:id" component={DemoArticleDetailPTSN} exact />
          <Route path="/blog2" component={BlogCBCS} exact />
          <Route path="/blog2/:id" component={DemoArticleDetailCBCS} exact />
          <Route path="/register" component={Register} />
          <Route path="/booking" component={Booking} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
        </div>

        <BottomNav />

        <ProtectedRoute
          path="/admin/contents"
          isAdmin={true}
          component={ContentsList}
          exact
        />
        <ProtectedRoute
          path="/admin/content"
          isAdmin={true}
          component={NewContent}
          exact
        />
        <ProtectedRoute
          path="/admin/content/:id"
          isAdmin={true}
          component={UpdateContent}
          exact
        />

        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />

        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <div style={{ height: "85px" }}></div>

        {/* {!loading && (!isAuthenticated || user.typeRole !== 'admin') && (
          <Footer />
        )} */}

        {/*<Footer />*/}
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
