/* eslint-disable @typescript-eslint/no-unused-vars */
import { isBoolean } from './is-boolean';
import { IsTypes } from './is-types';

describe('isBoolean()', () => {
  it('isBoolean infers TypeScript type', () => {
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
    if (isBoolean(subject)) {
      // @ts-expect-error: Type 'boolean' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'boolean' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | symbol | RegExp | Date | Error | null | undefined' is not assignable to type 'boolean'.
      itIsBoolean = subject;
    }
    expect(isBoolean(subject)).toBe(false);
  });

  it('is true when boolean passed', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });
});
