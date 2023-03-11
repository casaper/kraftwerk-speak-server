import { componentGenerator } from '@nrwl/angular/generators';

export type NrwlComponentGeneratorSchema = Parameters<
  typeof componentGenerator
>[1];

/**
 * Options schema for component workspace-generator
 *
 * Adapts the original schema of {@link componentGenerator}
 */
export interface Schema
  extends Omit<NrwlComponentGeneratorSchema, 'export' | 'type' | 'project'> {
  project: string;
  /**
   * @defaultValue `false`
   */
  verbose?: boolean;
  /**
   * @defaultValue `false`
   */
  libraryExport?: boolean;
}
