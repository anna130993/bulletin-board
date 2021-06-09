import React from 'react';
import { shallow } from 'enzyme';
import { PhoneModelComponent } from './PhoneModel';

describe('Component PhoneModel', () => {
  it('should render without crashing', () => {
    const component = shallow(<PhoneModelComponent />);
    expect(component).toBeTruthy();
  });
});
