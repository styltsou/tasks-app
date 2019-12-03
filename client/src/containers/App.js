import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../utils/theme';
import GlobalStyle from '../utils/global';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="App"></div>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}

export default App;
