import { usePageContext } from "vike-react/usePageContext";
import { createFilenameLogger } from "../logger";

const logger = createFilenameLogger(import.meta.url);

export const useUserId = (): string => {
  const user_id = usePageContext().routeParams?.user_id;

  if (!user_id) {
    logger.error("No User ID in route params");
    throw new Error("No User ID in route params");
  }
  logger.trace({ user_id }, "useUserId");
  return user_id;
};
