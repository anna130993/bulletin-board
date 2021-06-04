import React from 'react';
import { shallow } from 'enzyme';
import { UserHeaderComponent } from './UserHeader';

describe('Component UserHeader', () => {
  it('should render without crashing', () => {
    const component = shallow(<UserHeaderComponent />);
    expect(component).toBeTruthy();
  });
});
