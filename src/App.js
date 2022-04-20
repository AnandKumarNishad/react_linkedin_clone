import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = { <Login /> } />
          <Route exact path = "/home" element = { <><Header /> <Home  /></> }/> 
          <Route exact path = "/login" element = { <LoginPage /> } />
          <Route exact path = "/sign-up" element = { <SignUpPage /> } />
          <Route> 404 Not Found!</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
