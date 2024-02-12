import pino from "pino";

const root_logger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
  },
});

export const createFilenameLogger = (filename: string) => {
  return root_logger.child({ filename });
};
