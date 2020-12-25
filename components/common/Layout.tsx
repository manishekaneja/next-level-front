import {
  Button,
  Container,
  CssBaseline,
  LinearProgress,
} from "@material-ui/core";
import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import { useMeQuery } from "../../graphql-tsx-gen/graphql";
import { useRootUserSetter } from "../../redux/RootUser/actions";
import RoutesEndpoints from "../../utils/constants/routes";
import useCommonApplicationHooks from "../../utils/customHook/useCommonApplicationHooks";
import CreateGroup from "../Modal/CreateGroup";
import BackWallpaper from "./BackWallpaper";
import Header from "./Header";
import ShowSnackbar from "./ShowSnackbar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  screenType: "for_verified_user" | "for_unverified_user" | "for_all";
  backgroundOpacity: number;
  showHeader: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  screenType,
  backgroundOpacity,
  showHeader,
}) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const {
    router,
    setLoaderState,
    setSnackbar,
    isLoading,
  } = useCommonApplicationHooks();
  const setUser = useRootUserSetter();
  console.log(isLoading);
  const [{ fetching, data, error }, call] = useMeQuery();

  useEffect(() => {
    setLoaderState(fetching);
    if (!fetching && !error && data) {
      if (screenType === "for_verified_user") {
        console.log(data.me.errors, !data.me.user);
        if (
          !data.me ||
          (data.me &&
            ((data.me.errors && data.me.errors.length > 0) || !data.me.user))
        ) {
          setSnackbar({
            open: true,
            message: "Error Found",
          });
          router.push(RoutesEndpoints.LOGIN);
        } else {
          console.log(data.me.user);
          setUser(data.me.user as ApplicationUser);
        }
      }
      // else if(screenType === "for_unverified_user"){

      // }
      // else if(screenType ==="for_all"){

      // }
    }
  }, [fetching, data]);

  if (error) {
    console.log({ error });
    return (
      <Fragment>
        <Button
          onClick={() => {
            call();
          }}
        >
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
      <main
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <BackWallpaper opacity={backgroundOpacity} />
        {showHeader && <Header />}
        <ShowSnackbar />
        {isLoading ? (
          <LinearProgress
            style={{
              position: "fixed",
              top: 0,
              width: "100%",
              left: 0,
              zIndex: 9999,
            }}
            color="secondary"
          />
        ) : null}
        <Container
          maxWidth="lg"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "stretch",
            
          }}
        >
          {children}
        </Container>
        <CreateGroup/>
      </main>
    </>
  );
};

Layout.defaultProps = {
  title: "Untitled",
};

export default Layout;
