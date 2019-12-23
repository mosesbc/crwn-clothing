import {UserActionTypes} from './user.types'

const INITIAL_STATE = {
    currentUser:null,
    error:null
}
//state passed from the store, action passed by component/dispatcher
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        // case UserActionTypes.SET_CURRENT_USER: commented out we're now using redux saga
        //     return {
        //         ...state,
        //         currentUser:action.payload
        //     } 
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {//this will always fire for both GOOGLE_SIGN_IN_SUCCESS and EMAIL_SIGN_IN_SUCCESS
                ...state,
                currentUser:action.payload,
                error:null//just to clear the message if successed
            } 
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error:action.payload
            } 
        default:
            return state

    }

}

export default userReducer;