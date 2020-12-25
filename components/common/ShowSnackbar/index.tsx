import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { useSnackbarResetter } from "../../../redux/BasicInfo/actions";
import useCommonApplicationHooks from "../../../utils/customHook/useCommonApplicationHooks";

interface ShowSnackbar {}

const ShowSnackbar: React.FC<ShowSnackbar> = ({}) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const { snackbar } = useCommonApplicationHooks();
  const resetSnackbar = useSnackbarResetter();
  const handleClose = (_: any, reason: string | null | undefined) => {
    if (reason === "clickaway") {
      return;
    }
    resetSnackbar(undefined);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={snackbar.message}
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
