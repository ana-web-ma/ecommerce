import {
  type Customer,
  type ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../../clients/ExistingTokenFlowClient';
import { getMe } from '../../getMe';

export const updatePassword = async (props: {
  id: string;
  currentPassword: string;
  newPassword: string;
}): Promise<ClientResponse<Customer>> => {
  return apiRootCreateByToken()
    .me()
    .password()
    .post({
      body: {
        currentPassword: props.currentPassword,
        newPassword: props.newPassword,
        version: (await getMe({ id: props.id })).body.version,
      },
    })
    .execute();
};

// How to use

// updatePassword({
//   id: '3af6470b-59b5-4d4e-9a7b-81133a440499',
//   currentPassword: '!1Aaaaab',
//   newPassword: '!1Aaaaaa',
// })
//   .then((updateResp) => {
//     console.log('updateResp', updateResp);
//   })
//   .catch(console.log);
