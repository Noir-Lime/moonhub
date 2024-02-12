import "./global.scss";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

const query_client = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={query_client}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Providers>
      <Suspense
        fallback={
          <Backdrop open={true}>
            <div>Loading...</div>
          </Backdrop>
        }
      >
        {children}
      </Suspense>
    </Providers>
  );
};

export default RootLayout;
