import { Box, Container } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import BackWallpaper from "../components/common/BackWallpaper";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Post from "../components/Post/Post";
import { useMeQuery } from "../graphql-tsx-gen/graphql";
import { loaderAtom } from "../recoil/atoms/loadingAtom";
import { createUrqlClient } from "../utils/createUrqlClient";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [{ fetching }] = useMeQuery();
  const setLoader = useSetRecoilState(loaderAtom);
  useEffect(() => {
    setLoader(fetching);
  }, [fetching]);
  return (
    <Layout title="Lireddit | Newsfeed" screenType="for_verified_user">
      <Container maxWidth="md">
        <BackWallpaper opacity={0.3} />
        <Header />
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
