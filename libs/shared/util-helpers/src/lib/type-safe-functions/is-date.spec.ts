/* eslint-disable @typescript-eslint/no-unused-vars */
import { isDate } from './is-date';
import { IsTypes } from './is-types';

describe('isDate()', () => {
  it('isDate infers TypeScript type', () => {
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
    if (isDate(subject)) {
      // @ts-expect-error: Type 'Date' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'Date' is missing the following properties from type 'RegExp': exec, test, source, global, and 13 more.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'Date' is missing the following properties from type 'Error': name, message
      itIsError = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'Date' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Error | null | undefined' is not assignable to type 'Date'.
      itIsDate = subject;
    }
    expect(isDate(subject)).toBe(false);
  });

  it('is true when Date passed', () => {
    expect(isDate(new Date())).toBe(true);
  });
});
