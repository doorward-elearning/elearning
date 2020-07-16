import themes, { Theme } from '@doorward/ui/themes/themes';

const updateTheme = (currentTheme: string) => {
  localStorage.setItem('theme', currentTheme);
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  const style: HTMLStyleElement = document.createElement('style');
  if (currentTheme) {
    let styleContent = '';

    const themeProperties = themes[currentTheme || 'base'];
    (Object.keys(themeProperties) as Array<keyof Theme>).forEach(key => {
      if (key.startsWith('--')) {
        styleContent += `${key}: ${themeProperties[key]};`;
      }
    });

    style.innerHTML = `:root {
        ${styleContent}
      }`;

    head.appendChild(style);
  }
  return () => {
    head.removeChild(style);
  };
};

export default updateTheme;
