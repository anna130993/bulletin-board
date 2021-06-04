import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import {getUser} from '../../../redux/userRedux';

import { PostsArchive } from '../../features/PostsArchive/PostsArchive';
import Grid from '@material-ui/core/Grid';
import {CustomButton} from '../../common/CustomButton/CustomButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import styles from './Homepage.module.scss';

const Component = ({className, children, posts, user}) => {
  const userAdds = user ? (
    <CustomButton to='/post/add' label='add'>
      <FontAwesomeIcon icon={faPlus} />
    </CustomButton>
  ) : null;
  return (
    <Grid container spacing={2} className={clsx(className, styles.root)}>
      {userAdds}
      <Grid sm={12} item>
        <PostsArchive posts={posts} />
      </Grid>
      {children}
    </Grid>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

//const mapDispatchToProps = dispatch => ({
//someAction: arg => dispatch(reduxActionCreator(arg)),
//});

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
