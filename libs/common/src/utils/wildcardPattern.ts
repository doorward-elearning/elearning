const wildcardPattern = (string: string, rule: string) => {
  const escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  return new RegExp('^' + rule.split('*').map(escapeRegex).join('.*') + '$').test(string);
};

export default wildcardPattern;
