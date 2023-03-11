/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnknownFunction } from './is-function';
import { isType, isTypesKeys } from './is-type';

const isTypeKeysValidSubjects = {
  bigint: BigInt(10),
  boolean: false,
  Date: new Date(),
  Error: new Error('testerror'),
  Function: (): undefined => undefined,
  number: 1.1,
  RegExp: /abc/,
  string: 'abc',
  undefined: undefined,
  null: null,
  symbol: Symbol('testsymbol')
} as const;

let subjectVar:
  | undefined
  | null
  | string
  | number
  | boolean
  | Date
  | RegExp
  | Error
  | bigint
  | symbol
  | UnknownFunction;
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
let itIsSubjectFn: UnknownFunction;

describe('isType()', () => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  describe('type inference', () => {
    it('should infer for boolean', () => {
      if (isType(subjectVar, 'boolean')) {
        // @ts-expect-error: Type 'boolean' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'boolean' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | symbol | RegExp | Date | Error | null | undefined' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
      }
      expect(isType(subjectVar, 'boolean')).toBe(false);
    });

    it('should infer for Date', () => {
      if (isType(subjectVar, 'Date')) {
        // @ts-expect-error: Type 'Date' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'Date' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Error | null | undefined' is not assignable to type 'Date'.
        itIsDate = subjectVar;
      }
      expect(isType(subjectVar, 'Date')).toBe(false);
    });

    it('should infer for Error', () => {
      if (isType(subjectVar, 'Error')) {
        // @ts-expect-error: Type 'Error' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'Error' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | null | undefined' is not assignable to type 'Error'.
        itIsError = subjectVar;
      }
      expect(isType(subjectVar, 'Error')).toBe(false);
    });

    it('should infer for Function', () => {
      if (isType(subjectVar, 'Function')) {
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type '{ (...args: any[]): any; (): any; }' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error | null | undefined' is not assignable to type '{ (...args: any[]): any; (): any; }'.
        itIsSubjectFn = subjectVar;
      }
      expect(isType(subjectVar, 'Function')).toBe(false);
    });

    it('should infer for number', () => {
      if (isType(subjectVar, 'number')) {
        // @ts-expect-error: Type 'number' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'number' is not assignable to type 'SubjectType'.
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | bigint | boolean | symbol | RegExp | Date | Error | { (...args: any[]): any; (): any; } | null | undefined' is not assignable to type 'number'.
        itIsNumber = subjectVar;
      }
      expect(isType(subjectVar, 'number')).toBe(false);
    });

    it('should infer for RegExp', () => {
      if (isType(subjectVar, 'RegExp')) {
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'RegExp' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | Date | Error | { (...args: any[]): any; (): any; } | null | undefined' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
      }
      expect(isType(subjectVar, 'RegExp')).toBe(false);
    });

    it('should infer for string', () => {
      if (isType(subjectVar, 'string')) {
        // @ts-expect-error: Type 'string' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'string' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'number | bigint | boolean | symbol | RegExp | Date | Error | { (...args: any[]): any; (): any; } | null | undefined' is not assignable to type 'string'.
        itIsString = subjectVar;
      }
      expect(isType(subjectVar, 'string')).toBe(false);
    });

    it('should infer for undefined', () => {
      if (isType(subjectVar, 'undefined')) {
        // @ts-expect-error: Type 'undefined' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
        // @ts-expect-error: Type 'undefined' is not assignable to type 'null'.
        itIsNull = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error | { (...args: any[]): any; (): any; } | null' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
      }
      expect(isType(subjectVar, 'undefined')).toBe(true);
      expect(isType('defined', 'undefined')).toBe(false);
    });

    it('should infer for null', () => {
      if (isType(subjectVar, 'null')) {
        // @ts-expect-error: Type 'null' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
        // @ts-expect-error: Type 'null' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | symbol | RegExp | Date | Error | { (...args: any[]): any; (): any; } | undefined' is not assignable to type 'null'.
        itIsNull = subjectVar;
      }
      expect(isType(subjectVar, 'null')).toBe(false);
    });

    it('should infer for symbol', () => {
      if (isType(subjectVar, 'symbol')) {
        // @ts-expect-error: Type 'symbol' is not assignable to type 'string'.
        itIsString = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'boolean'.
        itIsBoolean = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'number'.
        itIsNumber = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'Date'.
        itIsDate = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'RegExp'.
        itIsRegExp = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'Error'.
        itIsError = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'bigint'.
        itIsBigInt = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'undefined'.
        itIsUndefined = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type 'null'.
        itIsNull = subjectVar;
        // @ts-expect-error: Type 'symbol' is not assignable to type '{ (...args: any[]): any; (): any; }'
        itIsSubjectFn = subjectVar;
      } else {
        // @ts-expect-error: Type 'string | number | bigint | boolean | RegExp | Date | Error | { (...args: any[]): any; (): any; } | null | undefined' is not assignable to type 'symbol'.
        itIsSymbol = subjectVar;
      }
      expect(isType(subjectVar, 'symbol')).toBe(false);
    });
  });

  describe('true when passing valid value', () => {
    isTypesKeys.forEach(isTypeKey => {
      it(`should be true for valid ${isTypeKey}`, () => {
        expect(isType(isTypeKeysValidSubjects[isTypeKey], isTypeKey)).toBe(true);
      });
    });
  });
});
