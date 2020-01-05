import { Request, Response } from 'express'
import { connect } from '../database'
import { Post } from '../models/Post'

async function getPosts(req: Request, res: Response): Promise<Response> {
  const posts = await req.body.conn.query('SELECT * FROM posts')
  return res.json(posts[0])
}

async function createPost(req: Request, res: Response) {
  const newPost: Post = req.body.post
  await req.body.conn.query('INSERT INTO posts SET ?', [newPost])
  return res.json({ message: 'Post created' })
}

async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId
  const post = await req.body.conn.query('SELECT * FROM posts WHERE id = ?', [id])
  return res.json(post[0])
}

async function deletePost(req: Request, res: Response) {
  const id = req.params.postId
  await req.body.conn.query('DELETE FROM posts WHERE id = ?', [id])
  return res.json({ message: 'Post deleted' })
}

async function updatePost(req: Request, res: Response) {
  const id = req.params.postId
  const updatedPost: Post = req.body.post
  await req.body.conn.query('UPDATE posts set ? WHERE id = ?', [updatedPost, id])
  return res.json({ message: 'Post updated' })
}

export { getPosts, createPost, getPost, deletePost, updatePost }
