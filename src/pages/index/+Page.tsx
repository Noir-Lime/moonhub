import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./root.module.scss";
import { navigate } from "vike/client/router";

const RootPage: React.FC = () => {
  const [user_id, setUserId] = React.useState<string>("");

  const onLogin = React.useCallback(() => {
    navigate(`/${user_id}`);
  }, [user_id]);

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Typography variant="h5">Log In</Typography>
        <TextField
          size="small"
          value={user_id}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <Button variant="contained" disabled={!user_id} onClick={onLogin}>
          Continue
        </Button>
      </Paper>
    </div>
  );
};

export default RootPage;
