import { Divider, Paper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import classes from "./groupListItem.module.css";

const GroupListItem: React.FC<{
  groupDetails: Group;
  onClickAction: (id: number) => void;
}> = ({ groupDetails, onClickAction }) => {
  return (
    <Fragment>
      <Paper
        onClick={() => {
          onClickAction(groupDetails.id);
        }}
        className={classes.root}
        square
      >
        <Typography>{groupDetails.name}</Typography>
      </Paper>
      <Divider />
    </Fragment>
  );
};

export default GroupListItem;
