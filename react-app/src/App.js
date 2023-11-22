import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
function App() {
  const dispatch = useDispatch();
  const [_isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="PageGridContainer">
      <div className="HeaderContainer"><Header /></div>
      <div className="SideBarContainer"><SideBar /></div>
      <div className="MainContainer"><Main /></div>
      <div className="SoundBarContainer"><MusicPlayer /></div>
      <div className="FooterContainer"><Footer /></div>
    </div>
  );
}

export default App;
