import { Grid, Typography } from '@mui/material'
import logo from "@assets/images/logo-upv.png";
import logoWhite from "@assets/images/logo-upv-white.png";


const Navbar = ({ darkMode }: { darkMode: boolean }) => {
    return (
        <>
            <Grid container sx={{ padding: "1.5rem", marginLeft: '2rem', marginBottom: "1rem", alignItems: 'center', position: 'relative', }}>
                <Grid item sx={{ position: 'absolute', left: 0 }}>
                    <a href="/">
                        <img src={darkMode ? logoWhite : logo} alt="Logo UPV" className="upv-logo" width="250px" />
                    </a>
                </Grid>

                {/* Contenedor para el Typography centrado en todo el Grid */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h1" sx={{ fontSize: '2rem' }}>
                        JSP Instance Generator
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}

export default Navbar