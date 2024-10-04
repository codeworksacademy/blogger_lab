import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Blog } from "@/models/Blog.js"
import { AppState } from "@/AppState.js"

class BlogsService {
  async deleteBlog(blogId) {
    const response = await api.delete(`api/blogs/${blogId}`)
    logger.log('DELETED BLOG 💣📜', response.data)
  }

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

  async updateBlog(blogData) {
    const response = await api.put(`api/blogs/${blogData.id}`, blogData)
    logger.log('UPDATED BLOG', response.data)
    const updatedBlog = new Blog(response.data)
    AppState.activeBlog = updatedBlog
  }
}

export const blogsService = new BlogsService()