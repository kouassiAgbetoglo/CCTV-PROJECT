import '../../Styles/Login.css';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import drone from '../../Assests/drone.JPG';
import { Link } from 'react-router-dom';

const styles = {

    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        padding: '10px',
        gridAutoColumn: '50px',
        width: '75%',
        margin: '0 auto 0 auto',
    },

    leftSide: {
        // backgroundColor: 'rgba(10, 10, 10, 0.5)',
        border: '1 px solid #fff',
        padding: '0.5rem',
        flexGrow: '1',
        color: '#fff',
    },

    rightSide: {
        display: 'flex',
        // backgroundColor: 'rgba(10, 10, 10, 0.5)',
        border: '1 px solid #fff',
        flexGrow: '1',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const LoginForm = (props) => {

    return (
        <> {/* remove the div */}
        <Navbar />
        <div className='gridContainer' style={styles.gridContainer}>
            <div className='leftSide' style={styles.leftSide}>
                <img src={drone} alt='drone-logo' style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
            </div>
            <div className='rightSide' style={styles.rightSide}>
                <div>
                    <h1 style={{textAlign: 'center', color: 'black'}}>DroneViewer</h1> {/*Mettre le nom du projet ou du site*/}
                        {/*UTILISER LE FORMGROUP DE MATERIAL UI*/}
                    <Box
                        component="form"
                        onSubmit={props.submited}
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField label="Identifiant" id="username" defaultValue="" required="required"/>
                        </div>
                        <div>
                            <TextField label="Mot de passe" id="password" defaultValue="" required="required"/>
                        </div>
                        <div className='center'>
                            <Button variant="contained" type="submit" style={{backgroundColor: "rgba(94, 93, 93, 0.961)", color: "black"}}>Connexion</Button>
                        </div>
                    </Box>
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