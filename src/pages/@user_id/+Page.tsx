import { Backdrop, CircularProgress } from "@mui/material";
import type React from "react";
import { ClientOnly } from "vike-react/ClientOnly";

const RootPage: React.FC = () => {
  return (
    <ClientOnly
      load={async () => (await import("./ShoppingPage")).ShoppingPage}
      fallback={
        <Backdrop open>
          <CircularProgress />
        </Backdrop>
      }
    >
      {(ShoppingPage) => <ShoppingPage />}
    </ClientOnly>
  );
};

export default RootPage;
