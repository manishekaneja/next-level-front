import {
  Button,
  Container,
  Divider,
  Modal,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewTransactionMutation } from "../../graphql-tsx-gen/graphql";
import { useCreateTransactionStateSetter } from "../../redux/ModalState/actions";
import { useSelectedGroupSetter } from "../../redux/SelectedGroup/actions";
import useCommonApplicationHooks from "../../utils/customHook/useCommonApplicationHooks";

const CreateTransaction: React.FC<{}> = () => {
  const modalFlag = useSelector(
    (state: RootState) => state.modalState.createTransactionState
  );
  const selectedGroup = useSelector((state: RootState) => state.selectedGroup);

  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const setAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value.match(/^[0-9]*$/)) {
        setTransactionAmount(event.target.value);
        if (!value) {
          setAmountError("Please enter a valid Amount");
        } else {
          setAmountError("");
        }
      }
    },
    [setTransactionAmount, setAmountError]
  );
  const setCreateTransactionState = useCreateTransactionStateSetter();
  const setGroupDetails = useSelectedGroupSetter();

  const [
    { fetching: requestOnProgress, data: updatedGroupData },
    createNewTransaction,
  ] = useAddNewTransactionMutation();

  const { setLoaderState } = useCommonApplicationHooks();
  useEffect(() => {
    setLoaderState(requestOnProgress);
  }, [requestOnProgress, setLoaderState]);

  const onClose = useCallback(() => {
    setCreateTransactionState(false);
    setTransactionAmount("");
    setAmountError("");
    setTransactionMessage("");
  }, [setCreateTransactionState]);

  return (
    <Modal open={modalFlag} onClose={onClose}>
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
              Add New Transaction
            </Typography>
          </Toolbar>
          <Divider />
          <Container maxWidth="sm" style={{ padding: 10 }}>
            <TextField
              label="Transcation Message"
              placeholder="what_you_like_to_add_a_message"
              fullWidth
              value={transactionMessage}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTransactionMessage(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Transcation Amount"
              placeholder="how_much_you_in_total_paid??"
              fullWidth
              value={transactionAmount}
              onChange={setAmount}
              helperText={amountError}
              error={amountError.length > 0}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{ marginBottom: 10 }}
            />{" "}
          </Container>
          <Divider />
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <div style={{ padding: 4 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.table(selectedGroup);
                if (selectedGroup) {
                  createNewTransaction({
                    message:
                      transactionMessage ||
                      `Transaction made @${new Date().toDateString()}`,
                    amount: parseInt(transactionAmount || "0"),
                    groupId: selectedGroup.id,
                  }).then(({ data: { addNewTransaction: updatedGrpInfo } }) => {
                    setGroupDetails(updatedGrpInfo as Group);
                    onClose();
                  });
                }
              }}
            >
              Create
            </Button>
          </Toolbar>
        </Paper>
      </Container>
    </Modal>
  );
};

export default CreateTransaction;
