import React, {
  type Dispatch,
  type SetStateAction,
  type ReactElement,
  useEffect,
} from 'react';
import { TableCell, TableRow, TextField } from '@mui/material';
import { type Cart, type LineItem } from '@commercetools/platform-sdk';
import Image from '../ui/Image';
import PriceComponent from '../ui/Price';
import { updateCartById } from '../../api/calls/carts/updateCartById';
import { cartCache } from '../../api/cartCache';

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
      // addLineItem: {
      //   productId: props.lineItem.productId,
      //   variantId: props.lineItem.variant.id,
      //   quantity,
      // },
      changeLineItemQuantity: {
        lineItemId: props.lineItem.id,
        quantity,
      },
    })
      .then((resp) => {
        cartCache.version = resp.body.version;
        props.setCartData(resp.body);
        console.log(resp.body);
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
          <PriceComponent
            price={props.lineItem.price}
            quantity={props.lineItem.quantity}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
