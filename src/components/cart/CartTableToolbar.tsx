import {
  type LineItem,
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
  TextField,
} from '@mui/material';
import React, { useEffect, type ReactElement } from 'react';
import { updateCartById } from '../../api/calls/carts/updateCartById';
import {
  useAppDispatch,
  useIdCart,
  useVersionCart,
} from '../../helpers/hooks/Hooks';
import {
  setCartVersion,
  setCart,
  resetNumberOfPurchases,
  removeFromCart,
} from '../../store/reducers/ShoppingSlice';

export default function CartTableToolbar(props: {
  totalPrice: CentPrecisionMoney | undefined;
  lineItems: LineItem[];
}): ReactElement {
  const dispatch = useAppDispatch();
  const idActiveCart = useIdCart();
  const versionActiveCart = useVersionCart();
  const [open, setOpen] = React.useState(false);
  const [promoCodeInputValue, setPromoCodeInputValue] = React.useState('');
  const [fullTotalPrice, setFullTotalPrice] = React.useState(0);
  const fontSize = { xs: 16, sm: 16, md: 16, lg: 18, xl: 20 };

  useEffect(() => {
    setFullTotalPrice(
      props.lineItems.reduce(
        (acc, el) => acc + el.price.value.centAmount * el.quantity,
        0,
      ) / 100,
    );
  }, [props.totalPrice]);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const clearCartHandler = (): void => {
    const ids = props.lineItems.map((item) => item.id);
    updateCartById({
      activeCartId: idActiveCart,
      activeCartVersion: versionActiveCart,
      clearLineItems: {
        lineItemIds: ids,
      },
    })
      .then((resp) => {
        dispatch(setCartVersion(resp.body.version));
        dispatch(setCart(resp.body));
        dispatch(resetNumberOfPurchases());
        dispatch(removeFromCart('remove'));
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  const handleApplyPromoCode = (): void => {
    console.log('Apply', props.lineItems);
    updateCartById({
      activeCartId: idActiveCart,
      activeCartVersion: versionActiveCart,
      addDiscountCode: {
        code: promoCodeInputValue.toLowerCase(),
      },
    })
      .then((resp) => {
        dispatch(setCartVersion(resp.body.version));
        dispatch(setCart(resp.body));
        console.log(resp.body);
      })
      .catch((err) => {
        console.log(err);
      });
    setPromoCodeInputValue('');
  };

  return props.totalPrice !== undefined ? (
    <>
      <Stack
        columnGap={2}
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row-reverse' },
        }}
        pt={1}
      >
        <Button
          variant="text"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize,
            }}
          >
            Clear cart
          </Typography>
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
          columnGap={2}
          alignItems="center"
          justifyContent="flex-end"
          mr={3}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          {props.totalPrice.centAmount / 100 === fullTotalPrice ? (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize,
                }}
              >
                Total:
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize,
                }}
              >
                {(props.totalPrice.centAmount / 100).toFixed(2)}€
              </Typography>
            </>
          ) : (
            <Stack
              flexDirection={'row'}
              columnGap={1}
              sx={{
                paddingTop: { xs: 3, sm: 0 },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  whiteSpace: 'nowrap',
                  fontSize: { xs: 18, sm: 18, md: 18, lg: 18, xl: 20 },
                }}
              >
                {`${(props.totalPrice.centAmount / 100).toFixed(2)} €`}
              </Typography>
              <Typography
                variant="subtitle2"
                style={{
                  textDecorationLine: 'line-through',
                  opacity: '0.6',
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                }}
                sx={{
                  fontSize: { xs: 18, sm: 18, md: 18, lg: 18, xl: 20 },
                }}
              >
                {`${fullTotalPrice.toFixed(2)} €`}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack mr="auto" direction="row" alignItems="center" columnGap={1}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: { xs: 16, sm: 16, md: 16, lg: 18, xl: 20 },
            }}
          >
            Promo code:
          </Typography>
          <TextField
            size="small"
            hiddenLabel
            variant="outlined"
            placeholder="Placeholder"
            value={promoCodeInputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPromoCodeInputValue(event.target.value);
            }}
            sx={{
              fontSize,
            }}
          ></TextField>
          <Button
            variant="text"
            onClick={() => {
              handleApplyPromoCode();
            }}
            sx={{
              fontSize,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontSize,
              }}
            >
              Apply
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </>
  ) : (
    <></>
  );
}
