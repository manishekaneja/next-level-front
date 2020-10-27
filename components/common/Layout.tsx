import { CssBaseline, LinearProgress } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMeQuery } from "../../graphql-tsx-gen/graphql";
import { loaderAtom } from "../../recoil/atoms/loadingAtom";
import { snackbarAtom } from "../../recoil/atoms/snackbarAtom";
import { userAtom } from "../../recoil/atoms/userAtom";
import RoutesEndpoints from "../../utils/constants/routes";
import ShowSnackbar from "./ShowSnackbar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  screenType: "for_verified_user" | "for_unverified_user" | "for_all";
}

const Layout: React.FC<LayoutProps> = ({ children, title, screenType }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  const setLoader = useSetRecoilState(loaderAtom);
  const setSnackbar = useSetRecoilState(snackbarAtom);
  const setUser = useSetRecoilState(userAtom);

  const [{ fetching, data }] = useMeQuery();
  useEffect(() => {
    setLoader(fetching);
    console.log({ fetching, data });
    if (!fetching) {
      if ((!data || !data.me || data.me.errors) && !data.me.user) {
        if (screenType === "for_verified_user") {
          setSnackbar({
            open: true,
            message: data?.me.errors[0].message,
          });
          router.push(RoutesEndpoints.LOGIN);
        }
      } else {
        if (screenType === "for_unverified_user") {
          if (data.me.user !== null) {
            router.replace(RoutesEndpoints.NEWS_FEED);
            setUser(data.me.user);
          }
        }
      }
    }
  }, [fetching, data]);

  const loading = useRecoilValue(loaderAtom);
  // const user = useRecoilState(userAtom);
  // if (isBrowser) {
  //   if (screenType === "for_verified_user") {
  //     if (user === null) {
  //       router.replace(RoutesEndpoints.LOGIN);
  //     }
  //   }
  //   if (screenType === "for_unverified_user") {
  //     if (user !== null) {
  //       router.replace(RoutesEndpoints.NEWS_FEED);
  //     }
  //   }
  // }
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <CssBaseline />
      <main>
        {children}
        <ShowSnackbar />
        {loading && (
          <LinearProgress
            style={{ position: "fixed", top: 0, width: "100%", left: 0 }}
            color="secondary"
          />
        )}
      </main>
    </>
  );
};

Layout.defaultProps = {
  title: "Untitled",
};

export default Layout;
