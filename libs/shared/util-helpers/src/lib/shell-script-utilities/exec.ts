import {
  exec as childProcessExec,
  ExecException,
  ExecOptions as ChildProcessExecOptions
} from 'child_process';
import { workspaceRoot } from './workspace-root';

export interface ExecResult {
  error: ExecException | null | unknown;
  stdout: string | null | undefined;
  stderr: string | null | undefined;
}
export interface ExecOptions extends ChildProcessExecOptions {
  /**
   * console.log exec results and console.error when error
   * @defaultValue `false`
   */
  verbose?: boolean;
}
type ExecReject = (reason: ExecResult) => void;
type ExecResolve = (result: ExecResult) => void;

const isExecException = (error: ExecException | unknown): error is ExecException =>
  Boolean(error) && error instanceof Error;

const outLogs = (result: Omit<ExecResult, 'error'>): string =>
  Object.entries(result)
    .filter(([, value]) => value?.length)
    .map(kv => kv.join(': '))
    .join('\n');

const handleVerbose = ({ error, ...result }: ExecResult, verbose = false): void => {
  if (!verbose) {
    return;
  }
  if (!error) {
    return console.log(outLogs(result));
  }
  if (isExecException(error)) {
    return console.error(`cmd: ${error.cmd}\n${outLogs(result)}`);
  }
  console.error(`${error}\n${outLogs(result)}`);
};

/**
 * Custom shell exec of child_process wrapped in promise
 *
 * @param shellCommand - the shell command you intend to execute
 * @param options - same as {@link ExecOptions}, only cwd defaults to workspaceRoot
 */
export const exec = (
  shellCommand: string,
  { cwd = workspaceRoot(), verbose = false, ...optionalOpts }: ExecOptions = {}
): Promise<ExecResult> =>
  new Promise((resolve: ExecResolve, reject: ExecReject) => {
    childProcessExec(shellCommand, { cwd, ...optionalOpts }, (error, stdout, stderr) => {
      const result: ExecResult = { error, stdout, stderr };
      handleVerbose(result, verbose);
      return error ? reject(result) : resolve(result);
    });
  });
