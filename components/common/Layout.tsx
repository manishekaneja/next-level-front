import { Button, CssBaseline, LinearProgress } from "@material-ui/core";
import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import { useMeQuery } from "../../graphql-tsx-gen/graphql";
import RoutesEndpoints from "../../utils/constants/routes";
import useCommonApplicationHooks from "../../utils/customHook/useCommonApplicationHooks";
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

  const {
    router,
    setLoader,
    setSnackbar,
    setUser,
    loading,
  } = useCommonApplicationHooks();

  const [{ fetching, data, error }, call] = useMeQuery();

  useEffect(() => {
    setLoader(fetching);
    if (!fetching && !error) {
      if ((!data || !data.me || data.me.errors) && !data.me.user) {
        if (screenType === "for_verified_user") {
          setSnackbar({
            open: true,
            message: "Error Found",
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

  if (error) {
    return (
      <Fragment>
        <Button
          onClick={() => {
            call();
          }}
        >
          {" "}
          make A Call
        </Button>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </Fragment>
    );
  }

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
