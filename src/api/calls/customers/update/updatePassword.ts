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
