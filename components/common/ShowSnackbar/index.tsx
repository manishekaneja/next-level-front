import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { snackbarAtom } from "../../../recoil/atoms/snackbarAtom";

interface ShowSnackbar {}

const ShowSnackbar: React.FC<ShowSnackbar> = ({}) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const [snackbarObject, updateSnackbarObject] = useRecoilState(snackbarAtom);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    updateSnackbarObject({ open: false, message: "" });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbarObject.open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={snackbarObject.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              handleClose(null, null);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

ShowSnackbar.defaultProps = {
  title: "Untitled",
};

export default ShowSnackbar;
