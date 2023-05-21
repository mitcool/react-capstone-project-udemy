import {signInWithGooglePoput,createUserDocument} from '../../utils/firebase/firebase.utils'
const SignIn = () => {
    
    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePoput();
        const userDocRef = await createUserDocument(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}

export default SignIn;