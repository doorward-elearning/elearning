import React from 'react';
import Icon from '@doorward/ui/components/Icon';
import './withFullScreen.scss';
import ReactDOM from 'react-dom';
import { Subtract } from 'utility-types';

function getViewPort() {
  let viewPortWidth;
  let viewPortHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientWidth != 'undefined' &&
    document.documentElement.clientWidth !== 0
  ) {
    viewPortWidth = document.documentElement.clientWidth;
    viewPortHeight = document.documentElement.clientHeight;
  }

  // older versions of IE
  else {
    viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
  }
  return [viewPortWidth, viewPortHeight];
}

export interface FullScreenComponentProps {
  isFullScreen: boolean;
  viewPortWidth: number;
  viewPortHeight: number;
}

function withFullScreen<BaseProps extends FullScreenComponentProps>(
  Element: React.ComponentType<BaseProps>,
  target: string
) {
  class FullScreenHandler extends React.Component<Subtract<BaseProps, FullScreenComponentProps>> {
    state = {
      isFullScreen: false,
    };

    toggleFullScreen = () => {
      this.setState((prevState: any) => ({
        isFullScreen: !prevState.isFullScreen,
      }));
    };

    render() {
      const { isFullScreen } = this.state;
      const [viewPortWidth, viewPortHeight] = getViewPort();

      const PortalElement = (
        <div className="ed-fullscreen-component">
          <React.Fragment>
            <div className="fullscreen-trigger">
              <Icon icon={isFullScreen ? 'fullscreen_exit' : 'fullscreen'} onClick={this.toggleFullScreen} />
            </div>
            <Element
              viewPortHeight={viewPortHeight}
              viewPortWidth={viewPortWidth}
              isFullScreen={isFullScreen}
              {...(this.props as any)}
            />
          </React.Fragment>
        </div>
      );
      return isFullScreen ? ReactDOM.createPortal(PortalElement, document.getElementById(target)) : PortalElement;
    }
  }

  return FullScreenHandler;
}

export default withFullScreen;
