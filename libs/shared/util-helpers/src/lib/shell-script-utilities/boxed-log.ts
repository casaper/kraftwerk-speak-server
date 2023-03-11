const numChars = (count: number, char = '='): string => Array(count).fill(char).join('');

const splitStrLines = (subject: string, maxLen = 74.0): string[] => {
  const messageWords = subject.split(' ');
  const lines: string[] = [];
  let line = '';
  messageWords.forEach((word, index) => {
    if (word.length >= maxLen && line.length === 0) {
      line += `${word.slice(0, maxLen - 1)}-`;
      lines.push(line);
      line = word.slice(maxLen - 1);
      return;
    }
    const wordAdd = `${line.length === 0 ? '' : ' '}${word}`;
    if (line.length + wordAdd.length <= maxLen) {
      line += wordAdd;
    }
    if (line.length + 2 >= maxLen || index + 1 >= messageWords.length) {
      lines.push(line);
      line = '';
    }
  });
  return lines;
};

/**
 * Log to console in a box
 * @example
 * ```sh
 *
 *   ====================================
 *   == Finished icon generation 👍 😺 ==
 *   ====================================
 *
 * ```
 */
export const boxedLog = (
  message: string,
  {
    maxLength = 80.0,
    pre = 2,
    preWs = 2,
    suf = 2,
    char = '='
  }: {
    maxLength?: number;
    pre?: number;
    suf?: number;
    char?: string;
    preWs?: number;
  } = {},
  silent = false
): void => {
  if (silent) {
    return;
  }
  const frameChar = char.slice(0, 1);
  const spaceing = pre + suf + preWs + 2;
  const maxMessageLine = maxLength - spaceing;
  const isMultiLine = message.length > maxMessageLine;
  const totalLength = isMultiLine ? maxLength : spaceing + message.length;
  const lines = isMultiLine ? splitStrLines(message, maxMessageLine) : [message];

  const wrapLine = `${numChars(preWs, ' ')}${numChars(totalLength - preWs, frameChar)}`;
  console.log(`\n${wrapLine}`);
  lines.forEach((line, index) => {
    const start = `${numChars(preWs, ' ')}${numChars(pre, frameChar)} ${line} `;
    const suffix = numChars(suf, frameChar);
    const fill =
      index > 0 && start.length + suffix.length < maxLength
        ? numChars(maxLength - start.length - suffix.length, ' ')
        : '';
    console.log(`${start}${fill}${suffix}`);
  });
  console.log(`${wrapLine}\n`);
};
