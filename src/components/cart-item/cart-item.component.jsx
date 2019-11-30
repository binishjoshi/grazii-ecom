import React from 'react';
import { connect } from 'react-redux';

import { addItem, removeItem } from '../../redux/cart/cart.actions';

import './cart-item.styles.scss';

const CartItem = ({cartItem, removeItem, addItem}) => {
    const {imageUrl, price, name, quantity } = cartItem;
    return (
    <div className='cart-item'>
        <img src={imageUrl} alt='item'/>
        <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>
            <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div> x ${price}</span>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CartItem);

// onClick={() => removeItem(cartItem)}
// onClick={() => addItem(cartItem)}