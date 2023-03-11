/* eslint-disable @typescript-eslint/no-explicit-any */
declare function janeDoeFunction(...args: any[]): any;
declare function janeDoeFunction(): any;
export type UnknownFunction = typeof janeDoeFunction;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * Checks if value is classified as a Function object.
 *
 * @param subject - the function or not
 */
export const isFunction = <
  TFunc extends AnyFunction,
  TParams extends Parameters<TFunc>,
  TReturnType extends ReturnType<TFunc>,
  TIsFn extends (...args: TParams) => TReturnType
>(
  subject: TFunc | unknown
): subject is TIsFn => typeof subject === 'function';
