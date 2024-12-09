<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
import { router } from '../router.js'
import { format } from 'timeago.js'
import { AuthService } from '../services/AuthService';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const account = computed(() => AppState.account)
const isCreator = computed(() => account.value?.id === props.post.creatorId)
const timeAgo = computed(() => format(new Date(props.post.createdAt)))


const likeTooltip = computed(() => {
  if (!props.post.likes.length) return 'Be the first to like this!'
  return props.post.likes.map(l => l.name).join(', ')
})

async function likePost() {
  try {
    if (!account.value) {
      const wantsToLogin = await Pop.confirm('Login Required', 'You must be logged in to like posts. Would you like to login?')
      if (wantsToLogin) {
        AuthService.loginWithPopup()
      }
      return
    }
    await postsService.likePost(props.post.id)
  } catch (error) {
    Pop.error(error)
  }
}

async function deletePost() {
  try {
    if (!isCreator.value) return
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
      <div @click="goToProfile" class="d-flex align-items-center gap-2 selectable">
        <img 
          :src="post.creator.picture" 
          :alt="post.creator.name" 
          class="profile-pic rounded-circle"
        >
        <div>
          <p class="mb-0 fw-bold">{{ post.creator.name }}</p>
          <p class="mb-0 text-muted small">{{ timeAgo }}</p>
        </div>
      </div>

      <div v-if="isCreator" class="dropdown">
        <button 
          class="btn btn-link" 
          data-bs-toggle="dropdown"
        >
          <i class="mdi mdi-dots-vertical"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
          <button @click="deletePost" class="dropdown-item text-danger">
            <i class="mdi mdi-delete me-1"></i>Delete Post
          </button>
        </div>
      </div>
    </div>
    

    <div class="card-body">
      <p>{{ post.body }}</p>
      <img 
        v-if="post.imgUrl" 
        :src="post.imgUrl" 
        :alt="post.body" 
        class="img-fluid rounded">
      >
    </div>

    <div class="card-footer">
      <button
        @click="likePost"
        class="btn"
        :class="post.likes.find(l => l.id === account?.id) ? 'btn-primary' : 'btn-outline-primary'"
        :title="likeTooltip"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      >
        <i class="mdi mdi-heart me-1"></i>
        {{ post.likes.length }}
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
}

.card-header {
  padding: 1rem;

  .profile-pic {
    margin-right: 0.5rem;
  }
}


.card {
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba (0,0,0,0.1);
  }
}

.btn-link {
  color: car(--bs-body-color);

  &:hover {
    color: var(--bs-primary);
  }
}

</style>