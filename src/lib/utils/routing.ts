import { usePageContext } from "vike-react/usePageContext";

export const useUserId = (): string => {
  const user_id = usePageContext().routeParams?.user_id;

  if (!user_id) throw new Error("No User ID in route params");

  return user_id;
};
