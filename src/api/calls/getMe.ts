import {
  type Customer,
  type ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../clients/ExistingTokenFlowClient';

export const getMe = async (props: {
  id: string;
}): Promise<ClientResponse<Customer>> => {
  return apiRootCreateByToken()
    .customers()
    .withId({ ID: props.id })
    .get()
    .execute();
};
