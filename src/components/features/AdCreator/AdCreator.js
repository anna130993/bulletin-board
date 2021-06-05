import React, {useState} from 'react';
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
import styles from './AdCreator.module.scss';

const Component = ({className, post, changeHandler, submitPost}) => {

  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [isFading, setIsFading] = useState(false);

  const setImage = event => {
    changeHandler(event);
    const photo = event.target.files[0];
    if (photo) {
      setImageName(photo.name);
      setImageUrl(URL.createObjectURL(photo));
      setIsFading(true);
      setTimeout(() => {setIsFading(false);}, 999);
    }
  };

  const savePostHandler = () => {
    submitPost();
    setImageUrl('');
    setImageName('');
  };

  return (
    <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
      <Grid item container xs={12} md={6} alignContent='stretch'>
        <Paper className={styles.paper}>
          <form noValidate autoComplete='off' className={styles.form}>
            <TextField id='title' name='title' label='Title' variant='outlined' fullWidth margin='normal' value={post.title} onChange={changeHandler}/>
            <TextField id='text' name='text' label='Content' variant='outlined' fullWidth margin='normal' multiline rows={3} value={post.text} onChange={changeHandler}/>
            <TextField id='price' name='price' label='Price' variant='outlined' fullWidth margin='normal' myType='price' value={post.price} onChange={changeHandler} InputProps={{inputComponent: NumberFormat}} />
            <TextField id='tel' name='tel' label='Tel number' variant='outlined' fullWidth margin='normal' type='tel' value={post.tel} onChange={changeHandler}/>
            <TextField id='address' name='address' label='Address' variant='outlined' fullWidth margin='normal' multiline rows={3} value={post.address} onChange={changeHandler}/>
            <FormControl variant='outlined' margin='normal'>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Button htmlFor='photo' color='primary' variant='contained' component='label'>Select ad photo</Button>
                  <input id='photo' name='photo' type='file' style={{'display': 'none'}} value={post.photo} onChange={setImage} accept='image/png, image/jpeg, image/gif, image/jpg'/>
                </Grid>
                <Grid item>
                  <Typography>{imageName}</Typography>
                </Grid>
              </Grid>
            </FormControl>
            <CustomButton onClick={savePostHandler}>
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
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    tel: PropTypes.string,
    address: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  imageName: PropTypes.string,
  imageUrl: PropTypes.string,
  changeHandler: PropTypes.func,
  submitPost: PropTypes.func,
  setImage: PropTypes.func,
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
