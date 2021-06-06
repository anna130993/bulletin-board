import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, signin, signout } from '../../../redux/userRedux.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {UserHeader} from '../../features/UserHeader/UserHeader';
import {AnonHeader} from '../../features/AnonHeader/AnonHeader';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChalkboard} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

const Component = ({className, user, signin, signout}) => {
  const GenHeader = user ? UserHeader : AnonHeader;

  const chooseUser = ({target}) => {
    if(target.value) {
      signin({email: 'anna.castillo@gmail.com', type: target.value});
    } else signout();
  };

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position='fixed'>
        <Toolbar className={styles.toolbar}>
          <Link component={RouterLink} to='/' variant='h5' className={styles.title} color='inherit' underline='none'>
            Bulletin Board
            <span>    </span>
            <FontAwesomeIcon icon={faChalkboard} />
          </Link>
          <GenHeader className={styles.nav} />
          <select value={user ? user.type : ''} onChange={chooseUser}>
            <option value=''>Non-user</option>
            <option value='genUser'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  signin: PropTypes.func,
  signout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  signin: user => dispatch(signin(user)),
  signout: () => dispatch(signout()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
