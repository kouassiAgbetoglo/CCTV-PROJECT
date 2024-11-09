import Navbar from '../Components/Navbar';

const styles = {

    aboutContainer: {
        width: '75%',
        height: '100%',
        margin: '0 auto 0 auto',
    },

}

const About = () => {
    return (
        <>
            <Navbar />
            <div className='aboutContainer' style={styles.aboutContainer}>
                <h1>À propos</h1>
                    <p>
                    ????? (A REMPLIR PLUS TARD)
                    </p>
                <h2 style={{fontSize:"2em"}}>But du projet</h2>
                    <p>
                        ????? (A REMPLIR PLUS TARD)
                    </p>
            </div>
        </>
    )
}

export default About;