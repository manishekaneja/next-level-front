import React from "react";
import { withUrqlClient } from "next-urql";
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Link,
} from "@material-ui/core";
import BackWallpaper from "../components/common/BackWallpaper";
import Layout from "../components/common/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import styles from "../styles/Login.module.css";
import CustomForm from "../components/common/CustomForm";
import useGoto from "../utils/customHook/useGoto";
import RoutesEndpoints from "../utils/constants/routes";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const goto = useGoto();
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
          <Paper
            className={`mb_22`}
            style={{ backgroundColor: "rgba(225,225,225,0.85)" }}
          >
            <div className={`py_10`}>
              <Typography
                variant="h4"
                align="center"
                className={`medium c_333`}
              >
                Reset Password
              </Typography>
            </div>
            <Divider />
            <div className={`p_20`}>
              <CustomForm
                formIdentifier="login_form"
                fields={[
                  {
                    label: "NEW PASSWORD",
                    name: "password",
                    type: "password",
                  },
                  {
                    label: "CONFIRM PASSWORD",
                    name: "confirm_password",
                    type: "password",
                  },
                ]}
                submit={
                  <Typography variant="overline">Reset Password</Typography>
                }
                onSubmit={(value: any) => {
                  console.log({ value });
                  goto(RoutesEndpoints.LOGIN);
                }}
              />
            </div>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
