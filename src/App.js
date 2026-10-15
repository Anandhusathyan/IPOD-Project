import React from 'react';
import './App.css';
import Screen from './components/Screen';
import Controls from './components/Controls';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.mainOptions = ["coverflow", "music", "games", "settings"];
    this.musicOptions = ["allSongs", "artists", "albums"];
    this.state = {
      screen: "menu",
      mainSelection: 0,
      musicSelection: 0,
    };
  }

  // Handle the rotate event fired from the control component
  changeSelection = (amount) => {
    const key =
      this.state.screen === "music-menu" ? "musicSelection" : "mainSelection";
    const options =
      this.state.screen === "music-menu" ? this.musicOptions : this.mainOptions;
    this.setState((state) => ({
      [key]: (state[key] + amount + options.length) % options.length,
    }));
  };

  // If ok button is clicked,  open the selected component
  openSelection = () => {
    const { screen, mainSelection, musicSelection } = this.state;
    if (screen === "menu") {
      const selected = this.mainOptions[mainSelection];
      this.setState({ screen: selected === "music" ? "music-menu" : selected });
    } else if (screen === "music-menu") {
      this.setState({ screen: this.musicOptions[musicSelection] });
    }
  };

  // If menu button is clicked, go back to the menu screen
  showMainMenu = () => {
    const musicPages = ["allSongs", "artists", "albums"];
    // Menu behaves like a back button within Music before returning home.
    this.setState((state) => ({
      screen: musicPages.includes(state.screen) ? "music-menu" : "menu",
    }));
  };

  render() {
    return (
      <>
        <main id="iPod-app">
          <Screen
            screen={this.state.screen}
            activeMainOption={this.mainOptions[this.state.mainSelection]}
            activeMusicOption={this.musicOptions[this.state.musicSelection]}
          />
          <Controls
            onRotate={this.changeSelection}
            onOk={this.openSelection}
            onMenu={this.showMainMenu}
          />
        </main>
      </>
    );
  }
}

export default App;
