import pino from "pino";

const PUBLIC_ENV__LOG_LEVEL = import.meta.env.PUBLIC_ENV__LOG_LEVEL || "silent";

export const root_logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

export const createFilenameLogger = (filename: string) => {
  return root_logger.child(
    { filename },
    {
      level: PUBLIC_ENV__LOG_LEVEL,
    }
  );
};
