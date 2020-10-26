import { Box, Container } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import BackWallpaper from "../components/common/BackWallpaper";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Post from "../components/Post/Post";
import { createUrqlClient } from "../utils/createUrqlClient";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  return (
    <Layout title="Lireddit | Newsfeed">
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
