import { Tree, FileChange } from '@nrwl/devkit';

const changes = (tree: Tree): FileChange[] => tree.listChanges();

type FilterFn<TItem> = (change: TItem) => boolean;

const treePathMatcherFns = {
  includes:
    (search: string | RegExp): FilterFn<FileChange> =>
    ({ path }) =>
      path.includes(search instanceof RegExp ? search.source : search),
  endsWith:
    (search: string | RegExp): FilterFn<FileChange> =>
    ({ path }) =>
      path.endsWith(search instanceof RegExp ? search.source : search),
  startsWith:
    (search: string | RegExp): FilterFn<FileChange> =>
    ({ path }) =>
      path.startsWith(search instanceof RegExp ? search.source : search),
  match:
    (search: string | RegExp): FilterFn<FileChange> =>
    ({ path }) =>
      Boolean(path.match(search)),
} as const;

type TreePathMatcherType = keyof typeof treePathMatcherFns;

/**
 * Filter changes with path search in tree with string method
 */
export const filterChangesWith = ({
  tree,
  method,
  search,
}: {
  /**
   * The {@link Tree} instance to filter changes from
   */
  tree: Tree;
  /**
   * the string method to match search with
   */
  method: TreePathMatcherType;
  /**
   * search string, or RegExp (for method 'match')
   */
  search: string | RegExp;
}): FileChange[] => changes(tree).filter(treePathMatcherFns[method](search));

/**
 * Find change with path search in tree with string method
 *
 * @param tree - the tree to find change in
 * @param method - the string method to match search with
 * @param search - search string, or RegExp (for method 'match')
 */
export const findChangeWith = ({
  tree,
  method,
  search,
}: {
  /**
   * The {@link Tree} instance to find change in
   */
  tree: Tree;
  method: TreePathMatcherType;
  search: string | RegExp;
}): FileChange | null =>
  changes(tree).find(treePathMatcherFns[method](search)) || null;

/**
 * Delete file changes given in tree
 */
export const deleteChanges = ({
  tree,
  fileChanges,
}: {
  /**
   * The {@link Tree} instance to delete files in
   */
  tree: Tree;
  /**
   * file change items to delete
   */
  fileChanges: FileChange[];
}): void => fileChanges.forEach((change) => tree.delete(change.path));

const changesInType = (
  tree: Tree,
  changeTypes: FileChange['type'][]
): FileChange[] =>
  changes(tree).filter(({ type }) => changeTypes.includes(type));

/**
 * Logs all CREATE and UPDATE changes with file path to the console
 */
export const logAllTreeChanges = (tree: Tree): void => {
  console.log(
    changesInType(tree, ['CREATE', 'UPDATE'])
      .map(({ content, path }) => `\n# file: ${path}\n${content?.toString()}`)
      .join('\n')
  );
};
