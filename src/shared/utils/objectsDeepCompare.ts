/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as _ from 'lodash';

// @ts-ignore
export function deepCompare(origObj, newObj) {
  // @ts-ignore
  function changes(newObj, origObj) {
    let arrayIndexCounter = 0;
    // @ts-ignore
    return _.transform(newObj, (result, value, key) => {
      if (!_.isEqual(value, origObj[key])) {
        const resultKey = _.isArray(origObj) ? (arrayIndexCounter += 1) : key;
        // @ts-ignore
        result[resultKey] =
          _.isObject(value) && _.isObject(origObj[key]) ? changes(value, origObj[key]) : value;
      }
    });
  }
  return changes(newObj, origObj);
}
