import React from 'react'

import FormInput from '../form-input/form-input.component'
import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.action'
import {connect} from 'react-redux'

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
        const {emailSignInStart} = this.props;
        const {email,password} = this.state;

        emailSignInStart(email,password)
        /* redux-saga will now do the state handling 
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                email:'',
                password:''
            })
    
        }catch(error){
            console.log(error)
        }
        */
    }

    handleChange = e => {
        const {name,value} = e.target
        this.setState({[name]:value})
    }



    render(){
        const {googleSignInStart} = this.props
        return (

            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type='email' name='email' onChange={this.handleChange} value={this.state.email} required label='email'/>
                    <FormInput type='password' name='password' onChange={this.handleChange} value={this.state.password} required label='password'/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn)