import { isBigInt } from './is-big-int';
import { isBoolean } from './is-boolean';
import { isDate } from './is-date';
import { isError } from './is-error';
import { isFunction, UnknownFunction } from './is-function';
import { isNumber } from './is-number';
import { isRegExp } from './is-reg-exp';
import { isString } from './is-string';
import { isUndefined } from './is-undefined';
import { isNull } from './is-null';
import { isSymbol } from './is-symbol';

export const isTypesKeys = [
  'bigint',
  'boolean',
  'Date',
  'Error',
  'Function',
  'number',
  'RegExp',
  'string',
  'undefined',
  'null',
  'symbol'
] as const;
export type IsTypeKey = typeof isTypesKeys[number];

export type IsTypeKeyType<TKey extends IsTypeKey> = TKey extends 'bigint'
  ? bigint
  : TKey extends 'boolean'
  ? boolean
  : TKey extends 'Date'
  ? Date
  : TKey extends 'Error'
  ? Error
  : TKey extends 'Function'
  ? UnknownFunction
  : TKey extends 'number'
  ? number
  : TKey extends 'RegExp'
  ? RegExp
  : TKey extends 'string'
  ? string
  : TKey extends 'undefined'
  ? undefined
  : TKey extends 'null'
  ? null
  : TKey extends 'symbol'
  ? symbol
  : never;

/**
 * TypeScript aware type checking
 *
 * The type evaluating nature of this function also doesn't allow
 * subject to be typed `unknown` or similar.
 * For this special case there is no other way but `any`,
 * because it would otherwise mess with the called functions input type.
 */
export const isType = <TKey extends IsTypeKey>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subject: any,
  checkType: TKey
): subject is IsTypeKeyType<TKey> => {
  switch (checkType) {
    case 'bigint':
      return isBigInt(subject);
    case 'boolean':
      return isBoolean(subject);
    case 'Date':
      return isDate(subject);
    case 'Error':
      return isError(subject);
    case 'Function':
      return isFunction(subject);
    case 'number':
      return isNumber(subject);
    case 'RegExp':
      return isRegExp(subject);
    case 'string':
      return isString(subject);
    case 'undefined':
      return isUndefined(subject);
    case 'null':
      return isNull(subject);
    case 'symbol':
      return isSymbol(subject);
    default:
      return false;
  }
};
