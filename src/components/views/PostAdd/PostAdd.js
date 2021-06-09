import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import {savePostRequest, getRequest} from '../../../redux/postsRedux';

import {NotFound} from '../NotFound/NotFound';
import {AdCreator} from '../../features/AdCreator/AdCreator';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// import styles from './PostAdd.module.scss';

const Component = ({user, savePost, postRequest}) => {

  const [newPost, editNewPost] = useState({
    title: '',
    text: '',
    price: '',
    phone: '',
    location: '',
    photo: null,
  });

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (postRequest.error && postRequest.error.type === 'SAVE_POST') {
      setIsError(true);
    } else setIsError(false);

    if(postRequest.success && postRequest.type === 'SAVE_POST') {
      setIsSuccess(true);
      editNewPost({
        title: '',
        text: '',
        price: '',
        phone: '',
        location: '',
        photo: null,
      });
    }
  }, [postRequest]);

  const changeHandler = event => {
    editNewPost({...newPost, [event.target.name]: event.target.value});
  };

  const photoChangeHandler = photo => {
    editNewPost({...newPost, photo});
  };

  const submitPost = async () => {
    if(newPost.title && newPost.text && user && user.email){
      const postData = {
        ...newPost,
        author: user.email,
        status: 'published',
      };
      savePost(postData);
    }
  };

  if (!user) return <NotFound />;
  else {
    return (
      <div>
        <AdCreator post={newPost} changeHandler={changeHandler} photoChangeHandler={photoChangeHandler} submitPost={submitPost} />
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
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
  postRequest: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  savePost: post => dispatch(savePostRequest(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
