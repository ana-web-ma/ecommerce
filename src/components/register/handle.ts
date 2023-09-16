import { type SubmitHandler, type FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { authExistingTokenCustomer } from '../../api/calls/customers/authExistingTokenCustomer';
import { authPasswordCustomer } from '../../api/calls/customers/authPasswordCustomer';
import { tokenCache } from '../../api/tokenCache';
import { useAppDispatch, useIsToken } from '../../helpers/hooks/Hooks';
import { login } from '../../store/reducers/CustomerSlice';
import {
  setCart,
  setCartIdAndVersion,
  resetNumberOfPurchases,
  addNumberOfPurchases,
  addToCart,
} from '../../store/reducers/ShoppingSlice';

const dispatch = useAppDispatch();
const isToken = useIsToken();
const navigate = useNavigate();

export function refreshActiveCart(): void {
  getActiveCart()
    .then(async (getActiveCartResp) => {
      dispatch(setCart(getActiveCartResp.body));
      dispatch(
        setCartIdAndVersion({
          id: getActiveCartResp.body.id,
          version: getActiveCartResp.body.version,
        }),
      );
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

export const handleSubmitForm = async (props: {
  email: string;
  password: string;
}): Promise<void> => {
  const customerData = {
    email: props.email,
    password: props.password,
  };
  if (isToken) {
    authExistingTokenCustomer(customerData)
      .then(() => {
        tokenCache.set({ expirationTime: 0, token: '' });
        authPasswordCustomer(customerData)
          .then((authPasswordCustomerResp) => {
            refreshActiveCart();
            dispatch(
              login({
                customer: authPasswordCustomerResp.body.customer,
                token: tokenCache.get().token,
              }),
            );
            navigate('/');
          })
          .catch(console.error);
      })
      .catch(console.error);
  } else {
    authPasswordCustomer(customerData)
      .then((authPasswordCustomerResp) => {
        dispatch(
          login({
            customer: authPasswordCustomerResp.body.customer,
            token: tokenCache.get().token,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  }
};
