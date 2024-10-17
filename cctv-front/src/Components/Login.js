import '../Styles/Login.css';

const Login = () => {
    return (
        <form>
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
    )
};

export default Login;