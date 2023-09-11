import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useState, type ReactElement, useEffect } from 'react';
import { Tooltip, IconButton, CircularProgress, Stack } from '@mui/material';
import {
  useAppDispatch,
  useArrayProductsKeysFromCart,
  useIsToken,
} from '../../helpers/hooks/Hooks';
import {
  addToCart,
  setCart,
  setCartVersion,
  setSendRequest,
} from '../../store/reducers/ShoppingSlice';
import { createAnonymousCart } from '../../api/calls/carts/createAnonymousCart';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { updateCartById } from '../../api/calls/carts/updateCartById';

export function ButtonAddToBag(props: {
  keyItem: string;
  productId: string;
  variantId: number;
}): ReactElement {
  const arrayProductsFromCart = useArrayProductsKeysFromCart();
  const dispatch = useAppDispatch();
  const [flagIncludInBag, setFlagIncludInBag] = useState(false);
  const [flagRequest, setFlagRequest] = useState(false);
  const isToken = useIsToken();

  useEffect(() => {
    if (arrayProductsFromCart.includes(props.keyItem)) {
      setFlagIncludInBag(true);
    } else {
      setFlagIncludInBag(false);
    }
  });

  const updateCart = async (id: string, version: number): Promise<void> => {
    updateCartById({
      activeCartId: id,
      activeCartVersion: version,
      addLineItem: {
        productId: props.productId,
        variantId: props.variantId,
        quantity: 1,
      },
    })
      .then((updateCartByIdResp) => {
        dispatch(setCartVersion(updateCartByIdResp.body.version));
        setFlagRequest(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ActiveCart = async (): Promise<void> => {
    getActiveCart()
      .then(async (getActiveCartResp) => {
        dispatch(
          setCart({
            id: getActiveCartResp.body.id,
            version: getActiveCartResp.body.version,
          }),
        );
        await updateCart(
          getActiveCartResp.body.id,
          getActiveCartResp.body.version,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAnonymous = async (): Promise<void> => {
    createAnonymousCart()
      .then(async (): Promise<void> => {
        await ActiveCart();
      })
      .catch(console.error);
  };

  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Tooltip
        title={
          flagIncludInBag ? 'Product is already in your bag' : 'Add to the Bag'
        }
      >
        <span>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setFlagRequest(true);
              dispatch(addToCart(props.keyItem));
              dispatch(setSendRequest(true));
              if (isToken) {
                void ActiveCart();
              } else {
                void createAnonymous();
              }
            }}
            disabled={flagIncludInBag}
          >
            {flagRequest ? (
              <CircularProgress size={'24px'} />
            ) : (
              <ShoppingBagIcon />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}
