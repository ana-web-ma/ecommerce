import {
  type LineItem,
  type Cart,
  type CentPrecisionMoney,
} from '@commercetools/platform-sdk';
import {
  DialogContentText,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  DialogActions,
} from '@mui/material';
import React, {
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react';
import { updateCartById } from '../../api/calls/carts/updateCartById';
import { cartCache } from '../../api/cartCache';

export default function CartTableToolbar(props: {
  totalPrice: CentPrecisionMoney | undefined;
  setCartData: Dispatch<SetStateAction<Cart | null>>;
  lineItems: LineItem[];
}): ReactElement {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const clearCartHandler = (): void => {
    const ids = props.lineItems.map((item) => item.id);
    updateCartById({
      activeCartId: cartCache.id,
      activeCartVersion: cartCache.version,
      clearLineItems: {
        lineItemIds: ids,
      },
    })
      .then((resp) => {
        cartCache.version = resp.body.version;
        props.setCartData(resp.body);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };
  return props.totalPrice !== undefined ? (
    <>
      <Stack columnGap={2} direction="row-reverse" pt={1}>
        <Button
          variant="text"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <Typography variant="subtitle2">Clear cart</Typography>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Typography variant="subtitle2">Empty shopping cart?</Typography>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={clearCartHandler} autoFocus>
              Clear cart
            </Button>
          </DialogActions>
        </Dialog>
        <Stack
          direction="row"
          columnGap={2}
          alignItems="center"
          justifyContent="flex-end"
          mr={3}
        >
          <Typography variant="subtitle2">Total:</Typography>
          <Typography variant="subtitle2">
            {props.totalPrice.centAmount / 100}€
          </Typography>
        </Stack>
      </Stack>
    </>
  ) : (
    <></>
  );
}
