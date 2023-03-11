import { Tree, names } from '@nrwl/devkit';
import { join } from 'path';

import { LibraryType } from './library-type';
import { parseProjectConfig } from './parse-project-config';
import { ProjectData } from './project-data';
import { workspacePrefix } from './workspace-prefix.const';

const libraryTypes: readonly LibraryType[] = [
  'feature',
  'data-access',
  'ui',
  'util',
  'api',
] as const;
const typeAlternations = Object.values(libraryTypes).join('|');
const matchType = new RegExp(`(?<type>${typeAlternations})`);
const matchName = new RegExp(`(${typeAlternations})-(?<name>.+)$`);

const typeFromLibName = (libName: string): LibraryType => {
  const result = matchType.exec(libName);
  if (!result?.groups?.type) {
    throw new Error(
      `Library name '${libName}' does not contain any library type (${typeAlternations})!`
    );
  }
  return result.groups.type as LibraryType;
};

/**
 * Extract given and custom project information from project.json
 *
 * Extract project configuration from json, and gather aditional workspace
 * specific project information in one bundle.
 *
 * @param tree - the tree instance
 * @param projectName - the name of the project
 * @param projectJson - optionally use config from string instead the one existing on disk
 */
export const getLibProjectData = ({
  projectName,
  tree,
  projectJson,
}: {
  projectName: string;
  tree?: Tree;
  projectJson?: string | Buffer;
}): ProjectData => {
  const { sourceRoot, prefix, projectType, tags, ...projectJsonRest } =
    parseProjectConfig({ projectName, tree, projectJson });
  // raise for TS type safety
  if (!sourceRoot || !projectType || !tags) {
    throw new Error(`No project.json found for ${projectName}`);
  }
  const sourceRootSegments = sourceRoot.split('/');

  const path = sourceRootSegments.slice(1, -1);
  const libNames = names(path.slice(-1)[0]);
  const scope = path.slice(0, -1);
  const projectNames = names(path.join('-'));
  const type = typeFromLibName(libNames.fileName);
  const name = matchName.exec(libNames.fileName)?.groups?.name || null;
  const moduleNames = names(
    name ? `${type}-${name}` : `${scope.slice(-1)[0]}-${type}`
  );
  return {
    type,
    projectType,
    tags,
    scopeRoot: join(...sourceRootSegments.slice(0, -2)),
    projectRoot: join(...sourceRootSegments.slice(0, -1)),
    sourceRoot,
    libRoot: join(sourceRoot, 'lib'),
    scope: join(...scope),
    segments: {
      path,
      scope,
    },
    projectNames: {
      prefix: names(prefix || `${workspacePrefix}-${projectNames.fileName}`),
      lib: libNames,
      project: projectNames,
      module: moduleNames,
    },
    projectConfig: {
      sourceRoot,
      prefix,
      projectType,
      tags,
      ...projectJsonRest,
    },
  };
};
