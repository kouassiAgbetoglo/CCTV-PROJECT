import Navbar from '../Components/Navbar';
import ContactForm from '../Components/Contact/ContactForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const styles = {

    mainContainer: {
        width: '75%',
        height: '150%',
        margin: '0 auto 0 auto',
    },

    h1: {
        textAlign: 'center',
    },

    p1 : {
        textAlign: 'center',
    },

    contactContainer: {
        width: '80%',
        margin: 'auto',
    },

}

const Contact = () => {

    const navigate = useNavigate()

    const submitContactForm  = (event) => {
        event.preventDefault();
        console.log('submit')
        navigate('/', { replace: true })
    }

    return (
        <> 
            <Navbar />
                <div className='mainContainer' style={styles.mainContainer}>
                    <h1 className='h1' style={styles.h1}>Me contacter</h1>
                    <p className='p1' style={styles.p1}>Une question ? N'hésite pas à me contacter.</p>
                    <div className='contactContainer' style={styles.contactContainer}>
                        <ContactForm submited={submitContactForm}/>
                    </div>
                </div>
        </>
    );
}

export default Contact;