import type { NFT } from "opensea-js";
import React from "react";
import styles from "./NftDetailPage.module.scss";
import { Button, Typography, Unstable_Grid2 } from "@mui/material";

export interface I_NftDetailPage_Props {
  selected_nft: NFT;
  open: boolean;
  onClose?: () => void;
  onNftSave?: (nft: NFT) => void;
}
export const NftDetailPage: React.FC<I_NftDetailPage_Props> = ({
  onClose,
  selected_nft,
  onNftSave,
}) => {
  const onAddToCart = React.useCallback(() => {
    onNftSave?.(selected_nft);
  }, [onNftSave, selected_nft]);

  return (
    <div className={styles.root}>
      <Unstable_Grid2 container spacing={2}>
        <Unstable_Grid2
          className={styles.image_container}
          xs="auto"
          maxWidth="24rem"
        >
          <img
            src={selected_nft.image_url}
            alt={selected_nft.identifier}
            className={styles.image}
          />
        </Unstable_Grid2>
        <Unstable_Grid2 container xs>
          <div>
            <Unstable_Grid2 container>
              <Unstable_Grid2 xs={12}>
                <Typography variant="h4">Collection</Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <Typography variant="h6">{selected_nft.collection}</Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <Typography>{selected_nft.identifier}</Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onAddToCart}
                >
                  Add to cart
                </Button>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </div>
        </Unstable_Grid2>
      </Unstable_Grid2>
    </div>
  );
};
