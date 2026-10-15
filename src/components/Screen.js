import React from "react";
import "./css/screen.css";
import SideMenu from "./SideMenu";
import MusicMenu from "./MusicMenu";
import Settings from "./Settings";
import Games from "./Games";
import Coverflow from "./Coverflow";
import AllSongs from "./AllSongs";
import Artists from "./Artists";
import Albums from "./Albums";

class Screen extends React.Component {
  // Display the sidemenu, coverflow, games,Music etc here
  render() {
    const { screen, activeMainOption, activeMusicOption } = this.props;
    let content;
    switch (screen) {
      case "coverflow":
        content = <Coverflow />;
        break;
      case "games":
        content = <Games />;
        break;
      case "settings":
        content = <Settings />;
        break;
      case "music-menu":
        content = (
          <div id="music">
            <MusicMenu activeItemInMenu={activeMusicOption} />
          </div>
        );
        break;
      case "allSongs":
        content = <AllSongs />;
        break;
      case "artists":
        content = <Artists />;
        break;
      case "albums":
        content = <Albums />;
        break;
      default:
        content = <SideMenu activeItemInMenu={activeMainOption} />;
    }

    return (
      <>
        <section id="screen">
          <div id="top-bar">
            <span id="battery">▰</span>
          </div>
          {content}
        </section>
      </>
    );
  }
}

export default Screen;
