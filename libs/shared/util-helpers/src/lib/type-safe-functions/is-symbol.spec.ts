/* eslint-disable @typescript-eslint/no-unused-vars */
import { isSymbol } from './is-symbol';
import { IsTypes } from './is-types';

describe('isSymbol()', () => {
  it('isSymbol infers for unknown', () => {
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
    if (isSymbol(subject)) {
      // @ts-expect-error: Type 'symbol' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'symbol' is not assignable to type 'null'.
      itIsNull = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | boolean | RegExp | Date | Error | null | undefined' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    }
    expect(isSymbol(subject)).toBe(false);
  });

  it('is true when undefined passed', () => {
    expect(isSymbol(Symbol('test'))).toBe(true);
  });
});
