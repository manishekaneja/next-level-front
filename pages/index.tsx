import React, { useCallback } from "react";
import Link from "next/link";
import Layout from "../components/common/Layout";

import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

import styles from "../styles/Home.module.css";
import BackWallpaper from "../components/common/BackWallpaper/index";

import { useRouter } from "next/router";

const Home: React.FC<{}> = ({}) => {
  const router = useRouter();
  const goto = useCallback(
    (href: string) => {
      if (href && typeof href === "string" && href.length > 0) {
        router.push(href);
      }
    },
    [router]
  );
  return (
    <>
      <Layout title={"Lireddit | Home"}>
        <Container maxWidth="lg">
          <Box
            className={styles.container}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <BackWallpaper />
            <Paper
              className={`${styles["p-box"]} ${styles["mb-1_5"]}`}
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
              <Button variant="outlined" onClick={() => goto("/login")}>
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={`${styles["mw-75"]} ${styles.center}`}
                >
                  Login
                </Typography>
              </Button>
              <Button variant="outlined" onClick={() => goto("/register")}>
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
