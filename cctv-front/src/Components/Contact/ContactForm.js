const ContactForm = (props) => {
    return (
        <form onSubmit={props.submited}>
            <div>
                <label>Nom:
                    <input type="text" name="Nom" />
                </label>
                <label>Prénom:
                    <input type="text" name="Prénom" />
                </label>
            </div>
            <div>
                <label>Email:
                    <input type="email" name="Email" />
                </label>
            </div>
            <div>
                <label>Sujet du message:
                    <input type="text" name="Message" />
                </label>
            </div>
            <div>
                <label>Message
                    <input type="text" name="Message" />
                </label>
            </div>
            <div className='center'>
                <input className='submit' type="submit" value="Envoyer" />
            </div>
        </form>
    );
}

export default ContactForm;