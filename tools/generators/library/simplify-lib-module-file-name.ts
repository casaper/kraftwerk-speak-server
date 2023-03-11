import { Tree } from '@nrwl/devkit';
import { join } from 'path';

import { findChangeWith } from '../utils/tree-utils.fn';
import { getLibProjectData } from '../utils/get-lib-project-data.fn';
import { ProjectData } from '../utils/project-data';

/**
 * Rename the module filename in library to shorter version
 *
 * - prefixes project name with type (if name was given)
 * - sets project prefix to `name-scope-segments-library-type-library-name`
 * - deletes the by default generated README.md in the library project dir
 * - generates exported module with class name
 *   LibraryScopeSegmentsLibraryTypeLibraryNameModule
 * - simplifies the long filename of that module to:
 *     - if no name given: last segment of scope and library type - `scope-segment-feature.module.ts`
 *     - if name given: library type and name - `feature-lib-name.module.ts`
 */
export const simplifyLibModuleFileName = (
  tree: Tree,
  project: string,
  moduleFileName: string
): ProjectData => {
  const projectData = getLibProjectData({ tree, projectName: project });
  const moduleChange = findChangeWith({
    tree,
    method: 'endsWith',
    search: '.module.ts',
  });
  const indexChange = findChangeWith({
    tree,
    method: 'endsWith',
    search: 'index.ts',
  });
  if (!moduleChange || !indexChange?.content) {
    return projectData;
  }
  // rename the module.ts file
  const modulePath = moduleChange.path.replace(
    // eslint-disable-next-line no-useless-escape
    new RegExp(`${projectData.libRoot}\/[a-z-]+\.module\.ts`, 'g'),
    join(projectData.libRoot, `${moduleFileName}.module.ts`)
  );
  tree.rename(moduleChange.path, modulePath);
  // fix the library export of the module
  tree.write(
    indexChange.path,
    indexChange.content.toString().replace(
      // eslint-disable-next-line no-useless-escape
      new RegExp(`\.\/lib\/[a-z-]+\.module`, 'gm'),
      `./lib/${moduleFileName}.module`
    )
  );
  return { modulePath, ...projectData };
};
