import React, { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Grid, Switch, FormGroup, FormControlLabel } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // ícono del sol
import Brightness4Icon from '@mui/icons-material/Brightness4'; // ícono de la luna
import VerticalStepperForm from './components/VerticalStepperForm';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// Definición de colores para el tema oscuro
const darkThemeColors = {
  primary: {
    100: '#2C3A4F',
    200: '#56647b',
    300: '#b4c2dc',
  },
  secondary: {
    100: '#fdfdfd',
    200: '#fdfdfd',
    300: '#fdfdfd',
  },
  accent: {
    100: '#FF4D4D',
    200: '#ffecda',
  },
  text: {
    100: '#FFFFFF',
    200: '#e0e0e0',
  },
  bg: {
    100: '#1A1F2B',
    200: '#292e3b',
    300: '#414654',
  }
};

// Definición de colores para el tema claro
const lightThemeColors = {
  primary: {
    100: '#c21d03',
    200: '#A40E0E',
    300: '#ffb787',
  },
  accent: {
    100: '#393939',
    200: '#bebebe',
  },
  text: {
    100: '#232121',
    200: '#4b4848',
  },
  bg: {
    100: '#fbfbfb',
    200: '#f1f1f1',
    300: '#c8c8c8',
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? darkThemeColors.primary[200] : lightThemeColors.primary[200],
      },
      background: {
        default: darkMode ? darkThemeColors.bg[100] : lightThemeColors.bg[100],
      },
      text: {
        primary: darkMode ? darkThemeColors.text[100] : lightThemeColors.text[100],
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar darkMode={darkMode} />
      </Box>

      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}> {/* Asegurando que esté por encima de la mayoría de otros elementos */}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
              />
            }
            label={darkMode ? 'Light' : 'Dark'}
          />
        </FormGroup>
      </Box>


      <Box sx={{ width: '100%', display: 'flex', alignItems: 'start', minHeight: '60vh', marginTop: '4rem' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ padding: '10px 20px', alignItems: 'center', lineHeight: '1.9' }}>
          <Grid item xs={10}>
            <VerticalStepperForm darkMode={darkMode} />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Footer darkMode={darkMode} />
      </Box>

    </ThemeProvider>
  );
}

export default App;
