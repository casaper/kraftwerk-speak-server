import { dictEntries } from './dict-entries';

const readonlySubject = { a: 1, b: 2 } as const;
type ReadonlySubjectKey = keyof typeof readonlySubject;
type ReadonlySubjectValue = typeof readonlySubject[ReadonlySubjectKey];

const writableSubject = { c: 1, d: 2 };

describe('dictEntries()', () => {
  it('gets literal keys of readonly subject', () => {
    // @ts-expect-error: Type '[string, 1 | 2][]' is not assignable to type '["a" | "b", ReadonlySubjectValue][]'.
    const notRoSubjEntries: [ReadonlySubjectKey, ReadonlySubjectValue][] =
      Object.entries(readonlySubject);
    expect(notRoSubjEntries).toEqual([
      ['a', 1],
      ['b', 2]
    ]);

    // @ts-expect-no-error
    const isRoSubjEntries: [ReadonlySubjectKey, ReadonlySubjectValue][] =
      dictEntries(readonlySubject);
    expect(isRoSubjEntries).toEqual([
      ['a', 1],
      ['b', 2]
    ]);
  });

  it('gets literal keys of writable subject', () => {
    // @ts-expect-error: Type '[string, number][]' is not assignable to type '["c" | "d", number][]'.
    const notWritableSubjEntries: ['c' | 'd', number][] = Object.entries(writableSubject);
    expect(notWritableSubjEntries).toEqual([
      ['c', 1],
      ['d', 2]
    ]);

    // @ts-expect-no-error
    const isWritableSubjectEntries: ['c' | 'd', number][] = dictEntries(writableSubject);
    expect(isWritableSubjectEntries).toEqual([
      ['c', 1],
      ['d', 2]
    ]);
  });
});
