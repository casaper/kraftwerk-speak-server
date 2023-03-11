/* eslint-disable @typescript-eslint/no-unused-vars */
import { isFunction } from './is-function';
import { IsTypes } from './is-types';

type SubjectType = (a: string) => boolean;

describe('isFunction()', () => {
  it('isFunction infers TypeScript type', () => {
    let subject: SubjectType | IsTypes;
    let itIsSubjectFn: SubjectType;
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
    if (isFunction(subject)) {
      // @ts-expect-no-error
      itIsBoolean = subject('x');
      // @ts-expect-error: Type 'boolean' is not assignable to type 'string'.
      itIsString = subject('ab');
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'undefined'.
      itIsUndefined = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'null'.
      itIsNull = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'string'.
      itIsString = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'number'.
      itIsNumber = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'boolean'.
      itIsBoolean = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'Date'.
      itIsDate = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'RegExp'.
      itIsRegExp = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'Error'.
      itIsError = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'symbol'.
      itIsSymbol = subject;
      // @ts-expect-error: Type 'SubjectType' is not assignable to type 'bigint'.
      itIsBigInt = subject;
    } else {
      // @ts-expect-error: Type 'IsTypes' is not assignable to type 'SubjectType'.
      itIsSubjectFn = subject;
    }
    expect(isFunction(subject)).toBe(false);
  });

  it('is true on passed function', () => {
    expect(isFunction(() => null)).toBe(true);
  });
});
