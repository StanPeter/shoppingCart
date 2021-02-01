import React, { FC } from 'react';
//component-ui
import Button from '@material-ui/core/Button';
//types
import { CartItemType } from 'App';
//styles
import styles from 'CartItem/CartItem.module.scss';
import { Item } from 'Item/Item';

type Props = {
    cart: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const CartItem: FC<Props> = ({ cart, addToCart, removeFromCart }) => (

    <div className={styles.wrapper}>

        <h3>{cart.title}</h3>

        <div className="information">
            <p>Price: ${cart.price}</p>
            <p>Total: ${(cart.amount * cart.price).toFixed(2)}</p>
        </div>

        <div className="buttons">
            <p>{cart.amount}</p>
            <Button
                // size='small'
                disableElevation
                variant='contained'
                onClick={() => removeFromCart(cart.id)} >
                -
            </Button>
            <p>{cart.amount}</p>
            <Button
                // size='small'
                disableElevation
                variant='contained'
                onClick={() => addToCart(cart)} >
                +
            </Button>
        </div>
        <img src={cart.image} alt={cart.title} />
    </div>
);

export default CartItem;