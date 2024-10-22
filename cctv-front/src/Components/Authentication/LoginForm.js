import '../../Styles/Login.css';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import cctv from '../../Assests/cctv.png';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

const styles = {

    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        padding: '10px',
        gridAutoColumn: '50px',
    },

    leftSide: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
        border: '1 px solid #fff',
        padding: '0.5rem',
        flexGrow: '1',
        color: '#fff',
    },

    rightSide: {
        display: 'flex',
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
        border: '1 px solid #fff',
        flexGrow: '1',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    innerDiv: {
        borderStyle: 'dotted',        
    },
};

const LoginForm = (props) => {

    return (
        <> {/* remove the div */}
        <Navbar />
        <div className='gridContainer' style={styles.gridContainer}>
            <div className='leftSide' style={styles.leftSide}>
                <img src={cctv} alt='cctv-logo' style={{width: '100%', height: '100', objectFit: 'contain'}}/>
            </div>
            <div className='rightSide' style={styles.rightSide}>
                <div className='innerDiv' style={styles.innerDiv}>
                    <h1 style={{textAlign: 'center', color: 'black'}}>CCTV</h1> {/*Mettre le nom du projet ou du site*/}
                    <ThemeProvider theme={theme}>  
                        {/*UTILISER LE FORMGROUP DE MATERIAL UI*/}
                        <Box
                            component="form"
                            onSubmit={props.submited}
                            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField label="Identifiant" id="outlined-size-normal" defaultValue=""/>
                            </div>
                            <div>
                                <TextField label="Mot de passe" id="outlined-size-normal" defaultValue="" />
                            </div>
                            <div className='center'>
                                <Button variant="contained" type="submit" color="ochre">Connexion</Button>
                            </div>
                        </Box>
                </ThemeProvider>
                <div style={{textAlign: 'center', color: 'black'}}>
                    <Link to='/resetPW' style={{textAlign: 'center', color: 'black'}}>Mot de passe oublié?</Link>
                </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default LoginForm;