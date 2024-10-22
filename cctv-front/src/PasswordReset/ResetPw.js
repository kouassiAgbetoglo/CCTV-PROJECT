import ResetPasswordForm from "../Components/Authentication/ResetPasswordForm";


const ResetPw = () => {
    return (
        <>
            <div>
                <h1>Mot de passe oublié?</h1>
                <p>Réinitialiser votre mot de passe</p>
            </div>
                <p>Entrez votre adresse e-mail ou nom d'utilisateur associé à votre compte, afin de recevoir les instructions pour réinitialiser votre mot de passe.</p>
            <ResetPasswordForm />
        </>
    );
};

export default ResetPw;