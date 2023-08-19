import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { tokenCache } from '../tokenCache';

export const apiPasswordFlowRoot = (
  user: UserAuthOptions,
): ByProjectKeyRequestBuilder => {
  const projectKey = 'eperfume';
  const scopes = [
    'view_categories:eperfume manage_my_profile:eperfume manage_my_payments:eperfume view_published_products:eperfume manage_my_business_units:eperfume view_products:eperfume manage_my_shopping_lists:eperfume manage_customers:eperfume manage_my_quote_requests:eperfume manage_my_quotes:eperfume view_product_selections:eperfume manage_my_orders:eperfume create_anonymous_token:eperfume',
  ];

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: '8YObslvhK1uQiOEz2FhcaDNO',
      clientSecret: 'ZHe9UcSrOk7bVKPAJRRjS5FK7kgKsvp0',
      user: {
        username: user.username,
        password: user.password,
      },
    },
    tokenCache,
    scopes,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
};
