import {
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';

// Returns user data and save the token
export const authExistingTokenCustomer = async (props: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRootCreateByToken()
    .me()
    .login()
    .post({
      body: {
        email: props.email,
        password: props.password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};

// How to use:

// authExistingTokenCustomer({
//   email: 'a@a.aa',
//   password: '!1Aaaaaa',
// })
//   .then((authExistingTokenCustomerResp) => {
//     tokenCache.set({ expirationTime: 0, token: '' });
//     authPasswordCustomer({
//       email: 'a@a.aa',
//       password: '!1Aaaaaa',
//     })
//       .then((authPasswordCustomerResp) => {
//         console.log('authPasswordCustomerResp', authPasswordCustomerResp);
//       })
//       .catch(console.error);
//   })
//   .catch(console.error);
