import { Router } from 'express'
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostContent
} from '../controllers/wp_posts.controller'

const router = Router()

router
  .route('/')
  .get(getPosts)
  .post(createPost)

router.route('/content').get(getPostContent)

router
  .route('/:postId')
  .get(getPost)
  .delete(deletePost)
  .put(updatePost)

export default router
