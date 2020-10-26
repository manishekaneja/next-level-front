import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../graphql-tsx-gen/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _, cache, __) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: LoginMutation, query: MeQuery): MeQuery => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login,
                  };
                }
              }
            );
          },
          register: (_result, _, cache, __) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: RegisterMutation, query: MeQuery): MeQuery => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
