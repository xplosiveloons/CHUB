const getAllPosts = async (req, res) => {
  res.send('get all posts')
}

const getPost = async (req, res) => {
  res.send('get post')
}

const createPost = async (req, res) => {
  res.send(req.user)
}

const updatePost = async (req, res) => {
  res.send('update post')
}

const deletePost = async (req, res) => {
  res.send('delete post')
}

module.exports = {
  getAllPosts, getPost, createPost, deletePost, updatePost
}
