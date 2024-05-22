export const debounce = (cb: unknown, t: number) => {
  let timeout: NodeJS.Timeout | undefined;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), t);
    console.log(timeout);
  };
};
