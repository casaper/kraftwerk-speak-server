import { Tree, formatFiles, installPackagesTask, names } from '@nrwl/devkit';
import { componentGenerator } from '@nrwl/angular/generators';
import { join } from 'path';

import { exportToLibExport } from '../utils/export-to-lib-export';
import { filterChangesWith, logAllTreeChanges } from '../utils/tree-utils.fn';
import { getLibProjectData } from '../utils/get-lib-project-data.fn';
import { workspacePrefix } from '../utils/workspace-prefix.const';

import { exportedRenameHandlerFn } from './exported-rename-handler-fn';
import { Schema } from './schema';

/**
 * Generate component in library or application project
 *
 * - Renames the components class name from ExampleComponent to
 *   AppNameScopeNameProjectNameExampleComponent
 * - removes the default `implements OnInit` from the generated component.
 */
export default async function (
  tree: Tree,
  {
    name: optionName,
    path: optionPath = 'components',
    project,
    module,
    verbose = false,
    libraryExport = false,
    ...schema
  }: Schema
) {
  const { libRoot, scope, projectNames, ...projectData } = getLibProjectData({
    tree,
    projectName: project,
  });
  const nameSegments = optionName.split('/');
  const name = nameSegments.length > 1 ? nameSegments.slice(-1)[0] : optionName;
  const path = join(
    libRoot,
    ...(nameSegments.length > 1
      ? [optionPath, ...nameSegments.slice(0, -1)]
      : [optionPath])
  );

  const generatorOptions = {
    ...schema,
    name,
    path,
    project,
    module: `${scope}/${module || projectNames.lib.fileName}`,
    type: 'component',
    export: libraryExport,
  };
  if (libraryExport) {
    generatorOptions.selector = names(
      `${workspacePrefix}-${projectNames.project.fileName}-${name}`
    ).fileName;
  }
  await componentGenerator(tree, generatorOptions);

  await formatFiles(tree);

  const oldName = names(`${name}-component`);
  const newName = names(`${projectNames.project.fileName}-${name}-component`);

  filterChangesWith({ tree, method: 'endsWith', search: '.ts' }).forEach(
    exportedRenameHandlerFn({ libraryExport, oldName, newName, tree })
  );
  if (libraryExport) {
    filterChangesWith({
      tree,
      method: 'endsWith',
      search: '.component.ts',
    }).forEach(({ path }) => {
      exportToLibExport({
        tree,
        sourceRoot: projectData.sourceRoot,
        exportPath: path,
      });
    });
  }
  await formatFiles(tree);
  if (verbose) {
    logAllTreeChanges(tree);
  }
  return () => {
    installPackagesTask(tree);
  };
}
