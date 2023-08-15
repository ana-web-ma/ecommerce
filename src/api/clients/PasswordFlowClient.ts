import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = 'eperfume';
const scopes = [
  'view_categories:eperfume manage_my_profile:eperfume manage_my_payments:eperfume view_published_products:eperfume manage_my_business_units:eperfume view_products:eperfume manage_my_shopping_lists:eperfume manage_my_quote_requests:eperfume manage_my_quotes:eperfume manage_my_orders:eperfume create_anonymous_token:eperfume',
];

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'hBpfTYcInBB_kE9FWrx9SFjV',
    clientSecret: 'rqI8pXPJigZoPyB7pyhaNx9NeL2cIhmh',
    user: {
      username: 'name',
      password: 'password',
    },
  },
  scopes,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});
