import {
  Button,
  Divider,
  IconButton,
  Paper,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { AddCircle, People } from "@material-ui/icons";
import _ from "lodash";
import { withUrqlClient } from "next-urql";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/common/Layout";
import GroupListItem from "../components/GroupListItem/GroupListItem";
import { useGetGroupDetailsByIdQuery } from "../graphql-tsx-gen/graphql";
import {
  useCreateGroupStateSetter,
  useCreateTransactionStateSetter,
} from "../redux/ModalState/actions";
import { useSelectedGroupSetter } from "../redux/SelectedGroup/actions";
import { createUrqlClient } from "../utils/createUrqlClient";
import useCommonApplicationHooks from "../utils/customHook/useCommonApplicationHooks";

const NewsFeed: React.FC<{}> = () => {
  const {
    rootUser: { groupList },
    setLoaderState,
  } = useCommonApplicationHooks();
  const setCreateGroupState = useCreateGroupStateSetter();
  const setCreateTransactionState = useCreateTransactionStateSetter();
  const [id, setId] = useState<number>(-1);
  const [{ fetching, data }] = useGetGroupDetailsByIdQuery({
    pause: id < 0,
    variables: {
      grpId: id,
    },
  });
  const setGroupDetails = useSelectedGroupSetter();
  useEffect(() => {
    setLoaderState(fetching);
  }, [fetching]);
  useEffect(() => {
    if (data) {
      setGroupDetails(data.fetchGroupById as Group);
    }
  }, [data]);

  const selectedGroup = useSelector((state: RootState) => state.selectedGroup);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);
  const open = Boolean(anchorEl);

  return (
    <Layout
      title="Lireddit | Newsfeed"
      screenType="for_verified_user"
      backgroundOpacity={0.3}
      showHeader
    >
      <Paper
        elevation={4}
        square
        style={{
          backgroundColor: "#eeeeee99",
          overflow: "hidden",
          maxHeight: "calc( 100vh - 64px )",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <div style={{ overflow: "auto", height: "100%", width: 400 }}>
          {_.map(groupList, (value: Group) => (
            <GroupListItem
              key={value.id}
              groupDetails={value}
              onClickAction={(id: number) => {
                setId(id);
              }}
            />
          ))}
          <Toolbar>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => setCreateGroupState(true)}
            >
              Create New Group
            </Button>
          </Toolbar>
        </div>
        <Divider orientation="vertical" />
        <div
          style={{
            overflow: "auto",
            height: "100%",
            flex: 1,
            position: "relative",
          }}
        >
          {selectedGroup && (
            <Fragment>
              <Toolbar
                style={{
                  position: "sticky",
                  top: 0,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                component={Paper}
                elevation={3}
                square
              >
                <Typography align="center" variant="h5" style={{ flex: 1 }}>
                  Group Title - {selectedGroup.name}
                </Typography>
                <IconButton
                  onClick={() => {
                    setCreateTransactionState(true);
                  }}
                >
                  <AddCircle fontSize="default" />
                </IconButton>
                <IconButton
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <People fontSize="default" />
                </IconButton>
                <Popover
                  id="mouse-over-popover"
                  style={{
                    pointerEvents: "none",
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <div
                    style={{
                      padding: "8px 6px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    {_.map(
                      _.take(selectedGroup.memberList, 6),
                      (member: Pick<ApplicationUser, "username" | "id">) => (
                        <Typography key={member.id} variant="caption">
                          {member.username}
                        </Typography>
                      )
                    )}
                  </div>
                </Popover>
              </Toolbar>
              <Divider />
              {_.map(
                selectedGroup.transactionList,
                (transaction: Transaction, idx: number) => (
                  <TransactionListItem
                    key={transaction.id + ":" + idx}
                    transaction={transaction}
                  />
                )
              )}
            </Fragment>
          )}
        </div>
      </Paper>
    </Layout>
  );
};

const TransactionListItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => (
  <Fragment>
    <Paper
      style={{
        padding: 7,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      square
      elevation={0}
    >
      <Typography style={{ flex: 1 }}>{transaction.message}</Typography>
      <Divider orientation="vertical" />
      <Typography
        style={{
          flex: 1,
          minWidth: 100,
          maxWidth: 100,
          fontWeight: "bold",
          color: green[900],
        }}
        align="right"
      >
        {transaction.amount}
      </Typography>
    </Paper>
    <Divider />
  </Fragment>
);

export default withUrqlClient(createUrqlClient, { ssr: false })(NewsFeed);
