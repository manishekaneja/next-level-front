import { Container, Box, Paper } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import BackWallpaper from "../components/common/BackWallpaper";
import Layout from "../components/common/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import styles from "../styles/Login.module.css";
import CustomForm from "../components/common/CustomForm";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  return (
    <Layout title="Lireddit | Login">
      <Container maxWidth="sm">
        <BackWallpaper />
        <Box
          className={styles.container}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper className={`p-box mb-1_5`}>
            <CustomForm
              formIdentifier="login_form"
              fields={[
                {
                  label: "Username",
                  name: "username",
                  placeholder: "Enter Username Here",
                  type: "text",
                },
                {
                  label: "Password",
                  name: "password",
                  placeholder: "Enter Password Here",
                  type: "password",
                },
                {
                  label: "Password",
                  name: "password",
                  placeholder: "Enter Password Here",
                  type: "text",
                },
              ]}
            />
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
