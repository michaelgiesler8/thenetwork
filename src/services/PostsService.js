import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import Pop from "../utils/Pop.js"

class PostsService {
  async getPosts(page = '') {
    const res = await api.get('/api/posts' + page)
    logger.log('[GOT POSTS]', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)
    const newPost = new Post(res.data)
    AppState.posts.unshift(newPost)
    return newPost
  }

  async removePost(postId) {
    await api.delete(`/api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }

  async likePost(postId) {
    const res = await api.post(`/api/posts/${postId}/like`)
    const updatedPost = new Post(res.data)
    const index = AppState.posts.findIndex(p => p.id == postId)
    if (index !== -1) {
      AppState.posts.splice(index, 1, updatedPost)
    }
  }

  async getPostsByProfile(profileId) {
    const res = await api.get(`/api/profiles/${profileId}/posts`)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }

  async searchPosts(query) {
    const res = await api.get('/api/posts', {
      params: { query }
    })
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }
}

export const postsService = new PostsService