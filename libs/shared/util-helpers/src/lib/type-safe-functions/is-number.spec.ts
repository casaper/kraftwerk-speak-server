/* eslint-disable @typescript-eslint/no-unused-vars */
import { isNumber } from './is-number';
import { IsTypes } from './is-types';

describe('isNumber()', () => {
  it('isNumber infers TypeScript type', () => {
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
    if (isNumber(subject)) {
      // @ts-expect-error: Type 'number' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'symbol'.
      itIsSymbol = subject;
      // @ts-expect-error: Type 'number' is not assignable to type 'bigint'.
      itIsBigInt = subject;
    } else {
      // @ts-expect-error: Type 'string | bigint | boolean | symbol | RegExp | Date | Error | null | undefined' is not assignable to type 'number'.
      itIsNumber = subject;
    }
    expect(isNumber(subject)).toBe(false);
  });

  it('is true when number passed', () => {
    expect(isNumber(8.5)).toBe(true);
  });
});
