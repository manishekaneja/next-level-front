import { Box, Container } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import BackWallpaper from "../components/common/BackWallpaper";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Post from "../components/Post/Post";
import { useLogoutMutation, useMeQuery } from "../graphql-tsx-gen/graphql";
// import { userAtom } from "../recoil/atoms/userAtom";
import RoutesEndpoints from "../utils/constants/routes";
import { createUrqlClient } from "../utils/createUrqlClient";
import useCommonApplicationHooks from "../utils/customHook/useCommonApplicationHooks";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [{ fetching: logoutFetching, data: logoutData }] = useLogoutMutation();
  const { setLoader, user, router } = useCommonApplicationHooks();

  useEffect(() => {
    setLoader(logoutFetching);
  }, [logoutFetching]);
  useEffect(() => {
    if (logoutData) {
      router.push(RoutesEndpoints.LOGIN);
    }
  }, [logoutData]);
  return (
    <Layout title="Lireddit | Newsfeed" screenType="for_verified_user">
      <Container maxWidth="md">
        <BackWallpaper opacity={0.3} />
        <Header user={user} />
        <Box
          className="pt-10"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
        >
          {[1, 2, 3, 4].map((_, idx) => (
            <Post key={idx} />
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
