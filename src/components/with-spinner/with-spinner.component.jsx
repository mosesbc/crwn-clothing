import React from 'react'

import {SpinnerContainer,SpinnerOverlay} from './with-spinner.styes'

const WithSpinner = WrappedComponent => ({isloading, ...otherProps}) =>{
    return isloading ?
        (<SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
        </SpinnerOverlay>)
        :
        (<WrappedComponent {...otherProps}/>)
}

export default WithSpinner