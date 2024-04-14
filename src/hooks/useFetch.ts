export const useFetch = () => {
  let isFetching: boolean = false;

  type CallbackType = (args: any) => Promise<any>

  const executeFetch = async <T>(callback: CallbackType, args: any): Promise<T> => {
    try {
      isFetching = true;
      const res = await callback(args);
      return res;
    } catch(e) {
      console.log(e);
    } finally {
      isFetching = false;
    }
  }

  return {executeFetch, isFetching}
}
