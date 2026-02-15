export const parseApiError = (error) => {
  return (
    error.response?.data?.originalMessage ||
    error.response?.data?.error?.message ||
    error.response?.data?.message ||
    "An unknown error has occured"
  );
};
