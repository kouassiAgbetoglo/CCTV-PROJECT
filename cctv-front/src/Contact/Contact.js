import Navbar from '../Components/Navbar';
import ContactForm from '../Components/Contact/ContactForm';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleContact  = (event) => {
        event.preventDefault();

        let {lastName, firstName, email, messageSubject, message} = event.target.elements; // Retrieve data from form elements

        lastName = lastName.value; // Retrieve name from form element
        firstName = firstName.value;
        email = email.value;
        messageSubject = messageSubject.value;
        message = message.value;

        // Check if form has an empty field
        if (!lastName ||!firstName ||!email ||!messageSubject ||!message) {
            console.log('Form empty field')
            return;
        }
        
        // Check if email is valid with validator rules
        if (!validator.isEmail(email)) {
            return;
        } else {
            navigate("/", { replace: true }); // redirect to home page and can't go back to this page
        }

    }

    return (
        <> 
            <Navbar />
                <div className='mainContainer' style={styles.mainContainer}>
                    <h1 className='h1' style={styles.h1}>Me contacter</h1>
                    <p className='p1' style={styles.p1}>Une question ? N'hésite pas à me contacter.</p>
                    <div className='contactContainer' style={styles.contactContainer}>
                        <ContactForm submited={handleContact}/>
                    </div>
                </div>
        </>
    );
}

export default Contact;