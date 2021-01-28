import React, { FC } from 'react';
//material-ui components
import Button from '@material-ui/core/Button';
//types
import { CartItemType } from 'App';
//styles
import styles from 'Item/Item.module.scss';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
};

export const Item: FC<Props> = ({ item, handleAddToCart }) => (
    <div className={styles.wrapper}>

        <img src={item.image} alt={item.title} />
        
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>

        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>

    </div>
);
