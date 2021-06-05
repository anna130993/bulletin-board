import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostById, loadSingleReq, getRequest } from '../../../redux/postsRedux.js';
import {getUser} from '../../../redux/userRedux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {NotFound} from '../NotFound/NotFound';
import Link from '@material-ui/core/Link';
import {CustomButton} from '../../common/CustomButton/CustomButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import styles from './Post.module.scss';

const Component = ({className, children, post, user, postRequest, loadPost}) => {
  useEffect(() => {
    loadPost();
  },
  []);

  if(postRequest.active) return <div className={styles.root}><LinearProgress /></div>;
  else if (postRequest.error) return <div className={styles.root}><Alert severity='error'>Could not load posts! Sorry!</Alert></div>;
  else if (!post) return <NotFound />;
  else {
    const editAbility = user ? user.type === 'admin' || user.email === post.email : false;

    const image = post.photo ?
      (<Grid item xs={12} md={6}>
        <img src={post.photo} alt={post.title} className={clsx(styles.photo, 'MuiPaper')} />
      </Grid>)
      : '';

    const local = post.address ?
      (<Grid item xs>
        <Typography variant='h5' component='h2'>Where:</Typography>
        <Typography>{post.address}</Typography>
      </Grid>)
      : '';

    return (
      <div className={clsx(className, styles.root)}>
        <Grid container spacing={2}>
          {postRequest.active && <Grid item xs={12}><LinearProgress /></Grid>}
          {postRequest.error && <Grid item xs={12}><Alert severity='error'>Could not load posts! Sorry!</Alert></Grid>}
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography variant='h4' component='h1' align='center'>
                    {post.title}
                  </Typography>
                </Grid>
                {post.price && <Grid item><Typography variant='subtitle1'>$ {post.price}</Typography></Grid>}
              </Grid>
            </Paper>
          </Grid>
          {image}
          <Grid item xs>
            <Paper className={styles.paper}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs>
                  <Typography>
                    {post.text}
                  </Typography>
                </Grid>
                {local}
                <Grid item xs>
                  <Typography variant='h6' component='h2'>Contact</Typography>
                  <Typography component='address'>
                    <Link href={`mailto:${post.email}`}>{post.email}</Link><br/>
                    {post.tel && `tel: ${post.tel}`}<br />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            Published: {new Date(post.published).toLocaleDateString()} <br />
            Latest update: {new Date(post.lastUpdate).toLocaleDateString()}
          </Grid>
          {children}
        </Grid>
        {editAbility && <CustomButton label='edit' to={`/post/${post.id}/edit`}><FontAwesomeIcon icon={faEdit} /></CustomButton>}
      </div>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
  postRequest: PropTypes.object.isRequired,
  loadPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
  postRequest: getRequest(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadPost: () => dispatch(loadSingleReq(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
