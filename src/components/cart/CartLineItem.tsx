import React, { type ReactElement, useEffect } from 'react';
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { type LineItem } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import Image from '../ui/Image';
import PriceComponent from '../ui/Price/Price';
import { updateCartById } from '../../api/calls/carts/updateCartById';
import CrossIcon from '../ui/icons/CrossIcon';
import {
  useAppDispatch,
  useIdCart,
  useVersionCart,
} from '../../helpers/hooks/Hooks';
import {
  setCartVersion,
  setCart,
  addNumberOfPurchases,
  resetNumberOfPurchases,
  removeFromCart,
  addToCart,
} from '../../store/reducers/ShoppingSlice';

export default function CartLineItem(props: {
  lineItem: LineItem;
}): ReactElement {
  const [quantity, setQuantity] = React.useState(props.lineItem.quantity);
  const [firstRender, setFirstRender] = React.useState(true);

  const dispatch = useAppDispatch();
  const idActiveCart = useIdCart();
  const versionActiveCart = useVersionCart();

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
    if (firstRender) {
      setFirstRender(false);
    } else {
      updateCartById({
        activeCartId: idActiveCart,
        activeCartVersion: versionActiveCart,
        changeLineItemQuantity: {
          lineItemId: props.lineItem.id,
          quantity,
        },
      })
        .then((resp) => {
          dispatch(setCartVersion(resp.body.version));
          dispatch(setCart(resp.body));
          dispatch(resetNumberOfPurchases());
          dispatch(removeFromCart('remove'));
          resp.body.lineItems.forEach((item) => {
            dispatch(addNumberOfPurchases(item.quantity));
            dispatch(
              addToCart(item.variant.key !== undefined ? item.variant.key : ''),
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [quantity]);

  const quantityChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setQuantity(Number(event.target.value));
  };

  const deleteItemHandler = (): void => {
    updateCartById({
      activeCartId: idActiveCart,
      activeCartVersion: versionActiveCart,
      removeLineItem: {
        lineItemId: props.lineItem.id,
      },
    })
      .then((resp) => {
        dispatch(setCartVersion(resp.body.version));
        dispatch(setCart(resp.body));
        dispatch(resetNumberOfPurchases());
        dispatch(
          removeFromCart(
            props.lineItem.variant.key !== undefined
              ? props.lineItem.variant.key
              : '',
          ),
        );
        resp.body.lineItems.forEach((item) => {
          dispatch(addNumberOfPurchases(item.quantity));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <NavLink
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`/product/${
              props.lineItem.productKey !== undefined
                ? props.lineItem.productKey
                : ''
            }`}
          >
            {props.lineItem.variant.key}
          </NavLink>
        </TableCell>
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
          <PriceComponent
            price={props.lineItem.price}
            discountedPrice={props.lineItem.discountedPricePerQuantity}
          />
        </TableCell>
        <TableCell>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <PriceComponent
              price={props.lineItem.price}
              quantity={props.lineItem.quantity}
              discountedPrice={props.lineItem.discountedPricePerQuantity}
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
