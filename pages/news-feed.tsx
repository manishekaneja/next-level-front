import { Box, Container } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import BackWallpaper from "../components/common/BackWallpaper";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Post from "../components/Post/Post";
import { useLogoutMutation, useMeQuery } from "../graphql-tsx-gen/graphql";
import { loaderAtom } from "../recoil/atoms/loadingAtom";
import { snackbarAtom } from "../recoil/atoms/snackbarAtom";
import { userAtom } from "../recoil/atoms/userAtom";
// import { userAtom } from "../recoil/atoms/userAtom";
import RoutesEndpoints from "../utils/constants/routes";
import { createUrqlClient } from "../utils/createUrqlClient";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  // const [{ fetching, data }] = useMeQuery();
  const [{ fetching: logoutFetching, data: logoutData }] = useLogoutMutation();
  const setLoader = useSetRecoilState(loaderAtom);
  // const setUser = useSetRecoilState(userAtom);
  const userObject = useRecoilState(userAtom);
  const router = useRouter();
  useEffect(() => {
    setLoader(logoutFetching);
  }, [logoutFetching]);
  useEffect(() => {
    if (logoutData?.logout) {
      router.push(RoutesEndpoints.LOGIN);
    }
  }, [logoutData]);
  return (
    <Layout title="Lireddit | Newsfeed" screenType="for_verified_user">
      <Container maxWidth="md">
        <BackWallpaper opacity={0.3} />
        <Header user={userObject} />
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
