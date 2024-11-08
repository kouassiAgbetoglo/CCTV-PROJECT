import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';



const styles = {
    innerDiv: {
        width: '50%',
        margin: '0 auto 0 auto',
    },

    s1: {
        marin: '100px',
        textAlign: 'center',
        margin: '20% auto 0 auto',
    },

    centerResetPage: {
        textAlign: 'center',
        width: '100%',
        marginBottom: '16px',
    },
};

const ResetPasswordForm = (props) => {
    return (
        <>
        <div className='innerDiv' style={styles.innerDiv}>
            <h1 style={styles.s1}>Mot de passe oublié?</h1>
            <p>
                Entrez votre adresse e-mail ou nom d'utilisateur associé à votre compte, afin de recevoir les instructions pour réinitialiser votre mot de passe.
            </p>
            <Box
                component="form"
                onSubmit={props.submited}
                // sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >       
                    <div style={{margin: '16px 0 16px 0'}}>
                        <TextField label="Adresse email" id="outlined-size-normal" defaultValue=""/>
                    </div>
                    <div className='centerResetPage' style={styles.centerResetPage}>
                        <Button variant="contained" color="ochre" style={{width: '100%'}}>Réinitialiser</Button>
                    </div>
                    <div className='centerResetPage' style={styles.centerResetPage}>
                            <Link to='/' style={{color: 'black'}}>Retour à l'accueil</Link>
                    </div>
            </Box>
        </div>
        </>
    )
};

export default ResetPasswordForm;