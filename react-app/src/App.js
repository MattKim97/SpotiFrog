import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="PageGridContainer">
      <div className="HeaderContainer"><Header /></div>
      <div className="SideBarContainer"><SideBar /></div>
      <div className="MainContainer"><Main /></div>
      <div className="FooterContainer"><Footer /></div>
    </div>
  );
}

export default App;
