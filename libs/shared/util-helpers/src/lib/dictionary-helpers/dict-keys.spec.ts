import { dictKeys } from './dict-keys';

const readonlySubject = { a: 1, b: 2 } as const;
type ReadonlySubjectKey = keyof typeof readonlySubject;

const writableSubject = { c: 1, d: 2 };

describe('dictKeys()', () => {
  it('gets literal keys of readonly subject', () => {
    // @ts-expect-error: Type 'string[]' is not assignable to type '("a" | "b")[]'.
    const notRoSubjKeys: ReadonlySubjectKey[] = Object.keys(readonlySubject);
    expect(notRoSubjKeys).toEqual(['a', 'b']);

    // @ts-expect-no-error
    const isRoSubjectKeys: ReadonlySubjectKey[] = dictKeys(readonlySubject);
    expect(isRoSubjectKeys).toEqual(['a', 'b']);
  });

  it('gets literal keys of writable subject', () => {
    // @ts-expect-error: Type 'string[]' is not assignable to type '("c" | "d")[]'.
    const notWritableSubjKeys: ('c' | 'd')[] = Object.keys(writableSubject);
    expect(notWritableSubjKeys).toEqual(['c', 'd']);

    // @ts-expect-no-error
    const isWritableSubjKeys: ('c' | 'd')[] = dictKeys(writableSubject);
    expect(isWritableSubjKeys).toEqual(['c', 'd']);
  });
});
