<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { router } from '../router.js'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const account = computed(() => AppState.account)

const isCreator = computed(() => {
  return AppState.account?.id === props.post.creatorId
})

async function likePost() {
  try {
    await postsService.likePost(props.post.id)
  } catch (error) {
    Pop.error(error)
  }
}

async function deletePost() {
  try {
    const yes = await Pop.confirm('Delete Post?', 'Are you sure you want to remove this post?', 'warning')
    if (!yes) { return }
    await postsService.removePost(props.post.id)
  } catch (error) {
    Pop.error(error)
  }
}

function goToProfile() {
  router.push({ name: 'Profile', params: { id: props.post.creatorId } })
}

</script>

<template>
  <div class="card elevation-2 mb-3">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-2">
        <img :src="post.creator.picture" alt="" @click="goToProfile" class="profile-pic">
        <div>
          <p class="mb-0 fw-bold">{{ post.creator.name }}</p>
          <p class="mb-0 text-muted">{{ new Date(post.createdAt).toLocaleDateString() }}</p>
        </div>
      </div>
      <div v-if="isCreator">
        <button @click="deletePost" class="btn btn-danger">
          <i class="mdi mdi-delete"></i>
        </button>
      </div>
    </div>

    <div class="card-body">
      <p class="mb-0">{{ post.body }}</p>
      <img v-if="post.imgUrl" :src="post.imgUrl" :alt="post.body" class="img-fluid rounded mt-2">
    </div>

    <div class="card-footer">
      <button
        @click="likePost"
        class="btn"
        :class="post.likes.find(l => l.id === account?.id) ? 'btn-primary' : 'btn-outline-primary'"
        :disabled="!account"
      >
        <i class="mdi mdi-heart"></i>
      <span>{{ post.likes.length }}</span>
    </button>
  </div>
</div>
</template>

<style scoped lang="scss">
.profile-pic {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
}
</style>