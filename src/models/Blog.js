import { Account } from "./Account.js"

export class Blog {
  constructor(data) {
    this.id = data.id ?? data._id
    this.title = data.title
    this.body = data.body
    this.imgUrl = data.imgUrl || ''
    this.tags = data.tags
    this.published = data.published
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
