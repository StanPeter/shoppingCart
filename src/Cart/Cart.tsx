import React, { FC } from 'react';
//material-ui components
import Button from '@material-ui/core/Button';
//components
import CartItem from 'CartItem/CartItem';
//types
import { CartItemType } from 'App';
//styles
import styles from 'Cart/Cart.module.scss';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart }) => (

    <div className={styles.wrapper}>

        <h2>Your Shopping Cart</h2>
        {cartItems.length > 0
            ? cartItems.map(item => (
                <CartItem
                    cart={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    key={item.id} />
            ))
            : <p>No items in cart</p>
        }
        
    </div>
);

export default Cart;