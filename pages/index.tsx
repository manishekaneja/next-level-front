import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Typography
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import React from "react";
import Layout from "../components/common/Layout";
import styles from "../styles/Base.module.css";
import RoutesEndpoints from "../utils/constants/routes";
import { createUrqlClient } from "../utils/createUrqlClient";
import useGoto from "../utils/customHook/useGoto";

const Home: React.FC<{}> = ({}) => {
  const goto = useGoto();
  return (
    <>
      <Layout
        title={"Lireddit | Home"}
        screenType="for_unverified_user"
        showHeader={false}
        backgroundOpacity={1}
      >
        <Container maxWidth="lg">
          <Box
            className={styles.container}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Paper
              className={`p-box mb_22`}
              elevation={2}
              variant="elevation"
              component={(props) => <Link {...props} href="/news-feed" />}
            >
              <Typography variant="h2" className={styles.shadow}>
                Lireddit
              </Typography>
            </Paper>

            <ButtonGroup
              component={Paper}
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                variant="outlined"
                onClick={() => goto(RoutesEndpoints.LOGIN)}
              >
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={`${styles["mw-75"]} ${styles.center}`}
                >
                  Login
                </Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={() => goto(RoutesEndpoints.REGISTER)}
              >
                <Typography
                  variant="subtitle1"
                  className={`${styles["mw-75"]} ${styles.center}`}
                >
                  Register
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
