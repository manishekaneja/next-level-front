import { Paper, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import classes from "./post.module.css";

const Post: React.FC<{}> = () => {
  const loading = parseInt((Math.random() * 2).toFixed(0)) % 2;
  if (loading) {
    return (
      <Paper component={"div"} className={classes.root}>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.root}>
      <Typography variant="body1">Hi, user how are You.</Typography>
    </Paper>
  );
};

export default Post;
