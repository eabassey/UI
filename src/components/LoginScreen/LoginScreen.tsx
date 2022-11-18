import './LoginScreen.css';
import Logo from '../../assets/img/group.svg';
import { useForm } from 'react-hook-form';
import { useStore } from '../../hooks/useStore';
import { Link, useNavigate } from 'react-router-dom';

export const LoginScreen = () => {
    const { register, handleSubmit, formState: {isValid}} = useForm();
    const navigate = useNavigate();
    const login = useStore(state => state.login)
    const onSubmit = ({email, password}: any) => {
        login(email, password).then((user: any) => {
            navigate('/todos');
        })
    }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                    <input {...register('email', {required: true})} placeholder='Email'/>
                    <div className="Line"></div>
                    </div>
                    <div>
                    <input type="password" {...register('password', {required: true})} placeholder='Password'/>
                    <div className="Line"></div>
                    </div>
                    <span className="Dont-have-an-accoun">
                        <Link to={'/signup'}>
                            Don’t have an account? Sign up.
                        </Link>
                    </span>
                    <button disabled={!isValid} className='LoginButton' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}