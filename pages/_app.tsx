import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { loaderAtom } from "../recoil/atoms/loadingAtom";
import "../styles/globals.css";
import useCommonApplicationHooks from "../utils/customHook/useCommonApplicationHooks";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function usePageTransitionLoader() {
  const { setLoader, router } = useCommonApplicationHooks();
  useEffect(() => {
    const handleRouteChange = () => {
      setLoader(true);
    };
    const handleRouteComplete = () => {
      setLoader(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);
  return null;
}

function MyApp({ Component, pageProps }) {
  usePageTransitionLoader();
  return <Component {...pageProps} />;
}

const EntryPoint = (props) => (
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <MyApp {...props} />
    </RecoilRoot>
  </ThemeProvider>
);

export default EntryPoint;
