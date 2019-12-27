import React from 'react'

import {SpinnerContainer,SpinnerOverlay} from './with-spinner.styes'

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) =>{
    return isLoading ?
        (<SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
        </SpinnerOverlay>)
        :
        (<WrappedComponent {...otherProps}/>)
}

export default WithSpinner