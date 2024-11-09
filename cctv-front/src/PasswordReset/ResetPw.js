import ResetPasswordForm from "../Components/Authentication/ResetPasswordForm";
import validator from 'validator';
import { useNavigate } from "react-router-dom";



const ResetPw = () => {
    const navigate = useNavigate();

    const handlePwReset = (event) => {
        event.preventDefault(); // Prevent from submitting form when page is loaded
        console.log('PW reset submitted');
        let { email } = event.target.elements;
        email = email.value;

        if (!email) { // check if empty field
            return;
        };

        // check if email is valid
        if (!validator.isEmail(email)) {
            console.log('Email is not valid', validator.isEmail(email))
            return;
        }

        navigate("/", {replace: true});

    };

    return (
        <>
            <ResetPasswordForm submited={handlePwReset} />
        </>
    );
};

export default ResetPw;