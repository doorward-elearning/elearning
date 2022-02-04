import * as React from 'react';
import { shallow } from 'enzyme';
import BadgeControl from '../index';
import '@testing-library/jest-dom';
import '../Badge.scss';
import classNames from 'classnames';



describe('BadgeControl component test', () => {
  const iconValue = <img alt="Test icon" />;
  // Snapshot Tests
  it('should render a badge control component with value', () => {
    const wrapper = shallow(<BadgeControl value={1} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a badge control component with icon ', () => {
    const wrapper = shallow(<BadgeControl value={''} bookmark={true} />);
    expect(wrapper).toMatchSnapshot();
  });

    //prop Tests
  it('should have the class ed-badge-control ', () => {
    const wrapper = shallow(<BadgeControl value={''} />);
    expect(wrapper.prop('className')).toContain('ed-badge-control');
  });
});


