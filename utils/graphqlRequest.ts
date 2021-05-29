import { GraphQLClient } from 'graphql-request'

const endpoint = '/api/graphql'

const gqlRequestClient = new GraphQLClient(endpoint)

const fetcher = <T, K>(
  query: string,
  variables?: T,
  requestHeaders?: any
): Promise<K> => gqlRequestClient.request(query, variables, requestHeaders)

export { gqlRequestClient, fetcher }
