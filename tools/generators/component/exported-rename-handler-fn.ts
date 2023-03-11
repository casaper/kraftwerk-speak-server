import { Tree, FileChange } from '@nrwl/devkit';

import { Names } from '../utils/project-data';

type RenameHandlerFn = (change: FileChange) => void;

export interface ExportedRenameHandlerArgs {
  libraryExport: boolean;
  oldName: Names;
  newName: Names;
  tree: Tree;
}

const cleanupComponentSource = (source: string): string =>
  source
    .replace(', OnInit', '')
    // eslint-disable-next-line no-control-regex
    .replace(new RegExp(' implements OnInit {\n.*\n.*\n.*\n}', 'mg'), ' {}');

const renameForLibraryExport = ({
  tree,
  oldName,
  newName,
  content,
  path,
}: ExportedRenameHandlerArgs & {
  tree: Tree;
  path: string;
  content: Buffer;
}): void => {
  const renamedContent = content
    .toString()
    .replace(new RegExp(oldName.className, 'gm'), newName.className);
  if (!path.endsWith('.component.ts')) {
    return tree.write(path, renamedContent);
  }
  return tree.write(path, cleanupComponentSource(renamedContent));
};

/**
 * forEach handler function for renameings when component is libraryExport
 */
export const exportedRenameHandlerFn =
  (args: ExportedRenameHandlerArgs): RenameHandlerFn =>
  ({ path, content }) => {
    if (args.libraryExport && content) {
      return renameForLibraryExport({ ...args, path, content });
    }
    if (path.endsWith('.component.ts') && content) {
      args.tree.write(path, cleanupComponentSource(content.toString()));
    }
  };
