import vikeReact from "vike-react/config";
import vikeReactQuery from "vike-react-query/config";
import type { Config } from "vike/types";

export default {
  title: "My App",
  extends: [vikeReact, vikeReactQuery],
  passToClient: ["routeParams"],
} satisfies Config;
