import { dirname } from "path";
import { fileURLToPath } from "url";
const root_dirname = dirname(fileURLToPath(import.meta.url));
export { root_dirname };
