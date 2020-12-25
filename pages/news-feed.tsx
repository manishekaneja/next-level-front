import { Button, Divider, Paper, Toolbar, Typography } from "@material-ui/core";
import _ from "lodash";
import { withUrqlClient } from "next-urql";
import React, { Fragment } from "react";
import Layout from "../components/common/Layout";
import GroupListItem from "../components/GroupListItem/GroupListItem";
import { useCreateGroupStateSetter } from "../redux/ModalState/actions";
import { createUrqlClient } from "../utils/createUrqlClient";
import useCommonApplicationHooks from "../utils/customHook/useCommonApplicationHooks";

const NewsFeed: React.FC<{}> = () => {
  const {
    rootUser: { groupList },
  } = useCommonApplicationHooks();
  const setCreateGroupState = useCreateGroupStateSetter();

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
          {_.map(
            _.concat(groupList, [
              { name: "ABC" } as Group,
              { name: "ABC" } as Group,
              { name: "ABC" } as Group,
              { name: "ABC" } as Group,
              { name: "ABC" } as Group,
              { name: "ABC" } as Group,
              { name: "ABC" } as Group,
              { name: "FRE" } as Group,
            ]),
            (value: Group, idx) => (
              <GroupListItem key={idx} groupDetails={value} />
            )
          )}
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
          <Toolbar
            style={{
              position: "sticky",
              top: 0,
            }}
            component={Paper}
            elevation={3}
            square
          >
            <Typography align="center" variant="h5">
              Group Title - Untitled
            </Typography>
          </Toolbar>
          <Divider />
          {_.map(
            _.concat([] as Array<Split>, [
              ({ onwer: "ASD", splitAmount: 100 } as unknown) as Split,
            ]),
            (value: Split, idx) => (
              <Fragment key={idx}>
                <Paper style={{ padding: 7 }} square elevation={0}>
                  <Typography>
                    {value.onwer} : {value.splitAmount}
                  </Typography>
                </Paper>
                <Divider />
              </Fragment>
            )
          )}
        </div>
      </Paper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(NewsFeed);
