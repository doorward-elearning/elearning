import React, { Component } from 'react';

class ScriptComponent<Props, State = {}> extends Component<Props, State> {
  scripts = [];
  styles = [];

  public addScripts(...urls: Array<string>): Promise<Array<HTMLScriptElement>> {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise<HTMLScriptElement>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
            this.scripts.push(script);
            script.onload = () => {
              resolve(script);
            };
            script.onerror = () => {
              reject();
            };
          })
      )
    );
  }

  public addStyles(...urls: Array<string>) {
    urls.forEach((url) => {
      const style = document.createElement('link');
      style.href = url;
      style.rel = 'stylesheet';
      document.head.appendChild(style);

      this.styles.push(style);
    });
    return this.styles;
  }

  componentWillUnmount(): void {
    this.scripts.forEach((script) => document.body.removeChild(script));
    this.styles.forEach((style) => document.head.removeChild(style));
  }
}

export default ScriptComponent;
