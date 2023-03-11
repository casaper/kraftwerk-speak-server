/* eslint-disable @typescript-eslint/no-unused-vars */
import { isBigInt } from './is-big-int';
import { IsTypes } from './is-types';

describe('isBigInt()', () => {
  it('isBigInt infers TypeScript type', () => {
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
    if (isBigInt(subject)) {
      // @ts-expect-error: Type 'bigint' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'bigint' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | boolean | symbol | RegExp | Date | Error | null | undefined' is not assignable to type 'bigint'.
      itIsBigInt = subject;
    }
    expect(isBigInt(subject)).toBe(false);
  });

  it('is true when bigint passed', () => {
    expect(isBigInt(BigInt(10))).toBe(true);
  });
});
