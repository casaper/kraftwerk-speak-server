import { libraryGenerator } from '@nrwl/angular/generators';

export type NrwlLibraryGeneratorSchema = Parameters<typeof libraryGenerator>[1];

/**
 * Schema for library workspace-generator
 */
export interface Schema
  extends Omit<
    NrwlLibraryGeneratorSchema,
    | 'directory'
    | 'simpleModuleName'
    | 'tags'
    | 'unitTestRunner'
    | 'standaloneConfig'
    | 'importPath'
    | 'selector'
    | 'skipSelector'
    | 'style'
  > {
  scope: string;
  type: string;
  style: Extract<NrwlLibraryGeneratorSchema['style'], 'none' | 'scss'>;
}
