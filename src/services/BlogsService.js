import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Blog } from "@/models/Blog.js"
import { AppState } from "@/AppState.js"

class BlogsService {

  clearBlogs() {
    AppState.blogs.length = 0
    AppState.activeBlog = null
  }

  async getBlogs() {
    this.clearBlogs()
    const response = await api.get('api/blogs')
    logger.log('GOT BLOGS 📜📜📜', response.data)
    const blogs = response.data.map(blogPOJO => new Blog(blogPOJO))
    AppState.blogs = blogs
  }

  async getBlogsByProfileId(profileId) {
    this.clearBlogs()
    const response = await api.get(`api/profiles/${profileId}/blogs`)
    logger.log('GOT BLOGS 📜📜📜', response.data)
    const blogs = response.data.map(blogPOJO => new Blog(blogPOJO))
    AppState.blogs = blogs
  }

  async getBlogById(blogId) {
    this.clearBlogs()
    const response = await api.get(`api/blogs/${blogId}`)
    logger.log('GOT BLOG 📜', response.data)
    const blog = new Blog(response.data)
    AppState.activeBlog = blog
  }

  async createBlog(blogData) {
    const response = await api.post('api/blogs', blogData)
    logger.log('CREATED BLOG ✨📜', response.data)
    const newBlog = new Blog(response.data)
    AppState.blogs.push(newBlog)
    return newBlog
  }
}

export const blogsService = new BlogsService()