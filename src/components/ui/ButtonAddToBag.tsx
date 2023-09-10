import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useState, type ReactElement, useEffect } from 'react';
import { Tooltip, IconButton, CircularProgress, Stack } from '@mui/material';
import {
  useAppDispatch,
  useArrayProductsKeysFromCart,
} from '../../helpers/hooks/Hooks';
import { addToCart } from '../../store/reducers/ShoppingSlice';

export function ButtonAddToBag(props: { keyItem: string }): ReactElement {
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
    <Stack direction={'row'} alignItems={'center'}>
      {/* <CircularProgress size={'20px'} /> */}
      <Tooltip
        title={
          flagIncludInBag ? 'Product is already in your bag' : 'Add to the Bag'
        }
      >
        <span>
          <IconButton
            onClick={(e): void => {
              e.preventDefault();
              dispatch(addToCart(props.keyItem));
            }}
            disabled={flagIncludInBag}
          >
            <ShoppingBagIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}
