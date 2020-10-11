import { useCallback } from "react";
import { useRouter } from "next/router";

function useGoto() {
  const router = useRouter();
  const goto = useCallback(
    (href: string) => {
      if (href && typeof href === "string" && href.length > 0) {
        router.push(href);
      }
    },
    [router]
  );
  return goto;
}

export default useGoto;
