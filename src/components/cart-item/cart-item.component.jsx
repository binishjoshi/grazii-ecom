import React from 'react';
import { connect } from 'react-redux';

import { addItem, removeItem } from '../../redux/cart/cart.actions';

import { CartItemContainer, CartItemImage, ItemDetailsContainer, ArrowContainer, PriceContainer } from './cart-item.styles';

const CartItem = ({cartItem, removeItem, addItem}) => {
    const {imageUrl, price, name, quantity } = cartItem;
    return (
    <CartItemContainer>
        <CartItemImage src={imageUrl} alt='item'/>
        <ItemDetailsContainer>
            <span className='name'>{name}</span>
            <PriceContainer className='price'>
                <ArrowContainer onClick={() => removeItem(cartItem)}>&#10094;</ArrowContainer>
                <span className='value'>{quantity}</span>
                <ArrowContainer onClick={() => addItem(cartItem)}>&#10095;</ArrowContainer> x ${price}
            </PriceContainer>
        </ItemDetailsContainer>
    </CartItemContainer>
)};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CartItem);

// onClick={() => removeItem(cartItem)}
// onClick={() => addItem(cartItem)}