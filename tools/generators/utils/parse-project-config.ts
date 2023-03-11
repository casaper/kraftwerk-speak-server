import {
  Tree,
  readProjectConfiguration,
  ProjectConfiguration,
} from '@nrwl/devkit';

import { ProjectConfigCustom } from './project-config-custom';

/**
 * Get the project config with type safety on name, tags and prefix property
 */
export const parseProjectConfig = ({
  projectName,
  tree,
  projectJson,
}: {
  projectName: string;
  tree?: Tree;
  projectJson?: string | Buffer;
}): ProjectConfigCustom => {
  let parsedConfig: ProjectConfiguration & { prefix?: string };
  if (projectJson) {
    parsedConfig = JSON.parse(
      projectJson instanceof Buffer ? projectJson.toString() : projectJson
    );
  } else {
    if (!tree) {
      throw new Error('If projectJson not given, tree is required!');
    }
    parsedConfig = readProjectConfiguration(tree, projectName);
  }
  if (!parsedConfig.name || !parsedConfig.tags || !parsedConfig.prefix) {
    throw new Error(
      `Project config is missing required properties:\n` +
        `prefix: ${parsedConfig.prefix}\n` +
        `name: ${parsedConfig.name}\n` +
        `tags: ${parsedConfig.tags}`
    );
  }
  return parsedConfig as ProjectConfigCustom;
};
