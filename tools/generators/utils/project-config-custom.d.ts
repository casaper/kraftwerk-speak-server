import { ProjectConfiguration } from '@nrwl/devkit';

/**
 * Customisation of {@link ProjectConfiguration}
 *
 * - extended with missing prefix property
 * - name and tags property required
 */
export interface ProjectConfigCustom
  extends Omit<ProjectConfiguration, 'name' | 'tags'>,
    Required<Pick<ProjectConfiguration, 'name' | 'tags'>> {
  /**
   * Project prefix
   *
   * @remarks
   * `@nrwl/devkit`'s original project config schema seems to have
   * that property missing, as of 2022-11-25.
   */
  prefix: string;
}
