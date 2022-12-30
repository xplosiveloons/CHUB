const express = require('express')
const router = express.Router()
const { getAllPosts, getPost, createPost, deletePost, updatePost }
  = require('../controllers/chub')


router.route('/').post(createPost).get(getAllPosts)
router.route('/:postid').get(getPost).delete(deletePost).patch(updatePost)

module.exports = router