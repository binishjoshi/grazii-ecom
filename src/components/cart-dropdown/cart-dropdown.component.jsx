import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { CartDropDownContainer, CartItemsContainer, EmtpyMessageContainer, CartDropDownButton } from './cart-dropdown-styles';

import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropDownContainer>
        <CartItemsContainer>
            {
                cartItems.length ? 
                    cartItems.map(cartItem => <CartItem key ={cartItem.id} cartItem={cartItem} />)
                    :
                    <EmtpyMessageContainer>Your cart is empty</EmtpyMessageContainer>
            }
        </CartItemsContainer>
        <CartDropDownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>GO TO CHECKOUT</CartDropDownButton>
    </CartDropDownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
}) 

export default withRouter(connect(mapStateToProps)(CartDropdown));