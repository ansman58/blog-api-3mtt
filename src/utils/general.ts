

export const getEnv = (value: string): string => {
  return process.env[value] || "";
};
