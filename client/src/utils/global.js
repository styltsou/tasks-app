import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  *:focus {
    outline: none;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    --color-black: ${props => props.theme.colors.black};
    --color-white: ${props => props.theme.colors.white};
    --color-text: ${props => props.theme.colors.text};
  }

  body {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6rem;
  }

  a, 
  button {
    cursor: pointer;
    outline: none;
    font-family: inherit;
  }
`;
