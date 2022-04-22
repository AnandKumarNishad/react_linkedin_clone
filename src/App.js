import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ErrorPage from './components/ErrorPage';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = { <Login /> } />
          <Route exact path = "/home" element = { <><Header /> <Home  /></> }/> 
          <Route exact path = "/login" element = { <LoginPage /> } />
          <Route exact path = "/sign-up" element = { <SignUpPage /> } />
          <Route path = "*" element = { < ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);