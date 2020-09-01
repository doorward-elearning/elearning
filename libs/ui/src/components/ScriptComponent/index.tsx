import React, { Component } from 'react';

class ScriptComponent<Props, State = {}> extends Component<Props, State> {
  scripts = [];
  styles = [];

  public addScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    this.scripts.push(script);
    return script;
  }

  public addStyle(url: string) {
    const style = document.createElement('link');
    style.href = url;
    style.rel = 'stylesheet';
    document.head.appendChild(style);

    this.styles.push(style);
    return style;
  }

  componentWillUnmount(): void {
    this.scripts.forEach((script) => document.body.removeChild(script));
    this.styles.forEach((style) => document.head.removeChild(style));
  }
}

export default ScriptComponent;
