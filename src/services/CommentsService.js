import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comment.js"
import { AppState } from "@/AppState.js"

class CommentsService {
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('CREATED COMMENT 🗨️', response.data)
    const comment = new Comment(response.data)
    AppState.comments.push(comment)
  }
  async getCommentsByBlogId(blogId) {
    AppState.comments.length = 0
    const response = await api.get(`api/blogs/${blogId}/comments`)
    logger.log('GOT COMMENTS 🗨️🗨️🗨️', response.data)
    const comments = response.data.map(commentPOJO => new Comment(commentPOJO))
    AppState.comments = comments
  }
}

export const commentsService = new CommentsService()