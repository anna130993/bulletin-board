import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import {getPresent, loadSingleReq, getRequest, updatePostRequest} from '../../../redux/postsRedux';

import {NotFound} from '../NotFound/NotFound';
import {AdCreator} from '../../features/AdCreator/AdCreator';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import styles from './PostEdit.module.scss';

const Component = ({user, post, loadPost, postRequest, updatePost}) => {
  const [changedAd, editChangedAd] = useState({
    title: '',
    text: '',
    price: '',
    phone: '',
    location: '',
    photo: null,
  });

  useEffect(() => {
    loadPost();
  },
  []);

  useEffect(() => {
    editChangedAd({...changedAd, ...post});
  },
  [post]);

  useEffect(() => {
    if (postRequest.error && postRequest.type === 'UPDATE_POST') {
      setIsError(true);
    } else setIsError(false);

    if(postRequest.success && postRequest.type === 'UPDATE_POST') {
      setIsSuccess(true);
    }
  }, [postRequest]);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const changeHandler = event => {
    editChangedAd({...changedAd, [event.target.name]: event.target.value});
  };

  const photoChangeHandler = photo => {
    editChangedAd({...changedAd, photo});
  };

  const submitPost = () => {
    if (changedAd.title && changedAd.text) {
      const postData = {
        ...post,
        ...changedAd,
        status: 'published',
      };
      updatePost(postData);
    }
  };

  const editAbility = user && post && (user.type === 'admin' || user.email === post.author);
  if(postRequest.active && postRequest.type === 'LOAD_POST') return <div className={styles.root}><LinearProgress /></div>;
  else if (postRequest.error && postRequest.type === 'LOAD_POST') return <div className={styles.root}><Alert severity='error'>Could not load posts! Sorry!</Alert></div>;
  else if (!post || !editAbility) return <NotFound />;
  else {
    return (
      <div>
        <AdCreator post={changedAd} changeHandler={changeHandler} photoChangeHandler={photoChangeHandler} submitPost={submitPost} />
        <Snackbar open={isError} autoHideDuration={2500} onClose={() => setIsError(false)}>
          <Alert severity='error' variant='outlined'>Something went wrong! Try again!</Alert>
        </Snackbar>
        <Snackbar open={isSuccess} autoHideDuration={2500} onClose={() => setIsSuccess(false)}>
          <Alert severity='success' variant='outlined'>Post successfully saved!</Alert>
        </Snackbar>
      </div>
    );
  }
};

Component.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  postRequest: PropTypes.object.isRequired,
  loadPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  post: getPresent(state, props.match.params.id),
  postRequest: getRequest(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadPost: () => dispatch(loadSingleReq(props.match.params.id)),
  updatePost: postData => dispatch(updatePostRequest(props.match.params.id, postData)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
