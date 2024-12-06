<script setup>
import { ref } from 'vue'
import { postsService } from '../../services/PostsService.js'
import Pop from '../../utils/Pop.js'
import { AppState } from '../../AppState.js';

const editable = ref({})
const isLoading = ref(false)

async function createPost() {
  try {
    if (!editable.value.body?.trim()) {
      return Pop.error('Post content is required')
    }
    isLoading.value = true
    await postsService.createPost(editable.value)
    editable.value = {}
    Pop.success('Post Created!')
  } catch (error) {
    Pop.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex gap-2">
        <img :src="AppState.account?.picture" alt="" class="rounded-circle profile-img">
        <form @submit.prevent="createPost" class="w-100">
          <textarea
            v-model="editable.body"
            required
            class="form-control mb-2"
            rows="3"
            placeholder="What's on your mind?"
            :disabled="isLoading"
          ></textarea>
          <input
            v-model="editable.imgUrl"
            class="form-control mb-2"
            type="url"
            placeholder="Image URL (optional)"
            :disabled="isLoading"
          >
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="isLoading || !editable.body?.trim()"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
              Post
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-img {
  height: 40px;
  width: 40px;
  object-fit: cover;
}

textarea {
  resize: none;
}
</style>