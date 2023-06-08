import {useState} from 'react'

import {createAuthUserWithEmailAndPassword,createUserDocument} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss'

const defaultFormFields = {

     name:'',
     email:'',
     password:'',
     confirmPassword:''
}
const SighUpForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {name,email,password,confirmPassword} = formFields;

    //Update the current input value in state
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value}) //!important
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match')
            return;
        }
        try{
            const { user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocument(user,{name});
            resetFormField();
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert(error.message);
            }
            else{
                console.log(error.message);
            }
            
        }
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }
    return(
        <div className='sign-up-container'> 
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>

                <FormInput label="Name" type="text" name="name" required onChange={handleChange} value={name}/>

                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>

                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password}/>

                <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>

                <Button type="submit">Sign up</Button>
            </form>
        </div>

    )
}

export default SighUpForm