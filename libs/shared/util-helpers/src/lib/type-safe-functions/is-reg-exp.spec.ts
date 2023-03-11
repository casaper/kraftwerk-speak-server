/* eslint-disable @typescript-eslint/no-unused-vars */
import { isRegExp } from './is-reg-exp';
import { IsTypes } from './is-types';

describe('isRegExp()', () => {
  it('isRegExp infers TypeScript type', () => {
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
    if (isRegExp(subject)) {
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'RegExp' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | Date | Error | null | undefined' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
    }
    expect(isRegExp(subject)).toBe(false);
  });

  it('is true when number passed', () => {
    expect(isRegExp(/abc/)).toBe(true);
  });
});
