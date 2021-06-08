import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getByEmail, fetchPublished, getRequest } from '../../../redux/postsRedux.js';
import {getUser} from '../../../redux/userRedux';

import {PostsArchive} from '../../features/PostsArchive/PostsArchive';
import Grid from '@material-ui/core/Grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {CustomButton} from '../../common/CustomButton/CustomButton';
import {NotFound} from '../NotFound/NotFound';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import styles from './MyPosts.module.scss';

const Component = ({className, children, posts, user, loadPosts, postsRequest}) => {
  useEffect(() => {
    loadPosts();
  },
  []);

  if(!user) return <NotFound />;
  else {
    return (
      <Grid container spacing={2} className={clsx(className, styles.root)}>
        {postsRequest.active && <Grid item xs={12}><LinearProgress /></Grid>}
        {postsRequest.error && <Grid item xs={12}><Alert severity='error'>Could not load posts! Sorry!</Alert></Grid>}
        <CustomButton to='/post/add' label='add'>
          <FontAwesomeIcon icon={faPlus} />
        </CustomButton>
        {!postsRequest.error && !postsRequest.active && <Grid xs={12} item>
          <PostsArchive posts={posts} />
        </Grid>}
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
  loadPosts: PropTypes.func,
  postsRequest: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  posts: getByEmail(state),
  user: getUser(state),
  postsRequest: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as MyPosts,
  Container as MyPosts,
  Component as MyPostsComponent,
};
