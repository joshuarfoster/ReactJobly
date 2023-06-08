import {Switch, BrowserRouter, Route} from "react-router-dom";
import React, {useState, useEffect} from "react";
import './App.css';
import JoblyApi from "./api"
import NavComponent from "./NavComponent";
import CompanyList from "./CompanyList";
import Home from "./Home";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Profile from "./Profile";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const loginFunc = async (data) => {
    try {
      const token = await JoblyApi.getToken(data)
      setToken(token);
      return { success: true }
    }catch (e) {
      console.error("login failed", e);
      return { success: false }
    }
  }

  const signUpFunc = async (data) => {
    try{
      const token = await JoblyApi.register(data);
      setToken(token);
      return { success : true }
    } catch (e) {
      console.error("signup failed", e);
      return { success: false }
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <NavComponent/>
      <Switch>
        <Route exact path = "/">
          <Home/>
        </Route>
        <Route exact path = "/companies">
          <CompanyList/>
        </Route>
        <Route exact path = "/companies/:handle">
          <CompanyDetail/>
        </Route>
        <Route exact path = "/jobs">
          <JobList/>
        </Route>
        <Route exact path = "/login">
          <LoginForm loginFunc={loginFunc}/>
        </Route>
        <Route exact path = "/signup">
          <SignUpForm signUpFunc={signUpFunc}/>
        </Route>
        <Route exact path = "/profile">
          <Profile/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
