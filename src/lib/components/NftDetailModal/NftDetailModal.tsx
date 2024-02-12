import type React from "react";
import { NftDetailPage, type I_NftDetailPage_Props } from "./NftDetailPage";
import { Modal, Paper } from "@mui/material";
import styles from "./NftDetailModal.module.scss";

export const NftDetailModal: React.FC<I_NftDetailPage_Props> = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose} className={styles.modal}>
      <Paper className={styles.paper}>
        <NftDetailPage {...props} />
      </Paper>
    </Modal>
  );
};
