import React, { useRef, useLayoutEffect } from "react";
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
import drawCanvas from "../utils/drawWave";

const Home: React.FC<{}> = ({}) => {
  const canvas = useRef(null);
  const canvas2 = useRef(null);

  useLayoutEffect(() => {
    drawCanvas(canvas.current);
    drawCanvas(canvas2.current);
  }, []);

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
            <div className={styles.background}>
              <img src="/assets/images/background.jpg" alt="." />
              <canvas ref={canvas} className={styles.canvas} />
              <canvas ref={canvas2} className={styles.canvas2} />
            </div>
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
              <Button variant="outlined">
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={`${styles["mw-75"]} ${styles.center}`}
                >
                  Login
                </Typography>
              </Button>
              <Button variant="outlined" href="/register">
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
