import React from "react";
import type { NFT } from "opensea-js";
import styles from "./NftCard.module.scss";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { IconButton } from "@mui/material";

interface I_CardIconButton_Props {
  onClick?: () => void;
}
const CardIconButton: React.FC<I_CardIconButton_Props> = ({ onClick }) => {
  const [is_mouse_over, setIsMouseOver] = React.useState(false);

  const onIconButtonClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick]
  );
  const onIconButtonMouseover = React.useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onIconButtonMouseout = React.useCallback(() => {
    setIsMouseOver(false);
  }, []);

  return (
    <IconButton
      onMouseOver={onIconButtonMouseover}
      onMouseOut={onIconButtonMouseout}
      onClick={onIconButtonClick}
    >
      {is_mouse_over ? (
        <RemoveShoppingCartIcon
          color="error"
          sx={{
            fontSize: "3rem",
          }}
        />
      ) : (
        <ShoppingBasketIcon sx={{ fontSize: "3rem" }} />
      )}
    </IconButton>
  );
};

interface I_NftCard_Props {
  nft: NFT;
  in_cart?: boolean;
  onClick?: (nft: NFT) => void;
  onRemove?: (nft: NFT) => void;
}
export const NftCard: React.FC<I_NftCard_Props> = React.memo(function NftCard({
  nft,
  onClick,
  in_cart,
  onRemove,
}): JSX.Element {
  const [is_mouse_over, setIsMouseOver] = React.useState(false);

  const onPaperClick = React.useCallback(() => {
    onClick?.(nft);
  }, [nft, onClick]);
  const onRemoveClick = React.useCallback(() => {
    onRemove?.(nft);
  }, [nft, onRemove]);
  const onPaperMouseover = React.useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onPaperMouseout = React.useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const is_backdrop_open = React.useMemo(() => {
    return is_mouse_over || in_cart || false;
  }, [is_mouse_over, in_cart]);

  return (
    <Paper
      className={styles.paper}
      onClick={onPaperClick}
      onMouseOver={onPaperMouseover}
      onMouseOut={onPaperMouseout}
      elevation={0}
    >
      <img className={styles.img} src={nft.image_url} alt={nft.identifier} />
      <Backdrop
        sx={{
          position: "absolute",
        }}
        open={is_backdrop_open}
      >
        {in_cart && <CardIconButton onClick={onRemoveClick} />}
      </Backdrop>
    </Paper>
  );
});
