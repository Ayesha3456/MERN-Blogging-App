const { createBlogs, fetchAllBlogs, updateBlogsById, deleteBlogsById } = require('../Controllers/BlogsController');

const router = require('express').Router();

// To get all the Blogs
router.get('/', fetchAllBlogs);

// To create a Blog
router.post('/', createBlogs);

// To update a Blog
router.put('/:id', updateBlogsById);

// To delete a Blog
router.delete('/:id', deleteBlogsById);

module.exports = router;