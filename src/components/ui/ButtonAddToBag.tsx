import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useState, type ReactElement, useEffect } from 'react';
import { Tooltip, IconButton, CircularProgress, Stack } from '@mui/material';
import {
  useAppDispatch,
  useArrayProductsKeysFromCart,
  useIdCart,
  useIsToken,
  useVersionCart,
} from '../../helpers/hooks/Hooks';
import {
  addNumberOfPurchases,
  addToCart,
  setCart,
  setCartIdAndVersion,
  setCartVersion,
  setSendRequest,
} from '../../store/reducers/ShoppingSlice';
import { createAnonymousCart } from '../../api/calls/carts/createAnonymousCart';
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
  const idCart = useIdCart();
  const versionCart = useVersionCart();

  useEffect(() => {
    if (arrayProductsFromCart.includes(props.keyItem)) {
      setFlagIncludInBag(true);
    } else {
      setFlagIncludInBag(false);
    }
  });

  const addLineItemToCart = async (
    id?: string,
    version?: number,
  ): Promise<void> => {
    updateCartById({
      activeCartId: id !== undefined ? id : idCart,
      activeCartVersion: version !== undefined ? version : versionCart,
      addLineItem: {
        productId: props.productId,
        variantId: props.variantId,
        quantity: 1,
      },
    })
      .then((updateCartByIdResp) => {
        dispatch(setCart(updateCartByIdResp.body));
        dispatch(setCartVersion(updateCartByIdResp.body.version));
        setFlagRequest(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAnonymous = async (): Promise<void> => {
    createAnonymousCart()
      .then(async (respAnonymousCart): Promise<void> => {
        dispatch(setCart(respAnonymousCart.body));
        dispatch(
          setCartIdAndVersion({
            id: respAnonymousCart.body.id,
            version: respAnonymousCart.body.version,
          }),
        );
        await addLineItemToCart(
          respAnonymousCart.body.id,
          respAnonymousCart.body.version,
        );
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
              dispatch(addNumberOfPurchases(1));
              dispatch(setSendRequest(true));
              if (isToken) {
                addLineItemToCart().catch((err) => {
                  console.log(err);
                });
              } else {
                createAnonymous().catch((err) => {
                  console.log(err);
                });
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
