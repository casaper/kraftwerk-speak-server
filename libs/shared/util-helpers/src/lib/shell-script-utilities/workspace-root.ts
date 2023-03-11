import { resolve, join } from 'path';

/**
 * The Absolute fs-path of your local workspaceRoot
 */
export const workspaceRoot = (): string => resolve(join(__dirname, '../../../../../../'));
