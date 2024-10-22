import Navbar from '../Components/Navbar';
import ContactForm from '../Components/Contact/ContactForm';

const Contact = () => {
    return (
        <> 
            <Navbar />
            <div>
                <h1>Me contacter</h1>
                <p>Une question ? N'hésite pas à me contacter.</p>
            </div>
            <ContactForm />
        </>
    );
}

export default Contact;