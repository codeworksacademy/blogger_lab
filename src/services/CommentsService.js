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
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log('DELETED COMMENT 💣', response.data)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    AppState.comments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService()