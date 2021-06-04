import React from 'react';
import { shallow } from 'enzyme';
import { CustomButtonComponent } from './CustomButton';

describe('Component CustomButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<CustomButtonComponent />);
    expect(component).toBeTruthy();
  });
});
