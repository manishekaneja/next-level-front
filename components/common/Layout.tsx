import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import Head from "next/head";

import { CssBaseline } from "@material-ui/core";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
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
        <RecoilRoot>{children}</RecoilRoot>
      </main>
    </>
  );
};

Layout.defaultProps = {
  title: "Untitled",
};

export default Layout;
