import { KeyOf } from './key-of';

/**
 * Extract literal type of keys in object that has nested objects and flat values
 * ```ts
 * const subject = {
 *   a: 'string value',
 *   b: {
 *     x: 'string value',
 *     y: 'string value'
 *   },
 *   c: 'str val',
 *   d: {
 *     z: 'str val'
 *   }
 * } as const;
 * // SubjectKeys = "a" | "c" | "b-x" | "b-y" | "d-z"
 * type SubjectKeys = NestedObjectKeys<typeof subject>;
 * ```
 * [Playground Link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAchDOwIBMDyAjAVhAxsA0hCPADwAqAIgJZ5QQAeSAdsvFAPZa7AB8UAvFADeAKChQA2oRBQqTKAGsi7AGZRKNYFABkUABSIATnIDmUAD5QmAVwC26CIYCUAXQBc66nilEXdRhAsbJzYeGLiUAD8UAAGACRC0gC+ALQJcIgoGKEERKQa3tIuPEkx4eIe8YlEpQDcIkkSSiCqnpo6+kamFlZ2Ds4u9SI47EyIUPDWXLSCouIAhh4A5F1MZgBu8wA21hBLADTh6B5zEfTLqxvbuwflUCAXwMZrUJs7e+FJh+I4j4av21u4mQJzuAC8-gCtktPg0oPM2CMxsB6gB6VFQADKUxy0jYggARPMCT0CTgSZYCegUvQKVAqSkQHSCcgUmCCSJQJAsTjuHiBLAEEg0NNcsQSFyIK1JqKePUgA)
 */
export type NestedObjectKeys<TDict extends object> = {
  [Key in KeyOf<TDict>]: TDict[Key] extends object
    ? `${Key}-${NestedObjectKeys<TDict[Key]>}`
    : `${Key}`;
}[KeyOf<TDict>];
