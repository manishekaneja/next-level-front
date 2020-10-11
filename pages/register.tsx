import React, { useCallback } from "react";
import Layout from "../components/common/Layout";
import BackWallpaper from "../components/common/BackWallpaper";
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";

import styles from "../styles/Login.module.css";
import CustomForm from "../components/common/CustomForm";
import useGoto from "../utils/customHook/useGoto";
import Routes from "../utils/constants/routes";

interface RegisterProps {}
const Regsiter: React.FC<RegisterProps> = () => {
  const goto = useGoto();
  return (
    <Layout title="Lireddit | Register">
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
                Create an Account
              </Typography>
            </div>
            <Divider />
            <div className={`p_20`}>
              <CustomForm
                formIdentifier="login_form"
                fields={[
                  {
                    label: "E-MAIL",
                    name: "email",
                    placeholder: "",
                    type: "email",
                  },
                  {
                    label: "USERNAME",
                    name: "username",
                    placeholder: "",
                    type: "text",
                  },
                  {
                    label: "PASSWORD",
                    name: "password",
                    type: "password",
                  },
                  {
                    label: "CONFIRM PASSWORD",
                    name: "confirm-password",
                    type: "password",
                  },
                ]}
                submit={<Typography variant="overline">Continue</Typography>}
                onSubmit={(value: any) => console.log({ value })}
                footer={
                  <Button
                    style={{ marginTop: 10 }}
                    variant="outlined"
                    fullWidth
                    onClick={() => goto(Routes.LOGIN)}
                  >
                    <Typography variant="overline">
                      Already Have An Account
                    </Typography>
                  </Button>
                }
              />
            </div>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default Regsiter;
