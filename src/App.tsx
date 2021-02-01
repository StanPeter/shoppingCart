import React, { useState } from 'react';
import { useQuery } from 'react-query';
//components
import { Item } from 'Item/Item';
import Cart from 'Cart/Cart';
//material-ui components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
//styles
import styles from 'App.module.scss';

export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
};

//fetching function
const getProducts = async (): Promise<CartItemType[]> =>
  /* same as 
  const response = await fetch(/url);
  const json = await response.json();
  */
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  //get all items in the cart
  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0);

  //add items to cart
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      //is the item in the cart? -> increase its amount by 1, else add brandly new item
      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        ));
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    })
  };

  //remove an item from the cart
  const handleRemoveFromCart = (removedId: number) => {
    setCartItems(prev => {
      const isItemAmountGreater = prev.find(item => item.id === removedId && item.amount > 1);

      //is the item's amount greater than 1? -> decrease its amount by 1, else remove it entirely
      if (isItemAmountGreater) {
        return prev.map(item => (
          item.id === removedId ? { ...item, amount: item.amount - 1 } : item
        ));
      }

      return prev.filter(item => item.id !== removedId);
    })
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div style={{ color: 'red' }}>There was an error</div>

  return (
    <div className={styles.wrapper}>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>

      <button className={styles.customButton} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </button>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

    </div>
  );
};

export default App;
