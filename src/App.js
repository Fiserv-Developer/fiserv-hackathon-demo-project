import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from "@mui/private-theming";
import Board from "./components/board/Board";
import { createTheme } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoDark from './images/logo-dark.png'; 
import LogoLight from './images/logo-light.png'; 
import Box from '@mui/material/Box';
import { dark } from './themes/Dark';
import { light } from './themes/Light';

function App() {
  // API Key Management
  const localApiKey = "apiKey";
  const [apiKey, setApiKey] = useState(() => {
    const jsonValue = localStorage.getItem(localApiKey);
    return JSON.parse(jsonValue);
  });
  useEffect(() => {
    localStorage.setItem(localApiKey, JSON.stringify(apiKey));
  }, [apiKey]);

  // Theme Management
  const [theme, setTheme] = useState(true)
  const icon = !theme ? <WbSunnyIcon /> : <DarkModeIcon />
  const appliedTheme = createTheme(theme ? light : dark)
  const themeName = theme ? 'light' : 'dark';

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box sx={{ backgroundColor: appliedTheme.palette.primary.main, textAlign: 'center'}}>
        <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => setTheme(!theme)}
            sx={{ position: 'fixed', left: 0, color: appliedTheme.palette.text.main}}>
              {icon}
        </IconButton>
        <Logo theme={themeName}/>
        <Box>
          <TextField id="apiKey" label="Api Key" default="<enter your api key>" type="password"
            variant="outlined" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
            InputProps={{style: {color: appliedTheme.palette.text.main, textAlign: 'center'}}}
            InputLabelProps={{style: {color: appliedTheme.palette.text.main}}}/>
        </Box>
      </Box>
      <Board apiKey={apiKey} />
    </ThemeProvider>
  );
}

function Logo(props) {
  if (props.theme === 'dark') {
    return (
      <React.Fragment>
        <img alt="Dark Theme Logo" src={LogoDark} />
        <img style={{display: 'none'}} alt="Light Theme Logo" src={LogoLight} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <img style={{display: 'none'}} alt="Light Theme Logo" src={LogoDark} />
        <img alt="Light Theme Logo" src={LogoLight} />
      </React.Fragment>
    );
  }
}

export default App;
