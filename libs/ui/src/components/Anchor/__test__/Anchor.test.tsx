import * as React from 'react';
import { shallow } from 'enzyme';
import Anchor from '../index';
import { getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Anchor test suit', () => {
  test('successfully render or not', () => {
    const wrapper = shallow(<Anchor />);
    expect(wrapper.exists()).toBe(true);
  });

  test(' check the text input', () => {
    const wrapper = shallow(<Anchor href="www.google.com" />);
    expect(wrapper.find('a').props().href).toEqual('www.google.com');
  });

  test('should navigate to url... when link is clicked ', () => {
    const wrapper = render(<Anchor href="https://who.int"> Click here</Anchor>);
    expect(screen.getByText('Click here')).toHaveAttribute('href', 'https://who.int');
  });
});
