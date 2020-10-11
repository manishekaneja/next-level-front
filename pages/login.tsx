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
                Welcome User
              </Typography>
              <Typography
                variant="overline"
                align="center"
                style={{ width: "100%", display: "inline-block" }}
                className={`medium c_454545`}
              >
                Excited to see you here.
              </Typography>
            </div>
            <Divider />
            <div className={`p_20`}>
              <CustomForm
                formIdentifier="login_form"
                fields={[
                  {
                    label: "USERNAME/E-MAIL",
                    name: "username",
                    placeholder: "identify_you_as.",
                    type: "text",
                  },
                  {
                    label: "PASSWORD",
                    name: "password",
                    placeholder: "your_private_key",
                    type: "password",
                  },
                ]}
                submit={<Typography variant="overline">Login</Typography>}
                onSubmit={(value: any) => goto(RoutesEndpoints.NEWS_FEED)}
                footer={
                  <>
                    <Button
                      style={{ marginTop: 10 }}
                      variant="outlined"
                      fullWidth
                      onClick={() => goto(RoutesEndpoints.RESET_PASSWORD)}
                    >
                      <Typography variant="overline">
                        Forgot Password??
                      </Typography>
                    </Button>
                    <Link href="/register">
                      <Typography variant="overline">
                        First Time User??
                      </Typography>
                    </Link>
                  </>
                }
              />
            </div>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
