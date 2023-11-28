import React from "react";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import { ContentLoadedProvider } from "./context/ContentLoaded";
function App() {

  return (
    <ContentLoadedProvider>
      <div className="PageGridContainer">
        <div className="HeaderContainer"><Header /></div>
        <div className="SideBarContainer"><SideBar /></div>
        <div className="MainContainer"><Main /></div>
        <div className="FooterContainer"><Footer /></div>
      </div>
      <div className="SoundBarContainer"><MusicPlayer /></div>
    </ContentLoadedProvider>
  );
}

export default App;
