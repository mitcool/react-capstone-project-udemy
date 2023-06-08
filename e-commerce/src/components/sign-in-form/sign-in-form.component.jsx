import {useState ,useContext} from 'react'

import {signInWithGooglePoput,signInUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import './sign-in-form.styles.scss'

const defaultFormFields = {
     email:'',
     password:'',
}
const SighInForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    //Update the current input value in state
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value}) //!important
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const {user} = await signInUserWithEmailAndPassword(email,password);
            setCurrentUser(user);
            //console.log(user);
            resetFormField();
        }catch(error){
            
            switch(error.code){
                case 'auth/wrong-password' : alert('Incorrect password'); break;
                case 'auth/user-not-found' : alert('User not found'); break;
                default: console.log(error);
            }
        }
    }
    const signInWithGoogle = async() => {
        const { user } = await signInWithGooglePoput();
        //const userDocRef = await createUserDocument(user)
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }
    return(
        <div className='sign-up-container'> 
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}> Google Sign in</Button>
                </div>
                
            </form>
        </div>

    )
}

export default SighInForm