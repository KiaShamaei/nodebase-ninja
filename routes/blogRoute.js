
const express = require('express');
const Blog = require('../models/blog');
const blogController = require('../controllers/blogControllers')

router = express.Router();

router.get('/',blogController.blog_index);
router.post('/create',blogController.blog_create_post)
router.get('/create',blogController.blog_create_get);
router.get("/:id",blogController.blog_details)
router.delete('/:id',blogController.blog_delete)

module.exports = router;