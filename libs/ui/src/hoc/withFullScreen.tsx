import React from 'react';
import Icon from '@doorward/ui/components/Icon';
import './withFullScreen.scss';
import ReactDOM from 'react-dom';
import { Subtract } from 'utility-types';
import getViewPort from '@doorward/ui/utils/getViewPort';

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
