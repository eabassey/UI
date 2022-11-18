import './SignupScreen.css';
import Logo from '../../assets/img/group.svg';
import { useForm } from 'react-hook-form';
import { useStore } from '../../hooks/useStore';
import { useNavigate, Link } from 'react-router-dom';

export const SignupScreen = () => {
    const { register, handleSubmit, formState: {isValid}} = useForm();
    const navigate = useNavigate();

    const signup = useStore(state => state.signup)
    
    const onSubmit = ({name, email, password}: any) => {
        console.log({email, password});
        signup(name, email, password).then((user: any) => {
            navigate('/todos');
        })
    }
    return (
        <div className="Sign-Up---Web">
            <div className="Sign-up__Wrapper">
                <img src={Logo} className="Group" />

                <span className="Welcome Text-Style">
                    Welcome!
                </span>
                <div className="Sign-up-to-start-usi">
                Sign up to start using Simpledo today.
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('name', {required: true})} placeholder='Full Name'/>
                    <div className="Line"></div>
                    </div>
                    <div>
                    <input {...register('email', {required: true})} placeholder='Email'/>
                    <div className="Line"></div>
                    </div>
                    <div>
                    <input type="password" {...register('password', {required: true})} placeholder='Password'/>
                    <div className="Line"></div>
                    </div>
                    <span className="Do-have-an-account">
                        <Link to={'/login'}>
                            Do have an account? Sign in.
                        </Link>
                    </span>
                    <button disabled={!isValid} className='SignupButton' type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}