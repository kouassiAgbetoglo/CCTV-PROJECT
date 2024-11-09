import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const styles = {

    boxContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },

    container: {
        width: '100%',
        border: '1px solid black',
        height: '125%',
    },

    row: {
        display: 'flex',
        gap: '8px',
        width: '100%',
        marginTop: '16px',
    },

    textField: {
        marginBottom: '16px', // Consistent margin between fields
    },

    messageContainer: {
        flex: '1',
        marginBottom: '16px',
    },
    
}

const ContactForm = (props) => {
    return (
        <div className="container" style={styles.container}>
            <Box
                component="form"
                onSubmit={props.submited}
                // sx={{ '& .MuiTextField-root': { m: 1} }}
                style={styles.boxContainer}
                noValidate
                autoComplete="off"
            >
                <div className='row' style={styles.row}>
                    <TextField label="Nom" id="lastName" defaultValue="" required fullWidth sx={styles.textField}/>
                    <TextField label="Prénom" id="firstName" defaultValue="" required fullWidth />
                </div>
                <div>
                    <TextField label="E-mail" id="email" defaultValue="" required fullWidth sx={styles.textField}/>
                
                </div>
                <div>
                    <TextField label="Sujet du message" id="messageSubject" defaultValue="" required fullWidth sx={styles.textField}/>
                </div>
                <div className='messageContainer' style={styles.messageContainer}>
                    <TextField label="Message" id="message" defaultValue="" required multiline rows={8} style={{width: '100%'}}/>
                </div>
                <div style={{ marginBottom: '16px', textAlign: 'center'}}>
                    <Button variant="contained" type="submit" style={{backgroundColor: "rgba(94, 93, 93, 0.961)", color: "black"}}>Envoyer</Button>
                </div>
            </Box>
        </div>
    );
}

export default ContactForm;