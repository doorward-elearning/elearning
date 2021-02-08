import React from 'react';
import Icon from '@doorward/ui/components/Icon';
import Option from '../../../components/Option';

const LayoutComponent: React.FunctionComponent<LayoutComponentProps> = (props): JSX.Element => {
  const {
    config: { title, icons },
    translations,
    fullScreen,
    onFullScreenChanged,
  } = props;
  return (
    <div className="rdw-fullscreen-wrapper">
      <Option
        value="fullScreen"
        onClick={onFullScreenChanged}
        title={
          fullScreen
            ? title?.minimize || translations['components.controls.fullScreen.minimize']
            : title?.maximize || translations['components.controls.fullScreen.maximize']
        }
      >
        <Icon icon={fullScreen ? icons.minimize : icons.maximize} />
      </Option>
    </div>
  );
};

export interface LayoutComponentProps {
  config: Record<string, any>;
  translations: Record<string, any>;
  fullScreen: boolean;
  onFullScreenChanged: Function;
}

export default LayoutComponent;
