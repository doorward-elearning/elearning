import * as React from 'react';
import { shallow } from 'enzyme';
import Badge from '../index';
import '@testing-library/jest-dom';
import '../Badge.scss';
import classNames from 'classnames';

describe('Badge component test', () => {
  const iconValue = <img alt="Test icon" />;
  // Snapshot Tests
  it('should render a default component with nothing', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a badge component with theme ', () => {
    const wrapper = shallow(<Badge theme="success" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a badge component with classname', () => {
    const wrapper = shallow(<Badge className='ed-badge' />);
    expect(wrapper).toMatchSnapshot();
  });
  //prop Tests
  it('should have the class ed-badge ', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.prop('className')).toContain('ed-badge');
  });

  it('should have the class ed-badge along with render class ed-badge', () => {
    const wrapper = shallow(<Badge className="ed-badge" />);
    expect(wrapper.prop('className')).toContain('ed-badge ed-badge');
  });
  
  it('should have the class ed-badge along with theme', () => {
    const wrapper = shallow(<Badge theme='success' />);
    expect(wrapper.prop('className')).toContain('ed-badge success');
  });
});

