import { Tree } from '@nrwl/devkit';
import { Linter } from 'eslint';

import { filterChangesWith } from '../utils/tree-utils.fn';

const specOverride: Linter.ConfigOverride = {
  files: ['*.spec.ts', 'test.ts', 'jest.*.js'],
  rules: {},
};

const jsOverride: Linter.ConfigOverride = {
  files: ['*.js'],
  rules: {},
};

/**
 * Add missing rules override to have .spec.ts etc. linted in project
 */
export const addEslintOverrideForSpecs = (tree: Tree): void =>
  filterChangesWith({
    tree,
    method: 'endsWith',
    search: 'eslintrc.json',
  }).forEach(({ path, content }) => {
    if (!content) {
      return;
    }
    const eslintConfig = JSON.parse(content.toString()) as Linter.Config;
    eslintConfig.overrides = eslintConfig.overrides || [];
    eslintConfig.overrides = [
      ...eslintConfig.overrides,
      specOverride,
      jsOverride,
    ];
    tree.write(path, JSON.stringify(eslintConfig, null, 2));
  });
