import express, { Application, Request, Response, NextFunction } from 'express'
import { connect } from './database'
import morgan from 'morgan'

// Routes
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'
import WpPostRoutes from './routes/wp_posts.routes'

export class App {
  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  settings() {
    this.app.set('port', this.port || process.env.PORT || 3000)
  }

  middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  routes() {
    this.app.use(IndexRoutes)
    this.app.use('/posts', this.connection, PostRoutes)
    this.app.use('/wp_posts', this.connection, WpPostRoutes)
  }

  async connection(req: Request, res: Response, next: NextFunction) {
    req.body.conn = await connect()
    next()
  }

  async listen() {
    await this.app.listen(this.app.get('port'))
    console.log(`Server on port ${this.app.get('port')}`)
  }
}
