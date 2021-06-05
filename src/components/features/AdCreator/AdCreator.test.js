import React from 'react';
import { shallow } from 'enzyme';
import { AdCreatorComponent } from './AdCreator';

describe('Component AdCreator', () => {
  it('should render without crashing', () => {
    const component = shallow(<AdCreatorComponent />);
    expect(component).toBeTruthy();
  });
});
