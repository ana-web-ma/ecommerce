import {
  type LineItem,
  type Cart,
  type CentPrecisionMoney,
} from '@commercetools/platform-sdk';
import { Button, Stack, Typography } from '@mui/material';
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
  };
  return props.totalPrice !== undefined ? (
    <>
      <Stack columnGap={2} direction="row-reverse" pt={1}>
        <Button
          variant="text"
          onClick={() => {
            clearCartHandler();
          }}
        >
          <Typography variant="subtitle2">Clear cart</Typography>
        </Button>
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
