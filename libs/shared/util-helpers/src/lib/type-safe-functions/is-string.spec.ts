/* eslint-disable @typescript-eslint/no-unused-vars */
import { isString } from './is-string';
import { IsTypes } from './is-types';

describe('isString()', () => {
  it('isString infers TypeScript type', () => {
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
    if (isString(subject)) {
      // @ts-expect-error: Type 'string' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'string' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'number | bigint | boolean | symbol | RegExp | Date | Error | null | undefined' is not assignable to type 'string'.
      itIsString = subject;
    }
    expect(isString(subject)).toBe(false);
  });

  it('is true when string passed', () => {
    expect(isString('a string')).toBe(true);
  });
});
