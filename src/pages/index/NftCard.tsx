import React from "react";
import { Paper, Typography } from "@mui/material";
import type { NFT } from "opensea-js";
import styles from "./NftCard.module.scss";

interface I_NftCard_Props {
  nft: NFT;
}
export const NftCard: React.FC<I_NftCard_Props> = ({ nft }) => {
  return (
    <Paper className={styles.paper}>
      <Typography>{nft.identifier}</Typography>
      <img src={nft.image_url} alt={nft.identifier} />
    </Paper>
  );
};
