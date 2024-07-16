import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VerticalStepperForm from './components/VerticalStepperForm'
import { Box, Grid } from '@mui/material'

function App() {


  return (
    <>
      <Box sx={{ width: '100% !important', display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ padding: '10px 20px', alignItems: 'center', lineHeight: '1.9' }}>
          <Grid item xs={8}>
            <VerticalStepperForm />
          </Grid>
        </Grid>
      </Box>

    </>
  )
}

export default App
