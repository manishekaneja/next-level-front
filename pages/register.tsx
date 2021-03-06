import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useCallback, useEffect } from "react";
import validator from "validator";
import CustomForm from "../components/common/CustomForm";
import Layout from "../components/common/Layout";
import { useRegisterMutation } from "../graphql-tsx-gen/graphql";
import styles from "../styles/account.module.css";
import RoutesEndpoints from "../utils/constants/routes";
import { createUrqlClient } from "../utils/createUrqlClient";
import useCommonApplicationHooks from "../utils/customHook/useCommonApplicationHooks";
import useGoto from "../utils/customHook/useGoto";

function useRegisterActionHook() {
  const [{ fetching }, registerAction] = useRegisterMutation();
  const { setLoaderState, setSnackbar, router } = useCommonApplicationHooks();
  useEffect(() => {
    setLoaderState(fetching);
  }, [fetching]);
  const onSubmit = useCallback((value: any) => {
    registerAction({
      username: value.find((input: any) => input.name === "username")
        .value as string,
      password: value.find((input: any) => input.name === "password")
        .value as string,
      first_name: value.find((input: any) => input.name === "first_name")
        .value as string,
      last_name: value.find((input: any) => input.name === "last_name")
        .value as string,
      email: value.find((input: any) => input.name === "email").value as string,
    })
      .then(
        ({
          data: {
            register: { errors, user },
          },
          error,
        }) => {
          if (error) {
            setSnackbar({
              open: true,
              message: error.message,
            });
            return;
          }
          if (errors && errors.length > 0) {
            setSnackbar({
              open: true,
              message: errors[0].message,
            });
            return;
          }
          router.push(RoutesEndpoints.NEWS_FEED);
        }
      )
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.message,
        });
      });
  }, []);

  return { onSubmit };
}

interface RegisterProps {}
const Regsiter: React.FC<RegisterProps> = () => {
  const goto = useGoto();
  const { onSubmit } = useRegisterActionHook();
  return (
    <Layout
      title="Lireddit | Register"
      screenType="for_unverified_user"
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
                Create an Account
              </Typography>
            </div>
            <Divider />
            <div className={`p_20`}>
              <CustomForm
                formIdentifier="login_form"
                fields={[
                  {
                    label: "FIRST NAME",
                    name: "first_name",
                    placeholder: "first_name_here",
                    type: "text",
                    validator: (value: string) => {
                      return !!value && validator.isAlpha(value)
                        ? ""
                        : "Sharing your name is a mandatory section (Spaces not allowed)";
                    },
                  },
                  {
                    label: "LAST NAME",
                    name: "last_name",
                    placeholder: "last_name_here",
                    type: "text",
                    validator: (value: string) => {
                      return !!value && validator.isAlpha(value)
                        ? ""
                        : "Would like to know your last name also (Spaces not allowed)";
                    },
                  },
                  {
                    label: "USERNAME",
                    name: "username",
                    placeholder: "your_unique_username",
                    type: "text",
                    validator: (value: string) => {
                      return !!value && value.length > 6
                        ? ""
                        : "Please enter atleast 6 characters for your username";
                    },
                  },
                  {
                    label: "E-MAIL",
                    name: "email",
                    placeholder: "email_to_contact_you",
                    type: "email",
                    validator: (value: string) => {
                      return !!value && validator.isEmail(value)
                        ? ""
                        : "Please enter a Valid Email Id";
                    },
                  },

                  {
                    label: "PASSWORD",
                    name: "password",
                    placeholder: "your_private_key",
                    type: "password",
                    validator: (value: string) =>
                      !!value && value.length > 8
                        ? ""
                        : "A Valid Password should have minimum 8 characters.",
                  },
                  {
                    label: "CONFIRM PASSWORD",
                    name: "confirm-password",
                    placeholder: "confirm_your_private_key",
                    type: "password",
                    validator: (
                      value: string,
                      otherValues: Array<{ name: string; value: string }>
                    ) => {
                      return value ===
                        otherValues.find((e) => e.name === "password").value
                        ? ""
                        : "Enter chracter doesn't match with your password.";
                    },
                  },
                ]}
                submit={<Typography variant="overline">Register</Typography>}
                onSubmit={onSubmit}
                footer={
                  <Button
                    style={{ marginTop: 10 }}
                    variant="outlined"
                    fullWidth
                    onClick={() => goto(RoutesEndpoints.LOGIN)}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Regsiter);
