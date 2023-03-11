/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsTypes } from './is-types';
import { notNil } from './not-nil';

describe('notNil()', () => {
  it('is false with "null"', () => {
    expect(notNil(null)).toBe(false);
  });

  it('is false with "undefined"', () => {
    expect(notNil(undefined)).toBe(false);
  });

  it('is true with empty string', () => {
    expect(notNil('')).toBe(true);
  });

  it('is true with zero', () => {
    expect(notNil(0)).toBe(true);
  });

  it('is true with "NaN"', () => {
    expect(notNil(NaN)).toBe(true);
  });

  it('infers type', () => {
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
    if (notNil(subject)) {
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error' is not assignable to type 'null'.
      itIsNull = subject;
    } else {
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'bigint'.
      itIsBigInt = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'null | undefined' is not assignable to type 'symbol'.
      itIsSymbol = subject;
    }
    expect(notNil(subject)).toBe(false);
  });

  it('infers type when filtering array', () => {
    const subject = [null, undefined, 'string', null];
    const nativeBooleanFiltered = subject.filter(Boolean);
    // @ts-expect-error: Type 'string | null | undefined' is not assignable to type 'string'.
    let plainStrItem: string = nativeBooleanFiltered[0];
    expect(plainStrItem).toBe('string');
    expect(nativeBooleanFiltered).toHaveLength(1);
    const notNilFiltered = subject.filter(notNil);
    // @ts-expect-no-error
    plainStrItem = notNilFiltered[0];
    expect(plainStrItem).toBe('string');
    expect(notNilFiltered).toHaveLength(1);
  });
});
