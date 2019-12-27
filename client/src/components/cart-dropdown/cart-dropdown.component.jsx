import React from 'react'
import {connect} from 'react-redux'
import './cart-dropdown.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import {createStructuredSelector} from 'reselect'
import {selectCartItems} from '../../redux/cart/cart.selector'
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../../redux/cart/cart.action'

//dispatch was automaticall passe by connet() when we didnt use mapDispatchToProps , used when we only need 1 action to dispatch
const CartDropdown = ({cartItems, history, dispatch}) => (    
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length
                ?
                cartItems.map(cartItem=> (
                    <CartItem key={cartItem.id} item={cartItem}/>
                ))
                : <span className='empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {history.push('/checkout')
        dispatch(toggleCartHidden())
    }}>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))