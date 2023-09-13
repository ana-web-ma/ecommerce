import { useState, type ReactElement, useEffect } from 'react';
import { Button } from '@mui/material';
import {
  useAppDispatch,
  useArrayProductsKeysFromCart,
} from '../../helpers/hooks/Hooks';
import {
  addNumberOfPurchases,
  removeFromCart,
} from '../../store/reducers/ShoppingSlice';
import RemoveShoppingBag from './icons/RemoveShoppingBag';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { updateCartById } from '../../api/calls/carts/updateCartById';

export function ButtonDeleteFromBag(props: {
  keyItem: string;
  productId: string;
  variantId: number;
}): ReactElement {
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

  const deleteLineItem = async (
    id: string,
    version: number,
    lineItemId: string,
    quantity: number,
  ): Promise<void> => {
    updateCartById({
      activeCartId: id,
      activeCartVersion: version,
      removeLineItem: {
        lineItemId,
        quantity,
      },
    })
      .then(() => {
        dispatch(addNumberOfPurchases(-quantity));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ActiveCart = (): void => {
    getActiveCart()
      .then(async (getActiveCartResp) => {
        getActiveCartResp.body.lineItems.forEach((item) => {
          if (item.variant.key === props.keyItem) {
            void deleteLineItem(
              getActiveCartResp.body.id,
              getActiveCartResp.body.version,
              item.id,
              item.quantity,
            );
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
      onClick={(e): void => {
        e.preventDefault();
        console.log(props.keyItem);
        dispatch(removeFromCart(props.keyItem));
        ActiveCart();
        setFlagIncludInBag(false);
      }}
    >
      Delete from the Bag
    </Button>
  );
}
