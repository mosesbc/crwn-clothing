import React from 'react'
import {CustomButtonContainer} from './custom-button.styles'

/* commented out to use styled-component below
import './custom-button.styles.scss'

const CustomButton = ({children, isGoogleSignIn,inverted, ...otherProps}) => (
    <button className={`${inverted?'inverted':''} ${isGoogleSignIn? 'google-sign-in':''} custom-button`} {...otherProps}>{children}</button>
)
*/

const CustomButton = ({children, ...otherProps}) => (
    <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
)

export default CustomButton;