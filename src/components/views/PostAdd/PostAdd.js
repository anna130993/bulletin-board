import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {NumberFormat} from '../../common/NumberFormat/NumberFormat';
import FormControl from '@material-ui/core/FormControl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {CustomButton} from '../../common/CustomButton/CustomButton';
import Button from '@material-ui/core/Button';
import {NotFound} from '../NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './PostAdd.module.scss';

const Component = ({className, children, user}) => {

  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [isFading, setIsFading] = useState(false);

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

  const setPhoto = event => {
    changeHandler(event);
    const photo = event.target.files[0];
    if (photo) {
      setImageName(photo.name);
      setImageUrl(URL.createObjectURL(photo));
      setIsFading(true);
      setTimeout(() => {setIsFading(false);}, 999);
    }
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
    setImageUrl('');
    setImageName('');
  };

  if (!user) return <NotFound />;
  else {
    return (
      <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
        <Grid item container xs={12} md={6} alignContent='stretch'>
          <Paper className={styles.paper}>
            <form noValidate autoComplete='off' className={styles.form}>
              <TextField id='title' name='title' label='Title' variant='outlined' fullWidth margin='normal' value={newPost.title} onChange={changeHandler}/>
              <TextField id='text' name='text' label='Content' variant='outlined' fullWidth margin='normal' multiline rows={3} value={newPost.text} onChange={changeHandler}/>
              <TextField id='price' name='price' label='Price' variant='outlined' fullWidth margin='normal' myType='price' value={newPost.price} onChange={changeHandler} InputProps={{inputComponent: NumberFormat}} />
              <TextField id='tel' name='tel' label='Tel number' variant='outlined' fullWidth margin='normal' type='tel' value={newPost.tel} onChange={changeHandler}/>
              <TextField id='address' name='address' label='Address' variant='outlined' fullWidth margin='normal' multiline rows={3} value={newPost.address} onChange={changeHandler}/>
              <FormControl variant='outlined' margin='normal'>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item>
                    <Button htmlFor='photo' color='primary' variant='contained' component='label'>Select ad photo</Button>
                    <input id='photo' name='photo' type='file' style={{'display': 'none'}} value={newPost.photo} onChange={setPhoto} accept='image/png, image/jpeg, image/gif, image/jpg'/>
                  </Grid>
                  <Grid item>
                    <Typography>{imageName}</Typography>
                  </Grid>
                </Grid>
              </FormControl>
              <CustomButton onClick={submitPost}>
                <FontAwesomeIcon icon={faCheck} />
              </CustomButton>
            </form>
          </Paper>
        </Grid>
        {imageUrl && <Grid item container xs={12} md={6} alignContent='stretch'>
          <Paper className={styles.paper}>
            <img src={imageUrl} alt='thumbnail' className={clsx(styles.photo, isFading && styles.fadeIn)} />
          </Paper>
        </Grid>}
      </Grid>
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
