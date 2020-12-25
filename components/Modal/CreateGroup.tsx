import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Modal,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Autocomplete, FilterOptionsState } from "@material-ui/lab";
import _ from "lodash";
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useState
} from "react";
import { useSelector } from "react-redux";
import { useGetUserListQuery } from "../../graphql-tsx-gen/graphql";
import { useCreateGroupStateSetter } from "../../redux/ModalState/actions";
import { useUniqueNonNullDispatcher } from "../../utils/customHook/useUniqueNonNullDispatcher";
import useDebounce from "../../utils/debounce";

function useCreateGroupStatesWrapper() {
  const getUNNFilter = useUniqueNonNullDispatcher<ApplicationUser>();
  const [searchKey, setSearchKey] = useState("");
  const [{ fetching, data }] = useGetUserListQuery({
    variables: {
      searchKey: searchKey,
    },
  });
  const [grpName, setGrpName] = useState("");

  const { rootUser } = useSelector((state: RootState) => state);
  const [searchList, _setSearchList] = useState<Array<ApplicationUser>>([]);
  const [selectedValues, _setSelectedValues] = useState([]);
  const setSearchList = getUNNFilter(_setSearchList, "username");
  const setSelectedValues = getUNNFilter(_setSelectedValues, "username");
  useEffect(() => {
    if (rootUser) {
      setSelectedValues((pl) => _.concat(pl, [rootUser]));
      setSearchList((pl) => _.concat(pl, [rootUser]));
    }
  }, [rootUser, setSearchList]);
  useEffect(() => {
    if (data && data.getUserList) {
      setSearchList((pl) =>
        _.concat(pl, data.getUserList as Array<ApplicationUser>)
      );
    }
  }, [data]);
  const resetState = useCallback(() => {
    setGrpName("");
    setSearchKey("");
    if (rootUser) {
      setSelectedValues([rootUser]);
    }
  }, [setSearchKey, setSelectedValues, rootUser]);
  const debounce = useDebounce<string>(setSearchKey, 1000);
  return {
    fetching,
    grpName,
    setGrpName,
    selectedValues,
    setSelectedValues,
    searchList,
    resetState,
    debounce,
  };
}

const CreateGroup: React.FC<{}> = () => {
  const {
    fetching,
    grpName,
    setGrpName,
    selectedValues,
    setSelectedValues,
    searchList,
    debounce,
    resetState,
  } = useCreateGroupStatesWrapper();

  const modalFlag = useSelector(
    (state: RootState) => state.modalState.createGroupState
  );
  const setCreateGroupState = useCreateGroupStateSetter();

  return (
    <Modal open={modalFlag} onClose={() => {}}>
      <Container
        maxWidth="md"
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "column",
        }}
      >
        <Paper>
          <Toolbar>
            <Typography variant="h5" align="center" style={{ width: "100%" }}>
              Create New Group
            </Typography>
          </Toolbar>
          <Divider />
          <Container maxWidth="sm" style={{ padding: 10 }}>
            <TextField
              label="Group Name"
              placeholder="what_would_you_like_to_call_your_group"
              fullWidth
              value={grpName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setGrpName(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{ marginBottom: 10 }}
            />
            <Autocomplete
              multiple
              options={searchList}
              getOptionLabel={(option) => option.username}
              loading={fetching}
              loadingText={"Looking For Better Options...."}
              onChange={(
                __: ChangeEvent<{}>,
                value: Array<ApplicationUser>
              ) => {
                setSelectedValues(value);
              }}
              onInputChange={(__: React.ChangeEvent<{}>, value: string) => {
                debounce(value);
              }}
              filterSelectedOptions
              filterOptions={(
                options: ApplicationUser[],
                state: FilterOptionsState<ApplicationUser>
              ) => {
                const result = _.filter(
                  options,
                  (singleOption: ApplicationUser) => {
                    if (state) {
                      return state
                        .getOptionLabel(singleOption)
                        .includes(state.inputValue);
                    } else {
                      return false;
                    }
                  }
                );
                return result;
              }}
              includeInputInList
              value={selectedValues}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Just Select People Who Sholud be Part of the Group"
                  placeholder="Search Members"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {fetching ? (
                          <CircularProgress color="primary" size={24} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                />
              )}
            />
          </Container>
          <Divider />
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreateGroupState(false);
                resetState();
              }}
            >
              Cancel
            </Button>
            <div style={{ padding: 4 }} />
            <Button variant="contained" color="primary">
              Create
            </Button>
          </Toolbar>
        </Paper>
      </Container>
    </Modal>
  );
};

export default CreateGroup;
