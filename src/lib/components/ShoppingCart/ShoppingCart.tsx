import {
  Avatar,
  Badge,
  ClickAwayListener,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popper,
} from "@mui/material";
import React from "react";
import styles from "./ShoppingCart.module.scss";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ShoppingCartListItem } from "./ShoppingCartListItem/ShoppingCartListItem";
import type { T_Cart } from "../../trpc/router/cart/cart.interface";

interface I_ShoppingCart_Props {
  shopping_chart: Map<string, T_Cart>;
  onDelete?: (nft: T_Cart) => void;
}
export const ShoppingCart: React.FC<I_ShoppingCart_Props> = ({
  shopping_chart,
  onDelete,
}) => {
  const [anchor_el, setAnchorEl] = React.useState<
    HTMLButtonElement | undefined
  >(undefined);

  const onFabClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
    },
    []
  );

  const list_item_components = React.useMemo(() => {
    const components: JSX.Element[] = [];

    if (shopping_chart.size <= 0) {
      components.push(
        <ListItem key="empty_shopping_cart">
          <ListItemAvatar>
            <Avatar>
              <ShoppingBasketIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Your shopping cart is empty" />
        </ListItem>
      );
      return components;
    }

    for (const [identifier, cart_item] of shopping_chart.entries()) {
      components.push(
        <ShoppingCartListItem
          key={identifier}
          nft={cart_item}
          onRemove={onDelete}
        />
      );
    }

    return components;
  }, [onDelete, shopping_chart]);

  return (
    <div className={styles.root}>
      <Badge
        badgeContent={shopping_chart.size}
        color="primary"
        overlap="circular"
        classes={{
          standard: styles.badge,
        }}
      >
        <Fab onClick={onFabClick}>
          <ShoppingBasketIcon />
        </Fab>
      </Badge>

      <ClickAwayListener
        onClickAway={(e) => {
          if (anchor_el) setAnchorEl(undefined);
        }}
      >
        <Popper
          open={!!anchor_el}
          anchorEl={anchor_el}
          popperOptions={{
            placement: "bottom-end",
          }}
        >
          <Paper elevation={1} className={styles.popper_root}>
            <List className={styles.popper_list}>{list_item_components}</List>
          </Paper>
        </Popper>
      </ClickAwayListener>
    </div>
  );
};
