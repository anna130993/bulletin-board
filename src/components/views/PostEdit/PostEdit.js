import React, {useState} from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import {getPostById} from '../../../redux/postsRedux';

import {NotFound} from '../NotFound/NotFound';
import {AdCreator} from '../../features/AdCreator/AdCreator';

//import styles from './PostEdit.module.scss';

const Component = ({user, post}) => {
  const [changedAd, editChangedAd] = useState({
    title: post ? post.title: '',
    text: post ? post.text : '',
    price: post ? post.price : '',
    tel: post ? post.tel : '',
    address: post ? post.address : '',
    photo: '',
  });

  const changeHandler = event => {
    editChangedAd({...changedAd, [event.target.name]: event.target.value});
  };

  const submitPost = () => {
    alert('Now you can implement those changes!');
  };

  const editAbility = user ? user.type === 'admin' || user.email === post.email : false;
  if(!post || !editAbility) return <NotFound />;
  else {
    return (
      <AdCreator post={changedAd} changeHandler={changeHandler} submitPost={submitPost} />
    );
  }
};

Component.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  post: getPostById(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
