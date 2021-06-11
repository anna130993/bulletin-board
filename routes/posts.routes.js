const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'public/images'});
const {titleVal, textVal, statVal, photoVal, emailVal} = require('../valid');

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo status')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Page not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Page not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', upload.single('photo'), async (req, res) => {
  const {author, title, text, price, phone, location, status} = req.body;
  const photo = req.file;

  if(titleVal(title) && textVal(text) && emailVal(author) && statVal(status) && photoVal(photo)) {
    const date = new Date();
    try {
      const newPost = new Post({author, created: date, updated: date, status, title, text, photo: photo ? photo.path.replace('public', '') : '', price, phone, location});
      const saved = await newPost.save();
      res.status(201).json(saved);
    } catch(err) {
      res.status(500).json({message: 'Post could not be saved! Sorry!'});
    }
  } else {
    res.status(400).json({message: 'Wrong request! Sorry!'});
  }
});

router.put('/posts/:id', upload.single('photo'), async (req, res) => {
  const {title, text, price, phone, location, status} = req.body;
  const photo = req.file;

  if(titleVal(title) && textVal(text) && statVal(status) && photoVal(photo)) {
    const date = new Date();
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        Object.assign(post, {title, text, photo: photo ? photo.path.replace('public', '') : '', price: price === 'null' ? null : price, phone, status, location, updated: date});
        const updatedPost = await post.save();
        res.json(updatedPost);
      }
      else res.status(404).json({message: 'Page not found'});
    }
    catch (err) {
      res.status(500).json({message: 'Could not update the post! Sorry!'});
    }
  } else {
    res.status(400).json({message: 'Wrong request! Sorry!'});
  }
});

module.exports = router;
