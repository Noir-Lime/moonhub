import React from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { trpc_root_client } from "../../lib/trpc/client/root.client.trpc";
import { NftCard } from "./NftCard";
import Button from "@mui/material/Button";
import styles from "./root.module.scss";
import { Grid } from "@mui/material";

const Page: React.FC = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["hello_world"],
    queryFn: async () => {
      return await trpc_root_client.get_assets.query();
    },
  });

  const image_components = React.useMemo(() => {
    return data?.nfts.map((nft) => {
      return (
        <Grid item xs={3} key={nft.identifier}>
          <NftCard nft={nft} />
        </Grid>
      );
    });
  }, [data?.nfts]);

  const query_client = useQueryClient();
  const onRefresh = React.useCallback(() => {
    query_client.resetQueries();
  }, [query_client]);

  return (
    <div>
      <h1>Root asdf bruh moment</h1>
      <Grid container spacing={2} className={styles.card_container}>
        {image_components}
      </Grid>
      <Button variant="contained" color="primary" onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
};

export default Page;
