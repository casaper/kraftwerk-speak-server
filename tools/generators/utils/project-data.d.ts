import { names, ProjectType } from '@nrwl/devkit';

import { LibraryType } from './library-type';
import { ProjectConfigCustom } from './project-config-custom';

type Names = ReturnType<typeof names>;
export interface ProjectData {
  type: LibraryType;
  /**
   * Nx Project type
   */
  projectType: ProjectType;
  /**
   * The nx project tags, found in project.json
   */
  tags: string[];
  /**
   * The full path to where the library project resides in
   */
  scopeRoot: string;
  /**
   * Full path to project root
   */
  projectRoot: string;
  /**
   * Full path to project src directory
   */
  sourceRoot: string;
  /**
   * Full path to lib directory
   */
  libRoot: string;
  /**
   * The library scope
   * @example `example-app/example-scope/example-sub-scope`
   */
  scope: string;
  /**
   * arrays of path and scope segments
   */
  segments: Record<'path' | 'scope', string[]>;
  /**
   * Name utility results for prefix, lib and project
   */
  projectNames: Record<'prefix' | 'lib' | 'project' | 'module', Names>;
  /**
   * The whole content of the project.json
   */
  projectConfig: ProjectConfigCustom;

  // allow to add some extra data when necessary
  modulePath?: string;
  componentPath?: string;
}
