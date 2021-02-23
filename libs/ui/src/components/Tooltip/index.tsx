import React, { Component, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.scss';
import classNames from 'classnames';

interface TooltipState {
  visible: boolean;
  top: number;
  left: number;
  padding: number;
  delay: number;
}

class Tooltip extends Component<TooltipProps, TooltipState> {
  container = document.getElementById('modal-box');
  parent = React.createRef<HTMLDivElement>();
  tooltip: HTMLDivElement;

  state = {
    visible: false,
    top: 0,
    left: 0,
    padding: 5,
    delay: 100, // wait for the component to be mounted.
  };

  componentWillMount(): void {
    let tooltip = this.container.querySelector('.ed-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.classList.add('ed-tooltip');

      this.container.appendChild(tooltip);
    }
    this.tooltip = tooltip as HTMLDivElement;
  }

  show = () => {
    const { visible } = this.state;
    if (!visible) {
      this.setState(
        {
          visible: true,
        },
        this.updatePosition
      );
    }
  };

  updatePosition = () => {
    const { delay } = this.state;
    setTimeout(() => {
      const { padding } = this.state;

      const { current: parent } = this.parent;
      if (parent && this.tooltip) {
        const parentPosition = parent.getBoundingClientRect();
        const position = this.tooltip.getBoundingClientRect();

        const left = parentPosition.x + parentPosition.width / 2 - position.width / 2;
        const top = parentPosition.y + parentPosition.height + padding;

        if (top + left > 0) {
          this.setState({
            left,
            top,
          });
        }
      }
    }, delay);
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  render(): JSX.Element {
    const { className, children, title, onClick } = this.props;
    const { visible, top, left } = this.state;

    if (top + left > 0 && title) {
      this.tooltip.style.left = left + 'px';
      this.tooltip.style.top = top + 'px';
      this.tooltip.innerHTML = title;
    }

    if (visible && title && top + left > 0) {
      if (!this.tooltip.classList.contains('visible')) {
        this.tooltip.classList.add('visible');
      }
    } else {
      this.tooltip.classList.remove('visible');
    }
    return (
      <div className={className} onClick={onClick} onMouseOver={this.show} onMouseOut={this.hide} ref={this.parent}>
        {children}
      </div>
    );
  }
}

export interface TooltipProps {
  className?: string;
  title: string;
  onClick?: MouseEventHandler;
}

export default Tooltip;
