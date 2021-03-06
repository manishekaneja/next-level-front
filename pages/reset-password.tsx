import { Box, Container, Divider, Paper, Typography } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import BackWallpaper from "../components/common/BackWallpaper";
import CustomForm from "../components/common/CustomForm";
import Layout from "../components/common/Layout";
import styles from "../styles/account.module.css";
import RoutesEndpoints from "../utils/constants/routes";
import { createUrqlClient } from "../utils/createUrqlClient";
import useGoto from "../utils/customHook/useGoto";

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const goto = useGoto();
  return (
    <Layout
      title="Lireddit | Login"
      screenType="for_all"
      showHeader={false}
      backgroundOpacity={1}
    >
      <Container maxWidth="sm">
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
                    validator: () => "",
                  },
                  {
                    label: "CONFIRM PASSWORD",
                    name: "confirm_password",
                    type: "password",
                    validator: () => "",
                  },
                ]}
                submit={
                  <Typography variant="overline">Reset Password</Typography>
                }
                onSubmit={(value: any) => {
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
