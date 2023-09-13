import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import {
  useAppDispatch,
  useIsToken,
  useNumberOfPurchases,
} from '../../helpers/hooks/Hooks';
import {
  addNumberOfPurchases,
  addToCart,
  resetNumberOfPurchases,
} from '../../store/reducers/ShoppingSlice';

export default function getCartForStore(): void {
  const dispatch = useAppDispatch();
  if (useIsToken() && useNumberOfPurchases() === 0) {
    getActiveCart()
      .then(async (getActiveCartResp) => {
        dispatch(resetNumberOfPurchases());
        getActiveCartResp.body.lineItems.forEach((item) => {
          dispatch(addNumberOfPurchases(item.quantity));
          if (item.variant.key !== undefined)
            dispatch(addToCart(item.variant.key));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
