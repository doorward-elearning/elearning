import * as React from 'react';

import Icon from '@doorward/ui/components/Icon';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Anchor from '../index';


describe("Anchor test suit", ()=>{
    
    test("render",()=>{
        const wrapper = shallow(<Anchor />)
        expect(wrapper.exists()).toBe(true)
        
    })

    test(" check the link",()=>{
        const wrapper = shallow(<Anchor href='' />)
        wrapper.find('input').simulate('change',{taget:{value: 'www.google.com'}})
        expect(wrapper.find('input').props().value).toEqual('www.google.com')
    })

    test("")

});