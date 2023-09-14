import { useState, type ReactElement, useEffect } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  useAppDispatch,
  useArrayProductsKeysFromCart,
  useCart,
  useIdCart,
  useVersionCart,
} from '../../helpers/hooks/Hooks';
import {
  addNumberOfPurchases,
  removeFromCart,
  resetNumberOfPurchases,
  setCart,
  setCartVersion,
} from '../../store/reducers/ShoppingSlice';
import RemoveShoppingBag from './icons/RemoveShoppingBag';
import { updateCartById } from '../../api/calls/carts/updateCartById';

export function ButtonDeleteFromBag(props: {
  keyItem: string;
  productId: string;
  variantId: number;
}): ReactElement {
  const arrayProductsFromCart = useArrayProductsKeysFromCart();
  const dispatch = useAppDispatch();
  const [flagIncludInBag, setFlagIncludInBag] = useState(false);
  const cartData = useCart();
  const idCart = useIdCart();
  const versionCart = useVersionCart();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (arrayProductsFromCart.includes(props.keyItem)) {
      setFlagIncludInBag(true);
    } else {
      setFlagIncludInBag(false);
    }
  }, [arrayProductsFromCart, props.keyItem]);

  const deleteLineItem = async (): Promise<void> => {
    if (cartData !== null) {
      cartData.lineItems.forEach((lineItem) => {
        if (lineItem.variant.key === props.keyItem) {
          updateCartById({
            activeCartId: idCart,
            activeCartVersion: versionCart,
            removeLineItem: {
              lineItemId: lineItem.id,
            },
          })
            .then((res) => {
              dispatch(setCart(res.body));
              setOpenSnackbar(true);
              dispatch(setCartVersion(res.body.version));
              dispatch(resetNumberOfPurchases());
              res.body.lineItems.forEach((item) => {
                dispatch(addNumberOfPurchases(item.quantity));
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setOpenSnackbar(false);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
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
        onClick={() => {
          dispatch(removeFromCart(props.keyItem));
          deleteLineItem().catch(console.error);
          setFlagIncludInBag(false);
        }}
      >
        Delete from the Bag
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message="The product was removed."
        action={action}
      />
    </>
  );
}
