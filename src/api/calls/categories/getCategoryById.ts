import {
  type ClientResponse,
  type Category,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const getCategoryById = async (props: {
  id: string;
}): Promise<ClientResponse<Category>> => {
  return apiRoot.categories().withId({ ID: props.id }).get().execute();
};

// How to use:

// getCategoryById({ id: '26920e5c-0643-440d-aa79-2a82a76c97a4' })
// .then((resp) => {
//   console.log('ancestors', resp.body.ancestors);
// })
// .catch(console.log);
