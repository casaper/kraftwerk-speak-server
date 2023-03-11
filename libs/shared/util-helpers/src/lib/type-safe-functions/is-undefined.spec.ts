/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsTypes } from './is-types';
import { isUndefined } from './is-undefined';

describe('isUndefined()', () => {
  it('isUndefined infers for unknown', () => {
    let subject: IsTypes;
    let itIsUndefined: undefined;
    let itIsNull: null;
    let itIsString: string;
    let itIsNumber: number;
    let itIsBoolean: boolean;
    let itIsDate: Date;
    let itIsRegExp: RegExp;
    let itIsError: Error;
    let itIsBigInt: bigint;
    let itIsSymbol: symbol;
    if (isUndefined(subject)) {
      // @ts-expect-error: Type 'undefined' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'undefined' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error | null' is not assignable to type 'undefined'.
      itIsUndefined = subject;
    }
    expect(isUndefined(subject)).toBe(true);
  });

  it('is true when undefined passed', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
});
