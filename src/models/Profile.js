export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.picture = data.picture
    this.bio = data.bio || ''
    this.coverImg = data.coverImg || 'https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80'
    this.github = data.github || ''
    this.linkedin = data.linkedin || ''
    this.resume = data.resume || ''
    this.class = data.class || ''
    this.graduated = data.graduated || false
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}