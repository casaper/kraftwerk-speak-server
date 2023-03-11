import { Tree, formatFiles, installPackagesTask, names } from '@nrwl/devkit';
import { libraryGenerator, UnitTestRunner } from '@nrwl/angular/generators';

import { deleteChanges, filterChangesWith } from '../utils/tree-utils.fn';
import { exportToLibExport } from '../utils/export-to-lib-export';
import { workspacePrefix } from '../utils/workspace-prefix.const';

import { addEslintOverrideForSpecs } from './add-eslint-override-for-specs';
import { addStylelintToProject } from './add-stylelint-to-project';
import { Schema } from './schema';
import { simplifyLibModuleFileName } from './simplify-lib-module-file-name';

/**
 * Generate angular library with scope type and optional name
 */
export default async function (
  tree: Tree,
  { name, scope, type, ...schema }: Schema
) {
  if (name?.includes('/')) {
    throw new Error(
      `  For libs a subpath can only be set via the scope option!\n` +
        `  But you passed ${name} including path one or more path segments ('/').`
    );
  }
  // build the library names
  const libName = names([type, name].filter(Boolean).join('-'));
  const scopeSegments = scope.split('/');
  const project = names(
    [...scopeSegments, libName.fileName].join('-')
  ).fileName;
  // const prefix = names([workspacePrefix, project].join('-')).fileName;
  const moduleFileName = names(
    name ? `${type}-${name}` : `${scopeSegments.slice(-1)[0]}-${type}`
  ).fileName;

  const importPathSegments = [
    workspacePrefix,
    ...scopeSegments,
    libName.fileName,
  ];

  await libraryGenerator(tree, {
    ...schema,
    tags: Object.entries({ scope, type })
      .map((tag) => tag.join(':'))
      .join(', '),
    importPath: `@${importPathSegments.join('/')}`,
    name: libName.name,
    // prefix,
    directory: scope,
    standaloneConfig: true,
    unitTestRunner: UnitTestRunner.Jest,
    simpleModuleName: false,
  });
  await formatFiles(tree);

  // patch the library generator default output
  deleteChanges({
    tree,
    fileChanges: filterChangesWith({
      tree,
      method: 'endsWith',
      search: 'README.md',
    }),
  });

  const projectData = simplifyLibModuleFileName(tree, project, moduleFileName);
  // create per directory index.ts export
  if (projectData.sourceRoot && projectData.modulePath) {
    exportToLibExport({
      tree,
      sourceRoot: projectData.sourceRoot,
      exportPath: projectData.modulePath,
    });

    if (schema.style === 'scss') {
      await addStylelintToProject(tree, projectData);
    }
  }
  // get spec files linted as well
  addEslintOverrideForSpecs(tree);

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
