import React, {useState} from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import {NotFound} from '../NotFound/NotFound';
import {AdCreator} from '../../features/AdCreator/AdCreator';

// import styles from './PostAdd.module.scss';

const Component = ({user}) => {

  const [newPost, editNewPost] = useState({
    title: '',
    text: '',
    price: '',
    tel: '',
    address: '',
    photo: '',
  });

  const changeHandler = event => {
    editNewPost({...newPost, [event.target.name]: event.target.value});
  };

  const submitPost = () => {
    editNewPost({
      title: '',
      text: '',
      price: '',
      tel: '',
      address: '',
      photo: '',
    });
  };

  if (!user) return <NotFound />;
  else {
    return (
      <AdCreator post={newPost} changeHandler={changeHandler} submitPost={submitPost} />
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
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
