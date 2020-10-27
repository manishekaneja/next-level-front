import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { useLogoutMutation } from "../../../graphql-tsx-gen/graphql";
import { UserAtomType } from "../../../recoil/atoms/userAtom";

interface HeaderProps {
  user: UserAtomType;
}
const Header: React.FC<HeaderProps> = ({ user }) => {
  const [, logoutAction] = useLogoutMutation();

  return (
    <>
      <AppBar variant="elevation" position="fixed">
        <Toolbar>
          <Link href={"/asdasd"}>
            <Typography variant="h6"> News feed</Typography>
          </Link>
          <div style={{ flex: 1 }} />
          {user ? (
            <>
              <Typography variant="body1"> {user.username}</Typography>
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
      <Toolbar />
    </>
  );
};

export default Header;
