import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {NumberFormat} from '../../common/NumberFormat/NumberFormat';
import FormControl from '@material-ui/core/FormControl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {CustomButton} from '../../common/CustomButton/CustomButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {PhoneModel} from '../../common/PhoneModel/PhoneModel';
import styles from './AdCreator.module.scss';

const Component = ({className, post, changeHandler, photoChangeHandler, submitPost}) => {

  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [isFading, setIsFading] = useState(false);
  const [titleErrorAlerts, setTitleErrorAlerts] = useState('');
  const [textErrorAlerts, setTextErrorAlerts] = useState('');
  const [emailErrorAlerts, setEmailErrorAlerts] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (post.photo) {
      setImageUrl(URL.createObjectURL(post.photo));
      setIsFading(true);
      setTimeout(() => { setIsFading(false); }, 999);
    } else {
      setImageUrl('');
      setImageName('');
    }
  }, [post.photo]);

  const setImage = event => {
    const photo = event.target.files[0];
    if (photo) {
      photoChangeHandler(photo);
      setImageName(event.target.value);
    }
  };

  const savePostHandler = () => {
    if (post.title && post.text && !titleErrorAlerts && !textErrorAlerts) {
      submitPost();
    } else setOpen(true);
  };

  const titleVal = title => {
    if(title && title.length < 10) setTitleErrorAlerts('Your title is too short!');
    else setTitleErrorAlerts('');
  };

  const textVal = text => {
    if(text && text.length < 20) setTextErrorAlerts('Your description is too short!');
    else setTextErrorAlerts('');
  };

  const emailVal = email => {
    const emailPatt = new RegExp(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i);
    if (email && !emailPatt.test(email)) setEmailErrorAlerts('Your email input is incomplete/incorrect! Make sure you put in all @s and dots!');
    else setEmailErrorAlerts('');
  };

  const titleChangeHandler = event => {
    titleVal(event.target.value);
    changeHandler(event);
  };

  const textChangeHandler = event => {
    textVal(event.target.value);
    changeHandler(event);
  };

  const emailChangeHandler = event => {
    emailVal(event.target.value);
    changeHandler(event);
  };

  return (
    <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
      <Grid item container xs={12} md={6} alignContent='stretch' justify='center'>
        <Paper className={styles.paper}>
          <form noValidate autoComplete='off' className={styles.form}>
            <TextField id='title' name='title' label='Title' variant='outlined' fullWidth margin='normal' value={post.title} onChange={titleChangeHandler} error={!!titleErrorAlerts} helperText={titleErrorAlerts} required/>
            <TextField id='text' name='text' label='Content' variant='outlined' fullWidth margin='normal' multiline rows={3} value={post.text} onChange={textChangeHandler} error={!!textErrorAlerts} helperText={textErrorAlerts} required/>
            <TextField id='price' name='price' label='Price' variant='outlined' fullWidth margin='normal' value={post.price} onChange={changeHandler} InputProps={{inputComponent: NumberFormat}} />
            <TextField id='email' name='email' label='Email address' variant='outlined' fullWidth margin='normal' type='email' value={post.email} onChange={emailChangeHandler} error={!!emailErrorAlerts} helperText={emailErrorAlerts} required/>
            <TextField id='phone' name='phone' label='Phone number' variant='outlined' fullWidth margin='normal' value={post.phone} onChange={changeHandler} InputProps={{inputComponent: PhoneModel}} inputProps={{autoComplete: 'fresh-pass'}}/>
            <TextField id='location' name='location' label='Address' variant='outlined' fullWidth margin='normal' multiline rows={3} value={post.location} onChange={changeHandler} inputProps={{autoComplete: 'fresh-pass'}}/>
            <FormControl variant='outlined' margin='normal'>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Button htmlFor='photo' color='primary' variant='contained' component='label'>Select ad photo</Button>
                  <input id='photo' name='photo' type='file' style={{'display': 'none'}} value={imageName} onChange={setImage} accept='image/png, image/jpeg, image/gif, image/jpg'/>
                </Grid>
                <Grid item>
                  <Typography>{post.photo ? post.photo.name : ''}</Typography>
                </Grid>
              </Grid>
            </FormControl>
            <CustomButton onClick={savePostHandler}>
              <FontAwesomeIcon icon={faCheck} />
            </CustomButton>
          </form>
        </Paper>
      </Grid>
      {imageUrl && <Grid item container xs={12} md={6} alignContent='stretch' justify='center'>
        <Paper className={styles.paper}>
          <img src={imageUrl} alt='thumbnail' className={clsx(styles.photo, isFading && styles.fadeIn)} />
        </Paper>
      </Grid>}
      <Snackbar open={open} autoHideDuration={2500} onClose={() => setOpen(false)}>
        <Alert severity='warning' variant='outlined'>There is something missing or incorrect with your form! Check all the fields and try again!</Alert>
      </Snackbar>
    </Grid>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    email: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    photo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  changeHandler: PropTypes.func,
  submitPost: PropTypes.func,
  photoChangeHandler: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as AdCreator,
  // Container as AdCreator,
  Component as AdCreatorComponent,
};
