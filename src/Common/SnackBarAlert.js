import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarAlert = ({ success, setSuccess }) => {
  return (
    <Snackbar
      open={success[0]}
      autoHideDuration={2000}
      onClose={() => setSuccess([false,success[1],success[2]])}
    >
      <Alert severity={success[2]} sx={{ width: "100%" }}>
        {success[1]}
      </Alert>
    </Snackbar>
  );
};
export default SnackBarAlert;
