import '../../Styles/Login.css';
import Navbar from '../Navbar';

const LoginForm = (props) => {
    return (
        <div> {/* remove the div */}
        <Navbar />
        <h1>Login form</h1>
        <form onSubmit={props.submited}>
            <div>
                <label>
                    <input type="text" name="username" placeholder='Identifiant'/>
                </label>
            </div>
            <div>
                <label>
                    <input type="password" name="password" placeholder='Mot de passe'/>
                </label>
            </div>
            <div className='center'>
                <input className='submit' type="submit" value="Connexion" />
            </div>
        </form>
        </div>
    )
};

export default LoginForm;