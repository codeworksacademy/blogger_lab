import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Blog } from "@/models/Blog.js"
import { AppState } from "@/AppState.js"

class BlogsService {
  async getBlogs() {
    AppState.blogs.length = 0
    const response = await api.get('api/blogs')
    logger.log('GOT BLOGS 📜📜📜', response.data)
    const blogs = response.data.map(blogPOJO => new Blog(blogPOJO))
    AppState.blogs = blogs
  }
}

export const blogsService = new BlogsService()