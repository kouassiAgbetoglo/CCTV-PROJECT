import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

    innerDiv: {
        display: 'flex',
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
        border: '1 px solid #fff',
        flexGrow: '1',
        color: '#fff', 
        borderStyle: 'dotted',    
        alignItems: 'center',  
    },
};

const ResetPasswordForm = () => {
    return (
        <>
        <div className='innerDiv' style={styles.innerDiv}>
                <h1 style={{textAlign: 'center', color: 'black'}}>CCTV</h1>

            <ThemeProvider theme={theme}> 
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField label="Adresse email" id="outlined-size-normal" defaultValue=""/>
                    </div>
                    <div className='center'>
                        <Button variant="contained" color="ochre">Réinitialiser</Button>
                        <Button variant="contained" color="ochre">
                            <Link to='/'>Retour à l'accueil</Link>
                        </Button>
                    </div>
                </Box>
            </ThemeProvider>
        </div>
        </>
    )
};

export default ResetPasswordForm;