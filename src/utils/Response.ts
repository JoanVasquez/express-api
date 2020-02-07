export const onSuccess = (result: any, token?: any): object => {
  if (token)
    return {
      success: true,
      result,
      token
    };
  return {
    success: true,
    result
  };
};
