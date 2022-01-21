import * as React from 'react';
import { shallow } from 'enzyme';
import Anchor from '../index';

describe('Anchor test suit', () => {
  test('render', () => {
    const wrapper = shallow(<Anchor />);
    expect(wrapper.exists()).toBe(true);
  });

  test(' check the link', () => {
    const wrapper = shallow(<Anchor href='www.google.com' />);
    expect(wrapper.find('a').props().href).toEqual('www.google.com');
  });
});
