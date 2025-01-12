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

import PhatTrienSuNghiep from "./components/content/PhatTrienSuNghiep"
import PhatTrienSuNghiepDetails from "./components/content/PhatTrienSuNghiepDetails"

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());    
  }, []);
  

  return (
    <Router>
      <div className="App">
        {/*<Header />*/}
        <Header />
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />

         
          <Route path="/phat-trien-su-nghiep" component={PhatTrienSuNghiep} exact/>
          <Route path="/phat-trien-su-nghiep/:id" component={PhatTrienSuNghiepDetails} exact/>
          <Route path="/login" component={Login} />
          
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />

        </div>

        
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
       

        {/* {!loading && (!isAuthenticated || user.typeRole !== 'admin') && (
          <Footer />
        )} */}

        
        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
