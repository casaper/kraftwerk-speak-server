import { Tree } from '@nrwl/devkit';
import { dirname, basename, extname, join } from 'path';

const writeExportToIndex = (
  tree: Tree,
  indexFileDir: string,
  exportItem: string
): void => {
  const indexFilePath = join(indexFileDir, 'index.ts');
  const indexContent =
    tree.exists(indexFilePath) && tree.read(indexFilePath)?.toString();
  if (!indexContent) {
    return tree.write(indexFilePath, `export * from './${exportItem}';\n`);
  }
  if (indexContent.includes(`from './${exportItem}'`)) {
    return console.log(
      `${exportItem} already exported for ${indexFileDir}:\n\n${indexContent}`
    );
  }
  const exportLines = [
    ...indexContent.split('\n').filter(Boolean),
    `export * from './${exportItem}';\n`,
  ]
    .filter(Boolean)
    .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))
    .filter(Boolean);
  tree.write(indexFilePath, [...exportLines, ''].join('\n'));
};

function removeLibraryMainIndexExportFile(
  sourceRoot: string,
  tree: Tree,
  exportPath: string
) {
  const libIndexPath = `${sourceRoot}/index.ts`;
  const libIndexContent = tree.read(libIndexPath);
  if (!libIndexContent) {
    throw new Error(`Missing content or missing file: ${libIndexPath}`);
  }
  const exportStatements = libIndexContent
    .toString()
    .split('\n')
    .filter(Boolean)
    .filter((line) => !line.includes(basename(exportPath, '.ts')));
  tree.write(libIndexPath, [...exportStatements, ''].join('\n'));
}

/**
 * Add per directory index.ts export to library export file
 *
 * Creates an `index.ts` in the directory of exportPath, and export that in
 * directory in all parent directory `index.ts` up until the one in the libraries
 * sourceRoot `index.ts`.
 *
 * If a directories `index.ts` does not exist, a new one is created, or else
 * the export is added to the existing exports file.
 *
 * @example
 * ```ts
 * const exportPath = 'libs/pet-store/basket/feature-summary/src/lib/example/example.component.ts';
 * const sourceRoot = 'libs/pet-store/basket/feature-summary/src';
 * exportToLibExport(tree, sourceRoot, exportPath);
 *
 * // libs/pet-store/basket/feature-summary/src/lib/example/index.ts
 * export * from './example-component';
 *
 * // libs/pet-store/basket/feature-summary/src/lib/index.ts
 * export * from './example';
 *
 * // libs/pet-store/basket/feature-summary/src/index.ts
 * export * from './lib';
 * ```
 */
export const exportToLibExport = ({
  tree,
  sourceRoot,
  exportPath,
}: {
  /**
   * The {@link Tree} instance
   */
  tree: Tree;
  /**
   * The projects source root path
   */
  sourceRoot: string;
  /**
   * The file path to export up to the sourceRoots index.ts
   */
  exportPath: string;
}): void => {
  if (!exportPath.startsWith(sourceRoot)) {
    throw new Error(`cannot export ${exportPath} for lib in ${sourceRoot}`);
  }
  const fileExt = extname(exportPath);
  if (fileExt?.length && fileExt !== '.ts') {
    throw new Error(`cannot export ${fileExt} for ${exportPath}`);
  }
  const indexFileDir = fileExt.length ? dirname(exportPath) : exportPath;

  if (indexFileDir === sourceRoot) {
    return;
  }
  if (fileExt === '.ts') {
    removeLibraryMainIndexExportFile(sourceRoot, tree, exportPath);
  }

  let inLibPath = exportPath.replace(`${sourceRoot}/`, '');
  inLibPath
    .split('/')
    .reverse()
    .forEach((segment) => {
      const dirExportPath = join(sourceRoot, inLibPath);
      const dirFileExt = extname(exportPath);
      if (dirFileExt?.length && dirFileExt !== '.ts') {
        throw new Error(`cannot export ${dirFileExt} for ${exportPath}`);
      }
      if (dirFileExt.length) {
        writeExportToIndex(
          tree,
          dirname(dirExportPath),
          basename(dirExportPath, '.ts')
        );
      } else {
        writeExportToIndex(tree, dirExportPath, segment);
      }
      inLibPath = inLibPath
        .replace(`/${segment}`, '')
        .replace(`${segment}`, '');
    });
};
