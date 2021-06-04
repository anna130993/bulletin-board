import React from 'react';
import { shallow } from 'enzyme';
import { NumberFormatComponent } from './NumberFormat';

describe('Component NumberFormat', () => {
  it('should render without crashing', () => {
    const component = shallow(<NumberFormatComponent />);
    expect(component).toBeTruthy();
  });
});
