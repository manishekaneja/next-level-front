import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <AppBar variant="elevation" position="fixed">
        <Toolbar>
          <Typography variant="h6"> News feed</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
