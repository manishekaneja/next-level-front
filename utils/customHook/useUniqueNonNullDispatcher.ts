import _ from "lodash";
import { Dispatch, SetStateAction, useCallback } from "react";

function useUniqueNonNullDispatcher<T>() {
  return useCallback(
    (dispatcher: Dispatch<SetStateAction<Array<T>>>,key:keyof T) => {
      return useCallback(
        (arg: SetStateAction<Array<T>>) => {
          if (arg instanceof Array) {
            console.log({ arg });
            dispatcher(
              _.uniqBy<T>(
                _.filter<T>(arg, key),
                "username"
              )
            );
          } else {
            dispatcher((pl) => {
              console.log({ ok: arg(pl) });
              return _.uniqBy<T>(
                _.filter<T>(arg(pl), key),
                "username"
              );
            });
          }
        },
        [dispatcher,key]
      );
    },
    []
  );
}

export { useUniqueNonNullDispatcher };
