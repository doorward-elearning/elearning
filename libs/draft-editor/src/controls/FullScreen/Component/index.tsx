import React from 'react';
import Icon from '@doorward/ui/components/Icon';
import Option from '../../../components/Option';
import Button from '@doorward/ui/components/Buttons/Button';
import useKeyPress from '@doorward/ui/hooks/useKeyPress';

const LayoutComponent: React.FunctionComponent<LayoutComponentProps> = (props): JSX.Element => {
  const {
    config: { title, icons },
    translations,
    fullScreen,
    onFullScreenChanged,
  } = props;

  useKeyPress(27, () => {
    if (fullScreen) {
      onFullScreenChanged();
    }
  });
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
        {fullScreen ? (
          <Button icon={icons.minimize} mini>
            {title?.minimize || translations['components.controls.fullScreen.minimize']}
          </Button>
        ) : (
          <Icon icon={icons.maximize} />
        )}
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
