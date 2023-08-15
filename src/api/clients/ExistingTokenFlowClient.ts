import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { tokenCache } from '../tokenCache';

const authorization = `Bearer ${tokenCache.get().token}`;
console.log('authorization', authorization);
const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

const projectKey = 'eperfume';
const scopes = [
  'view_categories:eperfume manage_my_profile:eperfume manage_my_payments:eperfume view_published_products:eperfume manage_my_business_units:eperfume view_products:eperfume manage_my_shopping_lists:eperfume manage_customers:eperfume manage_my_quote_requests:eperfume manage_my_quotes:eperfume view_product_selections:eperfume manage_my_orders:eperfume create_anonymous_token:eperfume',
];

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withExistingTokenFlow(authorization, options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiExistingTokenRoot = createApiBuilderFromCtpClient(
  ctpClient,
).withProjectKey({
  projectKey: 'eperfume',
});
