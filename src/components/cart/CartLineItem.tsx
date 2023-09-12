import React, {
  type Dispatch,
  type SetStateAction,
  type ReactElement,
  useEffect,
} from 'react';
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { type Cart, type LineItem } from '@commercetools/platform-sdk';
import Image from '../ui/Image';
import PriceComponent from '../ui/Price';
import { updateCartById } from '../../api/calls/carts/updateCartById';
import { cartCache } from '../../api/cartCache';
import CrossIcon from '../ui/icons/CrossIcon';

export default function CartLineItem(props: {
  lineItem: LineItem;
  setCartData: Dispatch<SetStateAction<Cart | null>>;
}): ReactElement {
  const [quantity, setQuantity] = React.useState(props.lineItem.quantity);

  const VariantImage = (): ReactElement => {
    return props.lineItem.variant.images != null ? (
      <Image
        name={props.lineItem.name['en-US']}
        url={props.lineItem.variant.images[0].url}
        maxWidth="50px"
      />
    ) : (
      <></>
    );
  };

  useEffect(() => {
    updateCartById({
      activeCartId: cartCache.id,
      activeCartVersion: cartCache.version,
      changeLineItemQuantity: {
        lineItemId: props.lineItem.id,
        quantity,
      },
    })
      .then((resp) => {
        cartCache.version = resp.body.version;
        props.setCartData(resp.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quantity]);

  const quantityChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setQuantity(Number(event.target.value));
  };

  const deleteItemHandler = (): void => {
    updateCartById({
      activeCartId: cartCache.id,
      activeCartVersion: cartCache.version,
      removeLineItem: {
        lineItemId: props.lineItem.id,
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
  return (
    <>
      <TableRow>
        <TableCell>{props.lineItem.variant.key}</TableCell>
        <TableCell>
          <VariantImage />
        </TableCell>
        <TableCell width={'100px'}>
          <TextField
            variant="outlined"
            type="number"
            value={quantity}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              quantityChangeHandler(event);
            }}
            size="small"
          />
        </TableCell>
        <TableCell>
          <PriceComponent price={props.lineItem.price} />
        </TableCell>
        <TableCell>
          <Stack direction="row" justifyContent="space-between">
            <PriceComponent
              price={props.lineItem.price}
              quantity={props.lineItem.quantity}
            />
            <IconButton
              onClick={() => {
                deleteItemHandler();
              }}
            >
              <CrossIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
