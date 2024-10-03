import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('CREATED COMMENT 🗨️', response.data)
  }
  async getCommentsByBlogId(blogId) {
    const response = await api.get(`api/blogs/${blogId}/comments`)
    logger.log('GOT COMMENTS 🗨️🗨️🗨️', response.data)
  }
}

export const commentsService = new CommentsService()