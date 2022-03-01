import * as _ from 'lodash';

function isNumeric(str: unknown) {
  if (typeof str !== 'string') return false;
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
}

export const parseNumbers = (obj: unknown) => {
  const mappedObj: { [key: string]: unknown } = {};

  // @ts-ignore
  Object.entries(obj).forEach(([key, value]) => {
    if (isNumeric(value)) mappedObj[key] = Number(value);
    else mappedObj[key] = value;
  });

  return mappedObj;
};
