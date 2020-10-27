import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import validator from "validator";
import BackWallpaper from "../components/common/BackWallpaper";
import CustomForm from "../components/common/CustomForm";
import Layout from "../components/common/Layout";
import { useLoginMutation } from "../graphql-tsx-gen/graphql";
import { loaderAtom } from "../recoil/atoms/loadingAtom";
import { snackbarAtom } from "../recoil/atoms/snackbarAtom";
import styles from "../styles/account.module.css";
import RoutesEndpoints from "../utils/constants/routes";
import { createUrqlClient } from "../utils/createUrqlClient";
import useGoto from "../utils/customHook/useGoto";

function useLoginActionHook() {
  const [{ fetching }, loginAction] = useLoginMutation();
  const setSnackbarObject = useSetRecoilState(snackbarAtom);
  const router = useRouter();
  const setLoader = useSetRecoilState(loaderAtom);
  useEffect(() => {
    setLoader(fetching);
  }, [fetching]);

  const onSubmit = useCallback((value: any) => {
    loginAction({
      username: value.find((input: any) => input.name === "username").value,
      password: value.find((input: any) => input.name === "password").value,
    })
      .then(
        ({
          data: {
            login: { errors, user },
          },
          error,
        }) => {
          if (error) {
            console.log(error)
            setSnackbarObject({
              open: true,
              message: error.message,
            });
            return;
          }
          if (errors && errors.length > 0) {
            console.log(errors)

            setSnackbarObject({
              open: true,
              message: errors[0].message,
            });
            return;
          }
          router.push(RoutesEndpoints.NEWS_FEED);
        }
      )
      .catch((error) => {
        console.log(error)

        setSnackbarObject({
          open: true,
          message: error.message,
        });
      });
  }, []);

  return { onSubmit };
}

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const goto = useGoto();
  const { onSubmit } = useLoginActionHook();

  return (
    <Layout title="Lireddit | Login" screenType="for_unverified_user">
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
                    validator: (value: string) =>
                      !!value && validator.isEmail(value)
                        ? ""
                        : "Please enter a Valid Email Id",
                    type: "text",
                  },
                  {
                    label: "PASSWORD",
                    name: "password",
                    placeholder: "your_private_key",
                    validator: (value: string) =>
                      !!value && value.length > 8
                        ? ""
                        : "A Valid Password should have minimum 8 characters.",
                    type: "password",
                  },
                ]}
                disableIfInvalid={false}
                submit={<Typography variant="overline">Login</Typography>}
                onSubmit={onSubmit}
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
                      <Typography
                        color="primary"
                        style={{ cursor: "pointer" }}
                        variant="overline"
                      >
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
