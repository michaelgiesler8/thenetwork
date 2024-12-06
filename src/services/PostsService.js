import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
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
    const index = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts[index] = new Post(res.data)
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