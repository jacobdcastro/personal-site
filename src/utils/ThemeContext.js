import React from 'react';
import { lightTheme, darkTheme } from '../styles/layout/__themes';

const ThemeContext = React.createContext({
  lightTheme,
  transition: '0.5s',
  toggleTheme: () => {},
});

// provider component wraps entire app in gatsby-browser.js
class ThemeContextWrapper extends React.Component {
  constructor(props) {
    super(props);

    // TODO set initial theme based on time of day
    // ? bug in header background color on scroll when code isn't commented
    // this.setTheme = () => {
    //   const now = new Date();
    //   const time = now.getHours();

    //   if (time >= 19 || time <= 6) {
    //     return darkTheme;
    //   } else if (time > 6 && time < 19) {
    //     return lightTheme;
    //   }
    // };

    this.toggleTheme = () => {
      this.setState({
        currentTheme:
          this.state.currentTheme === lightTheme ? darkTheme : lightTheme,
      });
    };

    this.state = {
      currentTheme: lightTheme,
      transition: '0.5s',
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextWrapper;
export { ThemeContext };
