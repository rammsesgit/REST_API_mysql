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
    `SELECT post_content FROM ${tableName} WHERE post_type = 'post' AND id = ${req.params.postId}` // like siteorigin
  )

  content = posts[0][0].post_content

  if (content.includes('siteorigin')) {
    cleanContent = content.replace(/\[.?siteorigin.*?\]/g, '')
  } else {
    cleanContent = content
  }

  return res.json({ cleanContent })
}

/**
 * Get the post content from all rows but without siteorigin_widget's
 * compare Id 8886
 */
async function getPostsContentClean(req: Request, res: Response): Promise<Response> {
  let content,
    cleanContent = []

  const posts = await req.body.conn.query(
    `SELECT id, post_type, post_content FROM ${tableName} WHERE (post_type = 'post' OR post_type = 'page') AND post_content LIKE '%siteorigin%'`
  )

  content = posts[0]

  for (let index = 0; index < content.length; index++) {
    cleanContent.push({
      id: content[index].id,
      post_type: content[index].post_type,
      post_content: content[index].post_content.replace(/\[.?siteorigin.*?\]/g, '')
    })
  }

  return res.json(cleanContent)
}

/**
 * Update the post content from all rows with siteorigin_widget's
 */
async function updatePostsContentClean(req: Request, res: Response) {
  let dirtyContent = [],
    cleanContent = []

  const posts = await req.body.conn.query(
    `SELECT id, post_type, post_content FROM ${tableName} WHERE (post_type = 'post' OR post_type = 'page') AND post_content LIKE '%siteorigin%'`
  )

  dirtyContent = posts[0]

  for (let index = 0; index < dirtyContent.length; index++) {
    const post_content = dirtyContent[index].post_content.replace(/\[.?siteorigin.*?\]/g, '')
    const id = dirtyContent[index].id
    await req.body.conn.query(`UPDATE ${tableName} SET post_content = ? WHERE id = ?`, [
      post_content,
      id
    ])
  }

  return res.json({ message: `Posts updated` })
}

export {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostsContent,
  getPostContent,
  getPostContentClean,
  getPostsContentClean,
  updatePostsContentClean
}
