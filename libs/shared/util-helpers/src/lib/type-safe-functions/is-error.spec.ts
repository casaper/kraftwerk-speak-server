/* eslint-disable @typescript-eslint/no-unused-vars */
import { isError } from './is-error';
import { IsTypes } from './is-types';

describe('isError()', () => {
  it('isError infers TypeScript type', () => {
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
    if (isError(subject)) {
      // @ts-expect-error: Type 'Error' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'Error' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'Error' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'Error' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'Error' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'Error' is missing the following properties from type 'RegExp': exec, test, source, global, and 13 more.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'Error' is missing the following properties from type 'Date': toDateString, toTimeString, toLocaleDateString, toLocaleTimeString, and 37 more.
      itIsDate = subject;
      // @ts-expect-error: Type 'Error' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'Error' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | null | undefined' is not assignable to type 'Error'.
      itIsError = subject;
    }
    expect(isError(subject)).toBe(false);
  });

  it('is true when Error passed', () => {
    expect(isError(new Error('message'))).toBe(true);
  });
});
