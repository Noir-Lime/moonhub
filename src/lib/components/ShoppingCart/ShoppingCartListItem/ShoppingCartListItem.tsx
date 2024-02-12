import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./ShoppingCartListItem.module.scss";
import type { T_Cart } from "../../../trpc/router/cart/cart.interface";

interface I_ShoppingCartListItem_Props {
  nft: T_Cart;
  onClick?: (nft: T_Cart) => void;
  onRemove?: (nft: T_Cart) => void;
}
export const ShoppingCartListItem = React.memo<I_ShoppingCartListItem_Props>(
  function ShoppingCartListItem({ nft, onClick, onRemove }): JSX.Element {
    const onDeleteClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove?.(nft);
      },
      [onRemove, nft]
    );

    const onAvatarClick = React.useCallback(() => {
      onClick?.(nft);
    }, [nft, onClick]);

    return (
      <ListItem>
        <ListItemAvatar onClick={onAvatarClick} className={styles.avatar}>
          <Avatar src={nft.image_url} />
        </ListItemAvatar>
        <ListItemText primary={nft.nft_id} secondary={nft.collection} />
        <ListItemSecondaryAction>
          <IconButton onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);
