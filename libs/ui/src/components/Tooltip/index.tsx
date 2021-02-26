import React, { Component, MouseEventHandler, MutableRefObject, ReactElement } from 'react';
import './Tooltip.scss';

interface TooltipState {
  visible: boolean;
  top: number;
  left: number;
  padding: number;
  delay: number;
}

class Tooltip extends Component<TooltipProps, TooltipState> {
  container = document.getElementById('modal-box');
  parent = React.createRef<any>();
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

  componentDidMount(): void {}

  componentWillUnmount(): void {
    this.removeEventListeners();
  }

  removeEventListeners = () => {
    const { parentRef: ref, onClick } = this.props;
    if (ref?.current) {
      const element = ref.current;

      element.removeEventListener('click', onClick as any);
      element.removeEventListener('mouseover', this.show);
      element.removeEventListener('mouseout', this.hide);
    }
  };

  componentWillReceiveProps(nextProps: Readonly<TooltipProps>, nextContext: any): void {
    const { parentRef: ref, onClick } = nextProps;

    if (ref?.current) {
      this.removeEventListeners();
      const element = ref.current;

      element.addEventListener('click', onClick as any);
      element.addEventListener('mouseover', this.show);
      element.addEventListener('mouseout', this.hide);

      this.parent = ref;
    }
  }

  show = () => {
    const { hidden } = this.props;
    const { visible } = this.state;
    if (!visible && !hidden) {
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
    const { className, children, title, onClick, parentRef: ref } = this.props;
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

    if (ref) {
      return <React.Fragment>{children}</React.Fragment>;
    } else {
      const component = this.props.component || <div />;
      return (
        <React.Fragment>
          {React.cloneElement(component, {
            className,
            onClick,
            onMouseOver: this.show,
            onMouseOut: this.hide,
            ref: this.parent,
            children,
          })}
        </React.Fragment>
      );
    }
  }
}

export interface TooltipProps {
  className?: string;
  title: string;
  onClick?: MouseEventHandler<any>;
  parentRef?: MutableRefObject<HTMLElement>;
  hidden?: boolean;
  component?: ReactElement<any>;
}

export default Tooltip;
