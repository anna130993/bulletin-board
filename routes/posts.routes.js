const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
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
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  const {author, title, text, photo, price, phone, location, status} = req.body;

  const titleVal = title && title.length > 10;
  const textVal = text && text.length > 20;

  const emailPatt = new RegExp(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i);
  const emailVal = emailPatt.test(author);

  const statVal = status && ['published', 'in progress', 'all done'].includes(status);

  if(titleVal && textVal && emailVal && statVal) {
    const date = new Date();
    try {
      const newPost = new Post({author, created: date, updated: date, status, title, text, photo, price, phone, location});
      const saved = await newPost.save();
      res.status(201).json(saved);
    } catch(err) {
      res.status(500).json({message: 'Post could not be saved! Sorry!'});
    }
  } else {
    res.status(400).json({message: 'Wrong request! Sorry!'});
  }
});

router.put('/posts/:id', async (req, res) => {
  const {title, text, photo, price, phone, location, status} = req.body;

  const titleVal = title && title.length > 10;
  const textVal = text && text.length > 20;

  const statVal = status && ['published', 'in progress', 'all done'].includes(status);

  if(titleVal && textVal && statVal) {
    const date = new Date();
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        Object.assign(post, {title, text, photo, price, phone, status, location, updated: date});
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
