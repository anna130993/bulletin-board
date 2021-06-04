import React from 'react';
import { shallow } from 'enzyme';
import { PostsArchiveComponent } from './PostsArchive';

describe('Component PostsArchive', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostsArchiveComponent />);
    expect(component).toBeTruthy();
  });
});
