import { Paper, Typography } from "@material-ui/core";
import React from "react";
import classes from "./post.module.css";

const Post: React.FC<{}> = () => {
  return (
    <Paper className={classes.root}>
      <Typography>Hi, user how are You.</Typography>
    </Paper>
  );
};

export default Post;
