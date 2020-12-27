import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useEffect } from "react";
import { useLogoutMutation } from "../../../graphql-tsx-gen/graphql";
import useCommonApplicationHooks from "../../../utils/customHook/useCommonApplicationHooks";

const Header: React.FC<{}> = () => {
  const [
    { fetching: logoutFetching, data: logoutResponse },
    logoutAction,
  ] = useLogoutMutation();
  const { setLoaderState, rootUser } = useCommonApplicationHooks();

  useEffect(() => {
    setLoaderState(logoutFetching);
  }, [logoutFetching, logoutResponse]);
  return (
    <>
      <AppBar variant="elevation" position="fixed">
        <Toolbar>
          <Link href={"/asdasd"}>
            <Typography variant="h6"> News feed</Typography>
          </Link>
          <div style={{ flex: 1 }} />
          {rootUser ? (
            <>
              <Typography variant="body1"> {rootUser.username}</Typography>
              <Button
                color="inherit"
                onClick={() => logoutAction({ removeAll: false })}
              >
                <Typography variant="body1" color="inherit">
                  Logout
                </Typography>
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Toolbar style={{ minWidth: 64, maxWidth: 64 }} />
    </>
  );
};

export default Header;
