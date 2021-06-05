import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getByEmail } from '../../../redux/postsRedux.js';
import {getUser} from '../../../redux/userRedux';

import {PostsArchive} from '../../features/PostsArchive/PostsArchive';
import Grid from '@material-ui/core/Grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {CustomButton} from '../../common/CustomButton/CustomButton';
import {NotFound} from '../NotFound/NotFound';

import styles from './MyPosts.module.scss';

const Component = ({className, children, posts, user}) => {
  if(!user) return <NotFound />;
  else {
    return (
      <Grid container spacing={2} className={clsx(className, styles.root)}>
        <CustomButton to='/post/add' label='add'>
          <FontAwesomeIcon icon={faPlus} />
        </CustomButton>
        <Grid sm={12} item>
          <PostsArchive posts={posts} />
        </Grid>
        {children}
      </Grid>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getByEmail(state),
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as MyPosts,
  Container as MyPosts,
  Component as MyPostsComponent,
};
