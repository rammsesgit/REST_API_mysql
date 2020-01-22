import { Request, Response } from 'express'
import { Post } from '../models/Post'

const tableName = `wp_posts`

async function getPosts(req: Request, res: Response): Promise<Response> {
  const posts = await req.body.conn.query(`SELECT * FROM ${tableName} WHERE post_type = 'post'`)
  return res.json(posts[0])
}

async function createPost(req: Request, res: Response) {
  const newPost: Post = req.body.post
  await req.body.conn.query(`INSERT INTO posts SET ?`, [newPost])
  return res.json({ message: `Post created` })
}

async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId
  const post = await req.body.conn.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id])
  return res.json(post[0])
}

async function deletePost(req: Request, res: Response) {
  const id = req.params.postId
  await req.body.conn.query(`DELETE FROM ${tableName} WHERE id = ?`, [id])
  return res.json({ message: `Post deleted` })
}

async function updatePost(req: Request, res: Response) {
  const id = req.params.postId
  const updatedPost: Post = req.body.post
  await req.body.conn.query(`UPDATE posts set ? WHERE id = ?`, [updatedPost, id])
  return res.json({ message: `Post updated` })
}

/**
 * Get only the post content
 */
async function getPostsContent(req: Request, res: Response): Promise<Response> {
  const posts = await req.body.conn.query(
    `SELECT id, post_content FROM ${tableName} WHERE post_type = 'post'`
  )
  return res.json(posts[0])
}

/**
 * Get only the post content from a single post
 */
async function getPostContent(req: Request, res: Response): Promise<Response> {
  const posts = await req.body.conn.query(
    `SELECT post_content FROM ${tableName} WHERE post_type = 'post' AND id = ${req.params.postId}`
  )
  return res.json(posts[0][0])
}

/**
 * Get only the post content from a single post but without siteorigin_widget's
 */
async function getPostContentClean(req: Request, res: Response): Promise<Response> {
  let content = '',
    cleanContent = ''

  const posts = await req.body.conn.query(
    `SELECT post_content FROM ${tableName} WHERE post_type = 'post' AND id = ${req.params.postId}`
  )

  content = posts[0][0].post_content

  if (content.includes('[siteorigin_widget')) {
    cleanContent = content.replace(/\[siteorigin_widget.+\/siteorigin_widget]/gi, '')
  } else {
    cleanContent = content
  }

  return res.json({ cleanContent })
}

export {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostsContent,
  getPostContent,
  getPostContentClean
}
