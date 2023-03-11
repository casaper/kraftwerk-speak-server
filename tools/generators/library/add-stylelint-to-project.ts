import { Tree } from '@nrwl/devkit';
import { scssGenerator, configurationGenerator } from 'nx-stylelint';

import { ProjectData } from '../utils/project-data';

export const addStylelintToProject = async (
  tree: Tree,
  projectData: ProjectData
): Promise<void> => {
  await configurationGenerator(tree, {
    project: projectData.projectNames.project.fileName,
    skipFormat: false,
  });
  await scssGenerator(tree, {
    project: projectData.projectNames.project.fileName,
    skipFormat: false,
  });
};
