import './LoginScreen.css';
import Logo from '../../assets/img/group.svg';

export const LoginScreen = () => {

    return (
        <div className="Login---Web">
            <div className="Login__Wrapper">
                <img src={Logo} className="Group" />

                <span className="Welcome-back Text-Style">
                    Welcome back!
                </span>
                <div className="Log-in-to-continue">
                    Log in to continue.
                </div>
                <div>
                <input placeholder='Email'/>
                <div className="Line"></div>
                </div>
                <div>
                <input placeholder='Password'/>
                <div className="Line"></div>
                </div>
                <span className="Dont-have-an-accoun">
                    Don’t have an account? Sign up.
                </span>
                <button className='LoginButton'>Login</button>
            </div>
        </div>
    )
}