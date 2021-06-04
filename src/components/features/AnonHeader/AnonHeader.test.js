import React from 'react';
import { shallow } from 'enzyme';
import { AnonHeaderComponent } from './AnonHeader';

describe('Component AnonHeader', () => {
  it('should render without crashing', () => {
    const component = shallow(<AnonHeaderComponent />);
    expect(component).toBeTruthy();
  });
});
