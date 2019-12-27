import React,{useState} from 'react'

import FormInput from '../form-input/form-input.component'
import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.action'
import {connect} from 'react-redux'

const SignIn = ({emailSignInStart,googleSignInStart}) => {
    const [userCredentials,setCredentials] = useState({
        email:'',
        password:''
    })
    const {email,password} = userCredentials;
    const handleSubmit = async e => {
        e.preventDefault();
        

        emailSignInStart(email,password)
        
    }

    const handleChange = e => {
        const {name,value} = e.target
        setCredentials({...userCredentials,[name]:value})
    }

    return (

        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type='email' name='email' onChange={handleChange} value={email} required label='email'/>
                <FormInput type='password' name='password' onChange={handleChange} value={password} required label='password'/>
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn)