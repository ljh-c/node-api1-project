import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Users from './components/Users';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6A917E'
    },

    secondary: {
      main: '#A23E48'
    },

    type: 'dark',
    
    background: {
      default: '#5E4C5A'
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Users />
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
