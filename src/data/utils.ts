import { SimpleMap } from "./types";

export const listToMap = <T>(list: T[], keyProp: string): SimpleMap<T> => {
  return list.reduce((result: SimpleMap<T>, current: any) => {
    result[current[keyProp]] = current;
    return result;
  }, {});
};
