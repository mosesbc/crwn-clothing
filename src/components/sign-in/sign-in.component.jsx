import React from 'react'

import FormInput from '../form-input/form-input.component'
import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle, auth} from '../../firebase/firebase.utils'

class SignIn extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {email,password} = this.state;
        console.log(`email:${email}`)

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                email:'',
                password:''
            })
    
        }catch(error){
            console.log(error)
        }
    }

    handleChange = e => {
        const {name,value} = e.target
        this.setState({[name]:value})
    }



    render(){
        return (

            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type='email' name='email' onChange={this.handleChange} value={this.state.email} required label='email'/>
                    <FormInput type='password' name='password' onChange={this.handleChange} value={this.state.password} required label='password'/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>

        )
    }
}

export default SignIn