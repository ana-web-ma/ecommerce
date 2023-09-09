import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useState, type ReactElement, useEffect } from 'react';
import { Tooltip, IconButton, Button } from '@mui/material';
import {
  useAppDispatch,
  useArrayProductsKeysFromCart,
} from '../../helpers/hooks/Hooks';
import { addToCart, removeFromCart } from '../../store/reducers/ShoppingSlice';
import RemoveShoppingBag from './icons/RemoveShoppingBag';

export function ButtonDeleteFromBag(props: {
  keyItem: string;
}): ReactElement | null {
  const arrayProductsFromCart = useArrayProductsKeysFromCart();
  const dispatch = useAppDispatch();
  const [flagIncludInBag, setFlagIncludInBag] = useState(false);
  useEffect(() => {
    if (arrayProductsFromCart.includes(props.keyItem)) {
      setFlagIncludInBag(true);
    } else {
      setFlagIncludInBag(false);
    }
  });

  return (
    <Button
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
        fontFamily: 'Economica',
        opacity: !flagIncludInBag ? '0' : '1',
        pointerEvents: !flagIncludInBag ? 'none' : 'unset',
      }}
      startIcon={<RemoveShoppingBag />}
      variant="outlined"
      onClick={(): void => {
        console.log('remove');
        dispatch(removeFromCart(props.keyItem));
      }}
    >
      Delete from the Bag
    </Button>
  );
}
