/* eslint-disable @typescript-eslint/no-unused-vars */
import { isNull } from './is-null';
import { IsTypes } from './is-types';

describe('isNull()', () => {
  it('isNull infers for unknown', () => {
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
    if (isNull(subject)) {
      // @ts-expect-error: Type 'null' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'null' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    } else {
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error | undefined' is not assignable to type 'null'.
      itIsNull = subject;
    }
    expect(isNull(subject)).toBe(false);
  });

  it('is true when undefined passed', () => {
    expect(isNull(null)).toBe(true);
  });
});
