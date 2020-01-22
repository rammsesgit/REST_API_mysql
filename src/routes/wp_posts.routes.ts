import { Router } from 'express'
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostContent,
  getPostsContent,
  getPostContentClean
} from '../controllers/wp_posts.controller'

const router = Router()

router
  .route('/')
  .get(getPosts)
  .post(createPost)

router.route('/content').get(getPostsContent)
router.route('/content/:postId').get(getPostContent)
router.route('/contentclean/:postId/').get(getPostContentClean)

router
  .route('/:postId')
  .get(getPost)
  .delete(deletePost)
  .put(updatePost)

export default router
