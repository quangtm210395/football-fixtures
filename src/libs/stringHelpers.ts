
/**
 * a function to format the string pattern with arguments
 * @param pattern the string pattern like "logging request for {1} at {2}"
 * @param args the arguments to replace into {1} and {2}
 * @returns formatted string
 */
export function formatWithArgs(pattern: string, args: any[]) {
  return pattern.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] != 'undefined'
      ? args[index]
      : match;
  });
}
