import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import store from "../redux/index";
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
  const { setLoaderState, router } = useCommonApplicationHooks();
  useEffect(() => {
    const handleRouteChange = () => {
      setLoaderState(true);
    };
    const handleRouteComplete = () => {
      setLoaderState(false);
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
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MyApp {...props} />
    </ThemeProvider>
  </Provider>
);

export default EntryPoint;
