---
slug: "how-to-use-themes-with-styled-components"
title: "How To Use Themes with styled-components"
subtitle: "A tutorial on React and CSS-in-JS"
image: "cover-photo.png"
imageTitle: "create-react-app page"
imageAlt: "create-react-app page with theme toggle button"
repo: "https://github.com/jacobdcastro/styled-components-theme-tutorial"
liveLink: "https://nostalgic-perlman-000288.netlify.com/"
date: "2019-08-23T00:00:00-07:00"
tags:
  - how-to
  - css
  - react
type: "tutorial"
---

I've been rewriting my website recently. And if you read my [last blog post], you'll see why.

One of the features I want to implement in my personal site 2.0 is a dark/light theme button. On click, it will switch the theme between light and dark. Pretty standard!

For styling my site, I'm using [styled-components](https://styled-components.com/). I'm a pretty big fan of CSS-in-JS. Can you tell?

So here, I'm going to explain how to do this with styled-components using the themes feature with the `<ThemeProvider>` component.

Let's add a dark/light theme switch to the create-react-app default index page!

You can check out the final version of what we'll make [here](https://nostalgic-perlman-000288.netlify.com/)! The code is also on my Github! See the code [here](https://github.com/jacobdcastro/styled-components-theme-tutorial).

Now let's get started. Feel free to follow along!

## Getting Started

Using create-react-app, let's create a new project called 'themes'.

```bash
npx create-react-app themes
```

Once create-react-app finishes, change directories into /themes and run `npm start`. After a minute or so, you can see the new default site running on the development server at localhost:3000/.

Now let's get started!

## Migrating To styled-components

Time to bring the styled-components package in!

```bash
npm install styled-components
```

Once installed, let's open up `src/App.js` where all of the app code is.

<!-- App.js -->

```javascript{numberLines: true}
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

In line 3, there's an `App.css` file being imported for the styles. Since we're using styled-components, we'll copy those styles into a styled component. But first, let's create one.

We need to import the library into the file so we can use it.

```bash
import styled from 'styled-components';
```

Just above the App component and below the `./App.css` import, lets make an empty styled `div` component. This will be the wrapper, replacing the current div that has the "App" class on it on line 8. We'll call the styled component `Wrapper`.

```javascript
const Wrapper = styled.div``;
```

All of our styles will go inside the backticks. So let's copy those from `App.css` and paste it all in the new component we created. Once the styles are in the Wrapper component, we'll _slap_ it in our JSX by replacing the `div` tags with the newly created `Wrapper` component. Then remove the `./App.css` import statement and delete the CSS file entirely!

```javascript
import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  .App {
    text-align: center;
  }

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  return (
    <Wrapper className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Wrapper>
  );
}

export default App;
```

Now, styled-components is officially styling the app! If you check localhost:3000/ in your browser, there should be no changes to the webpage whatsoever.

## Understanding the Roadmap

One of the reasons I love styled-components is that they behave like React components because, well, _they literally are React components_. This means they can recieve props!

Therefore, using string interpolation, we can inject Javascript conditional (if/else) statements into our styles based on the recieved props! In fact, you could write _any_ Javascript inside the CSS (similar to how you can inject JS into JSX to render things conditionally).

With that said, here's a quick summary of what's going down.

- Add a button that will toggle theme.
- Create objects that hold the styles for both the light and dark themes.
- Use the styled-components `<ThemeProvider>` component to send theme objects to all child components.
- Change CSS color properties based on recieved theme props to render different colors based on which theme is active.
- Use React's `useState()` hook to toggle theme via button click.

## Creating a button

In JSX, create a `<button>Toggle theme</button>` just below the 'Learn React' link. Then we'll add basic styles in the `<Wrapper>` component. Feel free to copy the styles in.

```javascript
import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  .App {
    text-align: center;
  }

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-weight: 700;
    margin: 40px;
    height: 50px;
    width: 160px;
    border: 3px solid #61dafb;
    background: transparent;
    color: white;
    font-size: 0.9rem;
    letter-spacing: 2px;
  }

  button:hover {
    cursor: pointer;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  return (
    <Wrapper className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button>LIGHT THEME</button>
      </header>
    </Wrapper>
  );
}

export default App;
```

Note: The button says "light theme" because the theme is currently dark. The button text will be dynamic to change depending on which theme is active.

## Adding a Theme

Now that the button is added to the UI, let's write the theme objects! We'll create a new file in `src` called `themes.js`.

### Declaring themes

Next, let's create two empty objects called `darkTheme` and `lightTheme` and export them individually with a named export statement.

```javascript
const darkTheme = {};

const lightTheme = {};

export { darkTheme, lightTheme };
```

Since the default app at localhost:3000/ has a dark background, we'll declare those styles as the dark theme. Copying the same colors in the `.App-header` class in `App.js`, let's set the `darkTheme` object values. While we're at it, we'll set the `lightTheme` object to colors I've decided look pretty cool.

```javascript
const darkTheme = {
  bgColor: "#282c34",
  textColor: "white",
  linkColor: "#61dafb",
};

const lightTheme = {
  bgColor: "#e8ecf0",
  textColor: "#001c38",
  linkColor: "#5dd2f2",
};

export { darkTheme, lightTheme };
```

Next, we'll import these two themes into `App.js` under the `styled` import on line 4 like so:

```javascript
import { darkTheme, lightTheme } from "./themes";
```

### Using ThemeProvider

Once imported, we'll use the `<ThemeProvider>` component that comes with the styled-components library. Edit line 3 to import `ThemeProvider` like this:

```javascript
import styled, { ThemeProvider } from "styled-components";
```

ThemeProvider does what it's name implies. You wrap your entire app with the component, and give it a "theme" prop. The theme prop will have a value of whatever theme (object) you set it to.

Once `<ThemeProvider>` recieves the theme prop, it will _provide_ ALL child styled components with said object _as a prop_. Which means, by having our `<Wrapper>` styled component inside `<ThemeProvider>`, we will be able to access the darkTheme/lightTheme object colors right from our CSS _as props_.

So let's wrap all of our JSX in `<ThemeProvider>` and set the theme to `darkTheme` which we've already imported.

```javascript
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Wrapper className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button>LIGHT THEME</button>
        </header>
      </Wrapper>
    </ThemeProvider>
  );
}
```

### Bringing Theme Colors Into CSS

Now that `<ThemeProvider>` is sending the `darkTheme` object to our styled `<Wrapper>` component, we can access `darkTheme` data right from our CSS! We do this with arrow functions.

Remembering that our CSS is being written inside of backticks, we can use string interpolation with the `${}` syntax.

On line 18, let's set the background color to the `bgColor` value set in our `darkTheme` object. We need to write a function taking in "props", and simply return the value from `props.theme` that was provided by `<ThemeProvider>`. In this case, we'll bring in the `bgColor` we declared in themes.js.

```CSS
.App-header {
  background-color: ${props => props.theme.bgColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

```

So where do we get `props.theme.bgColor`?

The function we just wrote takes in "props", one of the props is an object called "theme" (which we set via `<ThemeProvider theme={darkTheme}>`). And in the "theme" object we're recieving, there's values that we set in themes.js, one of which is `bgColor`. Hence, `props.theme.bgColor`. Hope you followed!

Now we can replace the text colors on lines 25 and 42 by writing `${props => props.theme.textColor}`. Then the link color on lines 29 and 40 (for the button border) with `${props => props.theme.linkColor}`.

When all is said and done, the Wrapper component styles should have Javascript among it like this:

```javascript
const Wrapper = styled.div`
  .App {
    text-align: center;
  }

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .App-header {
    background-color: ${props => props.theme.bgColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: ${props => props.theme.textColor};
  }

  .App-link {
    color: ${props => props.theme.linkColor};
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-weight: 700;
    margin: 40px;
    height: 50px;
    width: 160px;
    border: 3px solid ${props => props.theme.linkColor};
    background: transparent;
    color: ${props => props.theme.textColor};
    font-size: 0.9rem;
    letter-spacing: 2px;
  }

  button:hover {
    cursor: pointer;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
```

It's important to note that semicolons in the CSS go outside of string interpolations! Sometimes, you may want to return a string as a value in the props function. In this case, _don't put the semicolon in the string_. Put it after the closing curly brace. The styled component won't render properly if the semicolon is in the string.

Now, double check localhost:3000/ and, once again, there should be NO CHANGES.

And the web page is officially being themed with styled-components "theme" feature using the `ThemeProvider` component and themes we imported from our themes.js file! Congrats!!!

#### Ready for the kicker?

On line 63, change `darkTheme` to `lightTheme` and see what happens on localhost:3000/. _insert emoji here_

## Connecting the Toggle Button to Themes with useState

Want a challenge? Add the toggle feature to the button on your own without this tutorial.

But if you'd like to follow along, let's jump in!

### Adding State With Hooks

Since we're using React's new `useState()` hook, we need to import it from React on line 1.

```javascript
import React, { useState } from "react";
```

Then, just above the App component's return statement on line 62, let's add the state!

It'll be a simple boolean called `isDarkTheme`, with a default state of true. Toggling it to false will enable the light theme.

```javascript
function App() {
  let [isDarkTheme, toggleTheme] = useState(true);

  return (
    <ThemeProvider theme={lightTheme}>
      <Wrapper className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button>LIGHT THEME</button>
        </header>
      </Wrapper>
    </ThemeProvider>
  );
}
```

Note: we use let instead of const on the state since we'll be changing the value of the state.

### Setting Theme With State

We're going to use the value of `isDarkTheme` to set the theme prop value in the `<ThemeProvider>` component.

We'll do so with a ternerary operator. So if `isDarkTheme` is true, then it will provide the `darkTheme`. Otherwise, it will return the `lightTheme`.

So edit line 65 like so:

```javascript
<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
```

We'll do the same thing with the button text while we're at it. Editing the button tag like this:

```jsx
<button>{isDarkTheme ? "LIGHT" : "DARK"} THEME</button>
```

### Using Button to Change State

With the useState hook, we get two values via array destructuring. The first, `isDarkTheme`, we set to "true" by default. The second value, named `toggleTheme` is our entryway to interact with the `isDarkTheme` value (replacing setState in class components).

So we need to write an onClick attribute in the button tag. But instead of adding the `toggleTheme` method inside the onClick attribute, we're going to write a seperate function in the component for that.

If we were to put `toggleTheme` right in the button tag, React would get stuck in an infinite loop when trying to render the button.

So we'll create an `action` function just above the return statement, and then add the action to the onClick attribute like so:

```javascript
function App() {
  let [isDarkTheme, toggleTheme] = useState(true);

  const action = () => {
    toggleTheme((isDarkTheme = !isDarkTheme));
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Wrapper className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={action}>LIGHT THEME</button>
        </header>
      </Wrapper>
    </ThemeProvider>
  );
}
```

Now the button is _hooked_ up to the state! You now have a fully functional theme toggling button!

## Adding Color Animation

Now that it's all working, let's add one final touch. Color animation!

We'll add a transition property to all elements whose styles are subject to the theme. These are the `.App-header`, `.App-header`, and `button` elements. Simply add this one line to each of those classes in the CSS:

```
transition: 0.35s;
```

Now toggle the theme and check it out!

## Recap

We officially added a dark/light theme toggle button to the default create-react-app page! Now you can translate these concepts to your own project for convenient theme switching.

We:

- Installed styled-components to a React app.
- Added a button that toggles the theme.
- Created theme objects that holds the data for styles.
- Made our own `<Wrapper>` styled component.
- Used the styled-components `<ThemeProvider>` component to send the theme styles to our Wrapper component.
- With React hooks, used component state to establish which theme is active.
- Connected our button to the state to toggle the theme!

Easy right? It's pretty fun.

Again, you can view the [code on Github](https://github.com/jacobdcastro/styled-components-theme-tutorial) or my final version on the web [here](https://nostalgic-perlman-000288.netlify.com/)!

Thank you so much for checking this out. And I hope this helps on your own projects!!!

Much love.
