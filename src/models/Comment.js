import { Account } from "./Account.js"

export class Comment {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.blogId = data.blog
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}