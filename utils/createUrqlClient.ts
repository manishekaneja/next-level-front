import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { v4 as uuidv4 } from "uuid";
import { MeDocument } from "../graphql-tsx-gen/graphql";
import isBrowser from "./isBrowser";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: isBrowser()
    ? "http://localhost:8000/graphql"
    : "http://backend:3000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        UserResponse: () => uuidv4(),
        FieldError: () => uuidv4(),
      },
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
          logout: (_result, _, cache, __) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: LogoutMutation, query: MeQuery): MeQuery => {
                if (result.logout) {
                  return {
                    me: {
                      user: null,
                    },
                  };
                } else {
                  return query;
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
